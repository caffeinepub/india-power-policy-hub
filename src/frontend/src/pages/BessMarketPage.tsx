import { Battery, Brain, Lock } from "lucide-react";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSubscription } from "../context/SubscriptionContext";

interface Props {
  onUpgradeClick: () => void;
}

const CARD_BG = "oklch(0.17 0.042 237)";
const BORDER = "oklch(0.26 0.05 237)";
const AMBER = "oklch(0.77 0.12 70)";
const GREEN = "oklch(0.72 0.19 142)";
const BLUE = "oklch(0.60 0.15 237)";

const tooltipStyle = {
  backgroundColor: "oklch(0.19 0.045 237)",
  border: `1px solid ${BORDER}`,
  borderRadius: 8,
  color: "oklch(0.90 0.02 237)",
  fontSize: 12,
};

const KPI_CARDS = [
  { label: "Total Tenders Issued", value: "148 GWh", color: AMBER },
  { label: "Awarded / Contracted", value: "56 GWh", color: GREEN },
  { label: "Under Construction", value: "28 GWh", color: BLUE },
  { label: "Cancelled / Lapsed", value: "14 GWh", color: "#ef4444" },
];

const ANNUAL_TENDER = [
  { year: "2021", gwh: 8 },
  { year: "2022", gwh: 18 },
  { year: "2023", gwh: 42 },
  { year: "2024", gwh: 78 },
  { year: "2025", gwh: 102 },
];

const USE_CASE = [
  { name: "RE Integration", value: 45, fill: GREEN },
  { name: "Peak Shaving", value: 35, fill: AMBER },
  { name: "DG Replacement", value: 20, fill: BLUE },
];

const STATE_CAPACITY = [
  { state: "Gujarat", gwh: 38 },
  { state: "Rajasthan", gwh: 31 },
  { state: "Maharashtra", gwh: 22 },
  { state: "Uttar Pradesh", gwh: 18 },
  { state: "Andhra Pradesh", gwh: 14 },
  { state: "Telangana", gwh: 11 },
];

const STATUS_COLORS: Record<string, string> = {
  Operational: GREEN,
  "Under Construction": BLUE,
  Awarded: AMBER,
  Tendering: "oklch(0.65 0.15 295)",
  "L1 Quoted": "oklch(0.70 0.15 55)",
  "DPR Stage": "oklch(0.55 0.04 237)",
};

const PROJECTS = [
  {
    project: "SECI RTC-1",
    developer: "Greenko",
    state: "Rajasthan",
    capacity: "900 MW",
    duration: "4hr",
    tariff: "₹4.04/kWh",
    status: "Operational",
  },
  {
    project: "SECI FDRE-2",
    developer: "ReNew",
    state: "Gujarat",
    capacity: "600 MW",
    duration: "4hr",
    tariff: "₹3.88/kWh",
    status: "Under Construction",
  },
  {
    project: "GUVNL BESS-1",
    developer: "NTPC",
    state: "Gujarat",
    capacity: "500 MWh",
    duration: "4hr",
    tariff: "₹2.08L/MW/mo",
    status: "Under Construction",
  },
  {
    project: "MSEDCL BESS",
    developer: "Adani",
    state: "Maharashtra",
    capacity: "1000 MWh",
    duration: "2hr",
    tariff: "₹2.85L/MW/mo",
    status: "Awarded",
  },
  {
    project: "UPPCL Storage",
    developer: "Torrent",
    state: "UP",
    capacity: "500 MWh",
    duration: "2hr",
    tariff: "₹3.09/kWh",
    status: "Tendering",
  },
  {
    project: "SECI BESS-3",
    developer: "Amp Energy",
    state: "Rajasthan",
    capacity: "2000 MWh",
    duration: "4hr",
    tariff: "₹2.70/kWh",
    status: "L1 Quoted",
  },
  {
    project: "TANGEDCO",
    developer: "Waaree",
    state: "Tamil Nadu",
    capacity: "500 MWh",
    duration: "2hr",
    tariff: "₹3.15/kWh",
    status: "Awarded",
  },
  {
    project: "PGCIL PSP",
    developer: "NHPC",
    state: "HP",
    capacity: "1000 MW",
    duration: "6hr",
    tariff: "₹3.98/kWh",
    status: "DPR Stage",
  },
  {
    project: "SREDNCO",
    developer: "SolarEdge",
    state: "Rajasthan",
    capacity: "800 MWh",
    duration: "4hr",
    tariff: "₹2.76/kWh",
    status: "L1 Quoted",
  },
  {
    project: "KSEB BESS",
    developer: "Fluence",
    state: "Kerala",
    capacity: "200 MWh",
    duration: "2hr",
    tariff: "₹3.22/kWh",
    status: "Operational",
  },
];

const AI_INSIGHTS = [
  {
    q: "Tariffs dropped 60% in 5 years",
    a: "From ₹6.99/kWh in 2020 to ₹2.70/kWh in 2024, Solar+BESS tariffs have fallen sharply driven by battery cost reduction and scale.",
    icon: "📉",
  },
  {
    q: "Shift from 2hr to 4hr storage",
    a: "Market preference has moved toward 4-hour BESS for better evening peak management and grid stability benefits.",
    icon: "⏱️",
  },
  {
    q: "Standalone BESS gaining traction",
    a: "DISCOMs now procure standalone BESS (₹/MW/month model) for peak-load management without RE bundling.",
    icon: "🔋",
  },
  {
    q: "102 GWh tendered in 2025",
    a: "FY2025 saw record tender issuances of 102 GWh, signaling India's rapid acceleration toward grid-scale storage deployment.",
    icon: "🚀",
  },
];

