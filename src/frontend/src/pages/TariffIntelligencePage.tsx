import { Brain, Lock, Sparkles, TrendingDown } from "lucide-react";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
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
const RED = "#ef4444";

const SOLAR_ONLY = [
  { year: 2018, v: 3.15 },
  { year: 2019, v: 2.85 },
  { year: 2020, v: 2.36 },
  { year: 2021, v: 2.14 },
  { year: 2022, v: 2.05 },
  { year: 2023, v: 2.2 },
  { year: 2024, v: 2.02 },
  { year: 2026, v: 1.99 },
];
const SOLAR_BESS_2HR = [
  { year: 2020, v: 6.99 },
  { year: 2021, v: 5.5 },
  { year: 2022, v: 4.8 },
  { year: 2023, v: 3.9 },
  { year: 2024, v: 3.09 },
  { year: 2026, v: 3.0 },
];
const SOLAR_BESS_4HR = [
  { year: 2021, v: 6.5 },
  { year: 2022, v: 5.2 },
  { year: 2023, v: 4.2 },
  { year: 2024, v: 2.86 },
  { year: 2026, v: 2.7 },
];

// Merge all years for line chart
const ALL_YEARS = Array.from(
  new Set([
    ...SOLAR_ONLY.map((d) => d.year),
    ...SOLAR_BESS_2HR.map((d) => d.year),
    ...SOLAR_BESS_4HR.map((d) => d.year),
  ]),
).sort();

const LINE_DATA = ALL_YEARS.map((year) => ({
  year,
  solarOnly: SOLAR_ONLY.find((d) => d.year === year)?.v,
  bess2hr: SOLAR_BESS_2HR.find((d) => d.year === year)?.v,
  bess4hr: SOLAR_BESS_4HR.find((d) => d.year === year)?.v,
}));

const BESS_STANDALONE = [
  { year: "2021", v: 4.44 },
  { year: "2022", v: 3.8 },
  { year: "2023", v: 2.85 },
  { year: "2024", v: 2.08 },
];

const FDRE_DATA = [
  { year: "2022", Peak: 5.6, RTC: 4.9, LoadFollowing: 4.38 },
  { year: "2023", Peak: 5.2, RTC: 4.7, LoadFollowing: 4.38 },
  { year: "2024", Peak: 4.8, RTC: 4.55, LoadFollowing: 4.38 },
];

const COMPARISON_DATA = [
  { name: "Coal (Avg)", value: 6.0, fill: RED },
  { name: "Solar+BESS", value: 4.28, fill: AMBER },
  { name: "Solar Only", value: 2.02, fill: GREEN },
];

const BUBBLE_DATA = [
  { x: 2020, y: 6.99, z: 500, name: "Solar+BESS Early" },
  { x: 2021, y: 5.5, z: 800, name: "RTC Tender 1" },
  { x: 2022, y: 4.8, z: 1200, name: "FDRE Batch 1" },
  { x: 2023, y: 3.9, z: 2000, name: "BESS Mega Tender" },
  { x: 2024, y: 3.09, z: 4000, name: "Solar+BESS 2hr" },
  { x: 2024, y: 2.86, z: 5000, name: "Solar+BESS 4hr" },
  { x: 2026, y: 2.7, z: 8000, name: "Latest Bid" },
];

const AI_INSIGHTS = [
  {
    q: "Why are BESS tariffs falling?",
    a: "Falling battery (LFP) cell costs, increased developer competition, VGF support reducing financing risk, and larger tender sizes achieving economies of scale.",
    icon: "📉",
  },
  {
    q: "Shift from 2hr to 4hr BESS",
    a: "Grid operators now prefer 4hr storage for better evening peak management. SECI tenders in 2023-24 predominantly specified 4hr duration.",
    icon: "⏱️",
  },
  {
    q: "FDRE becoming mainstream",
    a: "Discoms are moving from intermittent RE to firm, dispatchable RE (FDRE) to ensure 24×7 renewable supply. 10+ GW tendered in 2024.",
    icon: "⚡",
  },
  {
    q: "Best state for BESS investment",
    a: "Gujarat and Rajasthan lead with highest tendered capacities. Gujarat alone has 15+ GWh under various stages. Strong policy support and land availability.",
    icon: "🏆",
  },
];

const KPI_CARDS = [
  {
    label: "Lowest Solar+BESS Tariff",
    value: "₹2.70/kWh",
    sub: "4hr BESS, 2026",
    color: GREEN,
  },
  {
    label: "Standalone BESS Low",
    value: "₹2.08L/MW/mo",
    sub: "MSEDCL, 2024",
    color: AMBER,
  },
  {
    label: "FDRE Range",
    value: "₹4.38–5.60",
    sub: "₹/kWh, 2022–2024",
    color: BLUE,
  },
  {
    label: "vs Coal Saving",
    value: "~30% cheaper",
    sub: "Solar+BESS vs Coal",
    color: "oklch(0.75 0.14 55)",
  },
];

const tooltipStyle = {
  backgroundColor: "oklch(0.19 0.045 237)",
  border: `1px solid ${BORDER}`,
  borderRadius: 8,
  color: "oklch(0.90 0.02 237)",
  fontSize: 12,
};

function ChartCard({
  title,
  children,
  insight,
}: { title: string; children: React.ReactNode; insight?: string }) {
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
      {insight && (
        <div
          className="mt-3 px-3 py-2 rounded-lg text-xs flex items-start gap-2"
          style={{
            background: "oklch(0.77 0.12 70 / 0.1)",
            borderLeft: `3px solid ${AMBER}`,
            color: "oklch(0.85 0.06 70)",
          }}
        >
          <Sparkles size={12} className="mt-0.5 shrink-0" />
          {insight}
        </div>
      )}
    </div>
  );
}

