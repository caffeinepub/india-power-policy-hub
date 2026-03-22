import { Lock, Radar } from "lucide-react";
import { motion } from "motion/react";
import {
  CartesianGrid,
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

const tooltipStyle = {
  backgroundColor: "oklch(0.19 0.045 237)",
  border: `1px solid ${BORDER}`,
  borderRadius: 8,
  color: "oklch(0.90 0.02 237)",
  fontSize: 12,
};

const TECH_DATA = [
  {
    name: "Li-ion BESS",
    x: 5,
    y: 5,
    color: AMBER,
    maturity: "Mature",
    costTrend: "Declining ↓",
    trendDir: "down",
    useCases: "Grid storage, RE+storage",
    indiaStatus: "50+ GWh tendered, rapidly scaling",
    globalStatus: "Dominant globally, 90%+ market share",
  },
  {
    name: "PSP (Pumped Hydro)",
    x: 5,
    y: 4,
    color: "oklch(0.60 0.15 237)",
    maturity: "Mature",
    costTrend: "Stable →",
    trendDir: "stable",
    useCases: "Long-duration, seasonal",
    indiaStatus: "4.7 GW operational, 12+ GW planned",
    globalStatus: "150 GW global, cost-effective long-duration",
  },
  {
    name: "Flow Batteries",
    x: 3,
    y: 2,
    color: "oklch(0.72 0.19 142)",
    maturity: "Early Commercial",
    costTrend: "Declining ↓",
    trendDir: "down",
    useCases: "Long-duration, 8-12hr",
    indiaStatus: "Pilot projects only",
    globalStatus: "Growing in US/China for 8hr+ storage",
  },
  {
    name: "Sodium-ion",
    x: 3,
    y: 1,
    color: "oklch(0.75 0.14 55)",
    maturity: "Pilot",
    costTrend: "Declining ↓",
    trendDir: "down",
    useCases: "EV, grid storage",
    indiaStatus: "Early trials by ISRO/CSIR",
    globalStatus: "CATL commercializing; could rival Li-ion by 2027",
  },
  {
    name: "Solid-state",
    x: 2,
    y: 1,
    color: "#a78bfa",
    maturity: "R&D",
    costTrend: "TBD",
    trendDir: "stable",
    useCases: "EV, high-density grid",
    indiaStatus: "Lab stage",
    globalStatus: "Toyota, QuantumScape targeting 2028",
  },
  {
    name: "Hydrogen Storage",
    x: 2,
    y: 2,
    color: "#38bdf8",
    maturity: "Pilot",
    costTrend: "Declining ↓",
    trendDir: "down",
    useCases: "Seasonal, industrial",
    indiaStatus: "Green H2 mission, NTPC pilots",
    globalStatus: "Emerging globally for >12hr storage",
  },
  {
    name: "Thermal Storage",
    x: 3,
    y: 2,
    color: "#f472b6",
    maturity: "Early Commercial",
    costTrend: "Stable →",
    trendDir: "stable",
    useCases: "Industrial heat, CSP",
    indiaStatus: "Limited, CSP-linked",
    globalStatus: "Growing in US/Europe for industrial decarbonization",
  },
  {
    name: "Gravity Storage",
    x: 2,
    y: 1,
    color: "#94a3b8",
    maturity: "R&D",
    costTrend: "TBD",
    trendDir: "stable",
    useCases: "Long-duration, hilly terrain",
    indiaStatus: "No commercial projects",
    globalStatus: "Energy Vault demo in Switzerland",
  },
];

const X_LABELS = ["", "R&D", "Pilot", "Early Comm.", "Commercial", "Mature"];
const Y_LABELS = ["", "None", "Low", "Medium", "High", "Dominant"];

const MATURITY_COLORS: Record<string, string> = {
  Mature: "oklch(0.72 0.19 142)",
  "Early Commercial": AMBER,
  Pilot: "oklch(0.75 0.14 55)",
  "R&D": "#a78bfa",
};

export function StorageTechRadarPage({ onUpgradeClick }: Props) {
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
            Storage Technology Radar
          </h2>
          <p className="text-sm mb-6" style={{ color: "oklch(0.60 0.04 237)" }}>
            Track current and emerging storage technologies across maturity and
            India adoption dimensions.
          </p>
          <button
            type="button"
            data-ocid="storage.upgrade.button"
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
            <Radar size={22} style={{ color: AMBER }} />
            <h1
              className="text-2xl font-bold"
              style={{ color: "oklch(0.97 0.01 237)" }}
            >
              Storage Technology Radar
            </h1>
          </div>
          <p className="text-sm" style={{ color: "oklch(0.60 0.04 237)" }}>
            Current & emerging storage technologies — maturity vs India adoption
          </p>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="rounded-xl p-4"
            style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
          >
            <h3
              className="text-sm font-semibold mb-1"
              style={{ color: "oklch(0.90 0.02 237)" }}
            >
              Technology Radar
            </h3>
            <p
              className="text-xs mb-4"
              style={{ color: "oklch(0.55 0.04 237)" }}
            >
              X = Maturity | Y = India Adoption | Dot size = relative readiness
            </p>

            {/* Quadrant legend */}
            <div className="flex flex-wrap gap-3 mb-4 text-xs">
              {[
                {
                  label: "R&D Zone",
                  color: "#ef4444",
                  bg: "oklch(0.35 0.15 15 / 0.15)",
                },
                {
                  label: "Emerging Zone",
                  color: AMBER,
                  bg: "oklch(0.77 0.12 70 / 0.10)",
                },
                {
                  label: "Deployed Zone",
                  color: "oklch(0.72 0.19 142)",
                  bg: "oklch(0.72 0.19 142 / 0.10)",
                },
              ].map((q) => (
                <div
                  key={q.label}
                  className="flex items-center gap-1.5 px-2 py-1 rounded"
                  style={{ background: q.bg }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: q.color }}
                  />
                  <span style={{ color: q.color }}>{q.label}</span>
                </div>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <ScatterChart
                margin={{ top: 10, right: 20, bottom: 30, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.26 0.05 237)"
                />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Maturity"
                  domain={[0.5, 5.5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tickFormatter={(v) => X_LABELS[v] ?? ""}
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 10 }}
                  label={{
                    value: "Technology Maturity →",
                    position: "insideBottom",
                    offset: -15,
                    fill: "oklch(0.55 0.04 237)",
                    fontSize: 11,
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="India Adoption"
                  domain={[0.5, 5.5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tickFormatter={(v) => Y_LABELS[v] ?? ""}
                  tick={{ fill: "oklch(0.55 0.04 237)", fontSize: 10 }}
                  label={{
                    value: "India Adoption ↑",
                    angle: -90,
                    position: "insideLeft",
                    fill: "oklch(0.55 0.04 237)",
                    fontSize: 11,
                  }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  content={(props) => {
                    const p = props?.payload?.[0]?.payload as
                      | (typeof TECH_DATA)[0]
                      | undefined;
                    if (!p) return null;
                    return (
                      <div
                        style={{
                          ...tooltipStyle,
                          padding: "8px 12px",
                          maxWidth: 200,
                        }}
                      >
                        <p className="font-bold" style={{ color: p.color }}>
                          {p.name}
                        </p>
                        <p style={{ color: "oklch(0.68 0.04 237)" }}>
                          Maturity: {X_LABELS[p.x]}
                        </p>
                        <p style={{ color: "oklch(0.68 0.04 237)" }}>
                          India: {Y_LABELS[p.y]}
                        </p>
                      </div>
                    );
                  }}
                />
                <Scatter
                  data={TECH_DATA}
                  shape={(props: {
                    cx?: number;
                    cy?: number;
                    payload?: (typeof TECH_DATA)[0];
                  }) => {
                    const { cx = 0, cy = 0, payload } = props;
                    if (!payload) return <g />;
                    return (
                      <g>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={12}
                          fill={payload.color}
                          fillOpacity={0.7}
                          stroke={payload.color}
                          strokeWidth={1.5}
                        />
                        <text
                          x={cx}
                          y={cy - 16}
                          textAnchor="middle"
                          fontSize={9}
                          fill={payload.color}
                          fontWeight={600}
                        >
                          {payload.name.length > 12
                            ? `${payload.name.slice(0, 11)}…`
                            : payload.name}
                        </text>
                      </g>
                    );
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Technology Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2
            className="text-sm font-semibold mb-3"
            style={{ color: "oklch(0.90 0.02 237)" }}
          >
            Technology Deep-Dive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {TECH_DATA.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="rounded-xl p-4"
                style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ background: tech.color }}
                  />
                  <h4
                    className="text-sm font-bold"
                    style={{ color: "oklch(0.90 0.02 237)" }}
                  >
                    {tech.name}
                  </h4>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: `${MATURITY_COLORS[tech.maturity] ?? BORDER}22`,
                      color:
                        MATURITY_COLORS[tech.maturity] ??
                        "oklch(0.55 0.04 237)",
                      border: `1px solid ${MATURITY_COLORS[tech.maturity] ?? BORDER}44`,
                    }}
                  >
                    {tech.maturity}
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      color:
                        tech.trendDir === "down"
                          ? "oklch(0.72 0.19 142)"
                          : "oklch(0.68 0.04 237)",
                    }}
                  >
                    {tech.costTrend}
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div>
                    <span style={{ color: "oklch(0.45 0.04 237)" }}>
                      Use Cases:{" "}
                    </span>
                    <span style={{ color: "oklch(0.70 0.04 237)" }}>
                      {tech.useCases}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "oklch(0.45 0.04 237)" }}>
                      🇮🇳 India:{" "}
                    </span>
                    <span style={{ color: "oklch(0.70 0.04 237)" }}>
                      {tech.indiaStatus}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "oklch(0.45 0.04 237)" }}>
                      🌐 Global:{" "}
                    </span>
                    <span style={{ color: "oklch(0.70 0.04 237)" }}>
                      {tech.globalStatus}
                    </span>
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