function ChartCard({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
    >
      <h3
        className="text-sm font-semibold mb-3"
        style={{ color: "oklch(0.90 0.02 237)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

export function BessMarketPage({ onUpgradeClick }: Props) {
  const { isPremium } = useSubscription();

  if (!isPremium) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full rounded-2xl p-8 text-center"
          style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "oklch(0.77 0.12 70 / 0.15)" }}
          >
            <Lock size={28} style={{ color: AMBER }} />
          </div>
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: "oklch(0.97 0.01 237)" }}
          >
            BESS Market Tracker
          </h2>
          <p className="text-sm mb-6" style={{ color: "oklch(0.60 0.04 237)" }}>
            Access tender analytics, project pipeline, state leadership maps,
            and Debmalya-style market insights with Premium.
          </p>
          <button
            type="button"
            data-ocid="bess.upgrade.button"
            onClick={onUpgradeClick}
            className="w-full py-3 rounded-xl font-bold text-sm"
            style={{
              background: `linear-gradient(135deg, ${AMBER}, oklch(0.65 0.10 70))`,
              color: "oklch(0.13 0.038 237)",
            }}
          >
            Upgrade to Premium — ₹299/mo
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <Battery size={22} style={{ color: AMBER }} />
            <h1
              className="text-2xl font-bold"
              style={{ color: "oklch(0.97 0.01 237)" }}
            >
              India BESS Market Tracker
            </h1>
          </div>
          <p className="text-sm" style={{ color: "oklch(0.60 0.04 237)" }}>
            Tender analytics, project pipeline & market intelligence (2021–2026)
          </p>
        </motion.div>

        {/* KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {KPI_CARDS.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl p-4"
              style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
            >
              <p
                className="text-xs mb-1"
                style={{ color: "oklch(0.55 0.04 237)" }}
              >
                {kpi.label}
              </p>
              <p className="text-xl font-bold" style={{ color: kpi.color }}>
                {kpi.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Charts row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <ChartCard title="Annual Tender Capacity (GWh)">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={ANNUAL_TENDER}
                margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                />
                <YAxis tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => [`${v} GWh`]}
                />
                <Bar
                  dataKey="gwh"
                  name="GWh"
                  fill={AMBER}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Use Case Split">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={USE_CASE}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {USE_CASE.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* State leadership */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ChartCard title="State Leadership in Storage (GWh)">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={STATE_CAPACITY}
                layout="vertical"
                margin={{ top: 4, right: 40, bottom: 0, left: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis
                  type="number"
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                />
                <YAxis
                  dataKey="state"
                  type="category"
                  tick={{ fill: "oklch(0.75 0.03 237)", fontSize: 11 }}
                  width={100}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => [`${v} GWh`]}
                />
                <Bar dataKey="gwh" fill={BLUE} radius={[0, 4, 4, 0]}>
                  {STATE_CAPACITY.map((entry, i) => (
                    <Cell
                      key={entry.state}
                      fill={i === 0 ? AMBER : i === 1 ? GREEN : BLUE}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* Project Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: BORDER }}>
              <h3
                className="text-sm font-semibold"
                style={{ color: "oklch(0.90 0.02 237)" }}
              >
                Project Pipeline
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr
                    style={{
                      background: "oklch(0.14 0.040 237)",
                      color: "oklch(0.55 0.04 237)",
                    }}
                  >
                    {[
                      "Project",
                      "Developer",
                      "State",
                      "Capacity",
                      "Duration",
                      "Tariff",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-3 py-2.5 font-semibold whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROJECTS.map((p, i) => (
                    <tr
                      key={p.project}
                      data-ocid={`bess.project.item.${i + 1}`}
                      style={{
                        borderTop: i > 0 ? `1px solid ${BORDER}` : undefined,
                      }}
                    >
                      <td
                        className="px-3 py-2.5 font-medium"
                        style={{ color: "oklch(0.85 0.03 237)" }}
                      >
                        {p.project}
                      </td>
                      <td
                        className="px-3 py-2.5"
                        style={{ color: "oklch(0.68 0.04 237)" }}
                      >
                        {p.developer}
                      </td>
                      <td
                        className="px-3 py-2.5"
                        style={{ color: "oklch(0.68 0.04 237)" }}
                      >
                        {p.state}
                      </td>
                      <td
                        className="px-3 py-2.5"
                        style={{ color: "oklch(0.68 0.04 237)" }}
                      >
                        {p.capacity}
                      </td>
                      <td
                        className="px-3 py-2.5"
                        style={{ color: "oklch(0.68 0.04 237)" }}
                      >
                        {p.duration}
                      </td>
                      <td
                        className="px-3 py-2.5 font-semibold"
                        style={{ color: AMBER }}
                      >
                        {p.tariff}
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{
                            background: `${STATUS_COLORS[p.status] ?? BORDER}22`,
                            color:
                              STATUS_COLORS[p.status] ?? "oklch(0.55 0.04 237)",
                            border: `1px solid ${STATUS_COLORS[p.status] ?? BORDER}44`,
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Brain size={16} style={{ color: AMBER }} />
            <h2
              className="text-sm font-semibold"
              style={{ color: "oklch(0.90 0.02 237)" }}
            >
              Key Market Insights
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_INSIGHTS.map((ins, idx) => (
              <motion.div
                key={ins.q}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + idx * 0.05 }}
                className="rounded-xl p-4"
                style={{
                  background: CARD_BG,
                  border: `1px solid ${BORDER}`,
                  borderLeft: `3px solid ${AMBER}`,
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{ins.icon}</span>
                  <div>
                    <p
                      className="text-xs font-bold mb-1"
                      style={{ color: AMBER }}
                    >
                      {ins.q}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(0.68 0.04 237)" }}
                    >
                      {ins.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
