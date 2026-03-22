import { motion } from "motion/react";
import type { Policy } from "../backend.d";
import { PolicyDetailPanel } from "../components/PolicyDetailPanel";
import { PolicyList } from "../components/PolicyList";

const VERTICAL_ICONS: Record<string, string> = {
  Generation: "⚡",
  Transmission: "🔌",
  Distribution: "🏠",
  "Renewable Energy": "🌞",
  "Regulations & Tariffs": "⚖️",
  "Energy Efficiency": "🌱",
  "Emerging Tech": "🔋",
};

const VERTICAL_DESCRIPTIONS: Record<string, string> = {
  Generation:
    "Policies governing power generation including thermal, hydro, nuclear and all other generation sources.",
  Transmission:
    "Frameworks for high-voltage transmission network planning, operation, and open access.",
  Distribution:
    "Policies for last-mile electricity delivery, DISCOM operations, tariff collection, and consumer service.",
  "Renewable Energy":
    "Solar, wind, hydro, biomass and other renewable energy policies and incentive schemes.",
  "Regulations & Tariffs":
    "Regulatory frameworks, tariff determination methodologies, and compliance guidelines.",
  "Energy Efficiency":
    "Energy conservation codes, efficiency standards, BEE schemes, and sustainability mandates.",
  "Emerging Tech":
    "Policies for green hydrogen, battery storage, EV integration, and emerging energy technologies.",
};

interface Props {
  vertical: string;
  policies: Policy[];
  selectedPolicy: Policy | null;
  onSelectPolicy: (p: Policy) => void;
  onClosePolicy: () => void;
  onUpgradeClick: () => void;
}

export function VerticalPage({
  vertical,
  policies,
  selectedPolicy,
  onSelectPolicy,
  onClosePolicy,
  onUpgradeClick,
}: Props) {
  const verticalPolicies = policies.filter((p) => p.vertical === vertical);

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 border-b shrink-0"
          style={{ borderColor: "oklch(0.26 0.05 237)" }}
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{VERTICAL_ICONS[vertical] ?? "⚡"}</span>
            <h1
              className="text-xl font-bold"
              style={{ color: "oklch(0.97 0.01 237)" }}
            >
              {vertical}
            </h1>
            <span
              className="text-sm px-2 py-0.5 rounded-full font-semibold"
              style={{
                background: "oklch(0.77 0.12 70 / 0.15)",
                color: "oklch(0.77 0.12 70)",
              }}
            >
              {verticalPolicies.length} policies
            </span>
          </div>
          <p className="text-sm" style={{ color: "oklch(0.55 0.04 237)" }}>
            {VERTICAL_DESCRIPTIONS[vertical]}
          </p>
        </motion.div>

        {/* Policy List */}
        <div
          className="flex-1 overflow-hidden"
          style={{ background: "oklch(0.17 0.042 237)" }}
        >
          <PolicyList
            policies={policies}
            selectedId={selectedPolicy?.id ?? null}
            onSelect={onSelectPolicy}
            filterVertical={vertical}
          />
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
