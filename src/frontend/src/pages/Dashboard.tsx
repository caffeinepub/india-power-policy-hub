import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  FileText,
  GitBranch,
  Lock,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Policy } from "../backend.d";
import { PolicyDetailPanel } from "../components/PolicyDetailPanel";
import { PolicyList } from "../components/PolicyList";
import { useSubscription } from "../context/SubscriptionContext";

interface Props {
  policies: Policy[];
  isLoading: boolean;
  selectedPolicy: Policy | null;
  onSelectPolicy: (p: Policy) => void;
  onClosePolicy: () => void;
  onUpgradeClick: () => void;
}

export function Dashboard({
  policies,
  isLoading,
  selectedPolicy,
  onSelectPolicy,
  onClosePolicy,
  onUpgradeClick,
}: Props) {
  const { isPremium } = useSubscription();

  const stats = useMemo(() => {
    const totalAmendments = policies.reduce(
      (acc, p) => acc + p.amendments.length,
      0,
    );
    const statePolicies = policies.filter((p) => p.level === "State").length;
    return {
      total: policies.length,
      active: policies.length,
      amendments: totalAmendments,
      stateCount: statePolicies,
    };
  }, [policies]);

  const verticalData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of policies) {
      counts[p.vertical] = (counts[p.vertical] ?? 0) + 1;
    }
    return Object.entries(counts)
      .map(([name, count]) => ({ name: name.split(" ")[0], full: name, count }))
      .sort((a, b) => b.count - a.count);
  }, [policies]);

  const timelineData = useMemo(() => {
    const byYear: Record<string, number> = {};
    for (const p of policies) {
      const y = p.year.toString();
      byYear[y] = (byYear[y] ?? 0) + 1;
    }
    return Object.entries(byYear)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([year, count]) => ({ year, count }));
  }, [policies]);

  const recentPolicies = useMemo(
    () =>
      [...policies].sort((a, b) => Number(b.year) - Number(a.year)).slice(0, 8),
    [policies],
  );

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton
          className="h-8 w-72"
          style={{ background: "oklch(0.22 0.045 237)" }}
        />
        <div className="grid grid-cols-4 gap-4">
          {["kpi1", "kpi2", "kpi3", "kpi4"].map((id) => (
            <Skeleton
              key={id}
              className="h-24 rounded-lg"
              style={{ background: "oklch(0.22 0.045 237)" }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={18} style={{ color: "oklch(0.77 0.12 70)" }} />
              <h1
                className="text-2xl font-bold"
                style={{ color: "oklch(0.97 0.01 237)" }}
              >
                National Power Policy Dashboard
              </h1>
            </div>
            <p className="text-sm" style={{ color: "oklch(0.55 0.04 237)" }}>
              Comprehensive intelligence on Indian power sector policies
            </p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              icon={<FileText size={16} />}
              label="Total Policies"
              value={stats.total}
              color="oklch(0.77 0.12 70)"
              delay={0}
            />
            <KpiCard
              icon={<CheckCircle size={16} />}
              label="Active Policies"
              value={stats.active}
              color="oklch(0.72 0.19 142)"
              delay={0.05}
            />
            <KpiCard
              icon={<GitBranch size={16} />}
              label="Total Amendments"
              value={stats.amendments}
              color="oklch(0.60 0.15 237)"
              delay={0.1}
            />
            <KpiCard
              icon={<MapPin size={16} />}
              label="State Policies"
              value={stats.stateCount}
              color="oklch(0.75 0.14 55)"
              delay={0.15}
            />
          </div>

          {/* Charts — premium only */}
          {isPremium ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard title="Policy Distribution by Vertical">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={verticalData}
                    margin={{ top: 4, right: 8, left: -20, bottom: 4 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(0.26 0.05 237)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Bar
                      dataKey="count"
                      fill="oklch(0.77 0.12 70)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Policies Timeline (by Year)">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={timelineData}
                    margin={{ top: 4, right: 8, left: -20, bottom: 4 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(0.26 0.05 237)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="year"
                      tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomLineTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="oklch(0.77 0.12 70)"
                      strokeWidth={2}
                      dot={{ fill: "oklch(0.77 0.12 70)", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          ) : (
            <button
              type="button"
              className="rounded-lg p-5 border flex items-center gap-4 w-full text-left"
              style={{
                background: "oklch(0.15 0.040 237)",
                borderColor: "oklch(0.77 0.12 70 / 0.2)",
                borderStyle: "dashed",
              }}
              onClick={onUpgradeClick}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "oklch(0.77 0.12 70 / 0.1)" }}
              >
                <Lock size={18} style={{ color: "oklch(0.77 0.12 70)" }} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.80 0.03 237)" }}
                >
                  Charts & Analytics — Premium Feature
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.50 0.04 237)" }}
                >
                  Vertical distribution charts and policy timelines are
                  available on Premium.
                </p>
              </div>
              <span
                data-ocid="dashboard.upgrade.button"
                className="ml-auto text-xs font-bold px-3 py-1.5 rounded-md shrink-0"
                style={{
                  background: "oklch(0.77 0.12 70 / 0.15)",
                  color: "oklch(0.77 0.12 70)",
                  border: "1px solid oklch(0.77 0.12 70 / 0.3)",
                }}
              >
                Upgrade ₹299/mo
              </span>
            </button>
          )}

          {/* Recent Policies */}
          <div>
            <h2
              className="text-sm font-semibold mb-3"
              style={{ color: "oklch(0.77 0.12 70)" }}
            >
              Recent Policies
            </h2>
            <div
              className="rounded-lg overflow-hidden border"
              style={{
                borderColor: "oklch(0.26 0.05 237)",
                background: "oklch(0.17 0.042 237)",
              }}
            >
              <PolicyList
                policies={recentPolicies}
                selectedId={selectedPolicy?.id ?? null}
                onSelect={onSelectPolicy}
                showSearch={false}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedPolicy && (
        <div className="w-80 shrink-0 h-full overflow-hidden">
          <PolicyDetailPanel
            policy={selectedPolicy}
            onClose={onClosePolicy}
            onUpgradeClick={onUpgradeClick}
          />
        </div>
      )}
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-lg p-4 border"
      style={{
        background: "oklch(0.17 0.042 237)",
        borderColor: "oklch(0.26 0.05 237)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center"
          style={{ background: `${color.replace(")", " / 0.15)")}` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        <span className="text-xs" style={{ color: "oklch(0.55 0.04 237)" }}>
          {label}
        </span>
      </div>
      <div className="text-3xl font-bold" style={{ color }}>
        {value}
      </div>
    </motion.div>
  );
}

function ChartCard({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg p-4 border"
      style={{
        background: "oklch(0.17 0.042 237)",
        borderColor: "oklch(0.26 0.05 237)",
      }}
    >
      <h3
        className="text-sm font-semibold mb-4"
        style={{ color: "oklch(0.80 0.03 237)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function CustomBarTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-lg text-xs"
      style={{
        background: "oklch(0.22 0.045 237)",
        border: "1px solid oklch(0.26 0.05 237)",
        color: "oklch(0.90 0.01 237)",
      }}
    >
      <div style={{ color: "oklch(0.77 0.12 70)" }}>
        {payload[0]?.payload?.full}
      </div>
      <div>{payload[0]?.value} policies</div>
    </div>
  );
}

function CustomLineTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-lg text-xs"
      style={{
        background: "oklch(0.22 0.045 237)",
        border: "1px solid oklch(0.26 0.05 237)",
        color: "oklch(0.90 0.01 237)",
      }}
    >
      <div style={{ color: "oklch(0.77 0.12 70)" }}>
        Year {payload[0]?.payload?.year}
      </div>
      <div>{payload[0]?.value} policies</div>
    </div>
  );
}