export function TariffIntelligencePage({ onUpgradeClick }: Props) {
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
            Tariff Intelligence Engine
          </h2>
          <p className="text-sm mb-6" style={{ color: "oklch(0.60 0.04 237)" }}>
            Access Solar+BESS tariff decline curves, FDRE analytics, bubble
            charts, and AI insights with a Premium subscription.
          </p>
          <button
            type="button"
            data-ocid="tariff.upgrade.button"
            onClick={onUpgradeClick}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all"
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
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <TrendingDown size={22} style={{ color: AMBER }} />
            <h1
              className="text-2xl font-bold"
              style={{ color: "oklch(0.97 0.01 237)" }}
            >
              Tariff Intelligence Engine
            </h1>
          </div>
          <p className="text-sm" style={{ color: "oklch(0.60 0.04 237)" }}>
            Solar, Wind, BESS, FDRE & Storage tariff trends (2018–2026)
          </p>
        </motion.div>

        {/* KPI Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
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
              <p className="text-lg font-bold" style={{ color: kpi.color }}>
                {kpi.value}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.45 0.04 237)" }}
              >
                {kpi.sub}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Section 3: Decline Curve */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <ChartCard
            title="Solar + BESS Tariff Decline (2018–2026)"
            insight="Tariffs declining even as storage duration increases — the BESS cost compression story"
          >
            <ResponsiveContainer width="100%" height={260}>
              <LineChart
                data={LINE_DATA}
                margin={{ top: 4, right: 16, bottom: 0, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.26 0.05 237)"
                />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                />
                <YAxis
                  unit=" ₹"
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                  domain={[1.5, 7.5]}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => [`₹${v}/kWh`]}
                />
                <Legend
                  wrapperStyle={{ fontSize: 11, color: "oklch(0.65 0.04 237)" }}
                />
                <Line
                  type="monotone"
                  dataKey="solarOnly"
                  name="Solar Only"
                  stroke={AMBER}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="bess2hr"
                  name="Solar+BESS 2hr"
                  stroke={GREEN}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="bess4hr"
                  name="Solar+BESS 4hr"
                  stroke={BLUE}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* Section 4: Two charts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <ChartCard
            title="Standalone BESS Tariff Trend (₹ lakh/MW/month)"
            insight="60% cost compression in 3 years — hyper-competitive market"
          >
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={BESS_STANDALONE}
                margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.26 0.05 237)"
                />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                  domain={[0, 5]}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => [`₹${v}L/MW/mo`]}
                />
                <Bar
                  dataKey="v"
                  name="Tariff"
                  fill={AMBER}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="FDRE Tariff by Product Type">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={FDRE_DATA}
                margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.26 0.05 237)"
                />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                  domain={[3.5, 6.5]}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => [`₹${v}/kWh`]}
                />
                <Legend
                  wrapperStyle={{ fontSize: 11, color: "oklch(0.65 0.04 237)" }}
                />
                <Bar dataKey="Peak" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="RTC" fill={AMBER} radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="LoadFollowing"
                  name="Load Following"
                  fill={GREEN}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* Section 5: Coal comparison */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <ChartCard
            title="Solar+BESS vs Coal — Cost Comparison (₹/kWh)"
            insight="Solar+BESS now cheaper than coal for 24×7 power supply"
          >
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={COMPARISON_DATA}
                layout="vertical"
                margin={{ top: 4, right: 40, bottom: 0, left: 80 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.26 0.05 237)"
                />
                <XAxis
                  type="number"
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                  domain={[0, 7]}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fill: "oklch(0.75 0.03 237)", fontSize: 11 }}
                  width={80}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => [`₹${v}/kWh`]}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {COMPARISON_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* Section 6: Bubble chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <ChartCard title="Tariff vs Capacity Bubble Chart — Size = Project Capacity (MW)">
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart
                margin={{ top: 10, right: 20, bottom: 20, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.26 0.05 237)"
                />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Year"
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                  domain={[2019, 2027]}
                  label={{
                    value: "Year",
                    position: "insideBottom",
                    offset: -10,
                    fill: "oklch(0.55 0.04 237)",
                    fontSize: 11,
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Tariff"
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 11 }}
                  domain={[1.5, 8]}
                  label={{
                    value: "₹/kWh",
                    angle: -90,
                    position: "insideLeft",
                    fill: "oklch(0.55 0.04 237)",
                    fontSize: 11,
                  }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  content={(props) => {
                    const p = props?.payload?.[0]?.payload;
                    if (!p) return null;
                    return (
                      <div style={{ ...tooltipStyle, padding: "8px 12px" }}>
                        <p className="font-semibold" style={{ color: AMBER }}>
                          {p.name}
                        </p>
                        <p>Tariff: ₹{p.y}/kWh</p>
                        <p>Capacity: {p.z} MW</p>
                        <p>Year: {p.x}</p>
                      </div>
                    );
                  }}
                />
                <Scatter
                  data={BUBBLE_DATA}
                  fill={AMBER}
                  fillOpacity={0.7}
                  shape={(props: {
                    cx?: number;
                    cy?: number;
                    payload?: { z: number };
                  }) => {
                    const r = Math.sqrt((props.payload?.z ?? 100) / 80);
                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={Math.min(r, 30)}
                        fill={AMBER}
                        fillOpacity={0.6}
                        stroke={AMBER}
                        strokeWidth={1}
                      />
                    );
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* Section 7: AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Brain size={16} style={{ color: AMBER }} />
            <h2
              className="text-sm font-semibold"
              style={{ color: "oklch(0.90 0.02 237)" }}
            >
              AI-Powered Market Insights
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_INSIGHTS.map((ins, i) => (
              <motion.div
                key={ins.q}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
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
