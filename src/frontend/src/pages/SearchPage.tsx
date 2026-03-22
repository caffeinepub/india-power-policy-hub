import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Lock, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Policy } from "../backend.d";
import { PolicyDetailPanel } from "../components/PolicyDetailPanel";
import { useSubscription } from "../context/SubscriptionContext";

const VERTICALS = [
  "Generation",
  "Transmission",
  "Distribution",
  "Renewable Energy",
  "Regulations & Tariffs",
  "Energy Efficiency",
  "Emerging Tech",
];

interface Props {
  policies: Policy[];
  selectedPolicy: Policy | null;
  onSelectPolicy: (p: Policy) => void;
  onClosePolicy: () => void;
  onUpgradeClick: () => void;
}

export function SearchPage({
  policies,
  selectedPolicy,
  onSelectPolicy,
  onClosePolicy,
  onUpgradeClick,
}: Props) {
  const { isPremium } = useSubscription();
  const [query, setQuery] = useState("");
  const [vertical, setVertical] = useState("All");
  const [level, setLevel] = useState("All");

  const results = policies.filter((p) => {
    const matchesQuery =
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.summary.toLowerCase().includes(query.toLowerCase()) ||
      (isPremium &&
        p.keyProvisions.some((k) =>
          k.toLowerCase().includes(query.toLowerCase()),
        ));
    const matchesVertical =
      !isPremium || vertical === "All" || p.vertical === vertical;
    const matchesLevel = !isPremium || level === "All" || p.level === level;
    return matchesQuery && matchesVertical && matchesLevel;
  });

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div
          className="p-5 border-b"
          style={{ borderColor: "oklch(0.26 0.05 237)" }}
        >
          <h1
            className="text-xl font-bold mb-3"
            style={{ color: "oklch(0.97 0.01 237)" }}
          >
            Search Policies
          </h1>
          <div className="relative mb-3">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "oklch(0.45 0.04 237)" }}
            />
            <Input
              data-ocid="search.search_input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, keyword..."
              className="pl-9"
              style={{
                background: "oklch(0.17 0.042 237)",
                borderColor: "oklch(0.26 0.05 237)",
                color: "oklch(0.97 0.01 237)",
              }}
            />
          </div>

          {/* Advanced filters — premium only */}
          {isPremium ? (
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.04 237)" }}
                >
                  Level:
                </span>
                {["All", "Central", "State"].map((l) => (
                  <FilterChip
                    key={l}
                    label={l}
                    active={level === l}
                    onClick={() => setLevel(l)}
                    ocid={`search.level_${l.toLowerCase()}.tab`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.04 237)" }}
                >
                  Vertical:
                </span>
                <FilterChip
                  label="All"
                  active={vertical === "All"}
                  onClick={() => setVertical("All")}
                  ocid="search.vertical_all.tab"
                />
                {VERTICALS.map((v) => (
                  <FilterChip
                    key={v}
                    label={v.split(" ")[0]}
                    active={vertical === v}
                    onClick={() => setVertical(v)}
                    ocid={`search.vertical_${v.toLowerCase().replace(/[^a-z]/g, "_")}.tab`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg px-3 py-2 w-full text-left"
              style={{
                background: "oklch(0.15 0.040 237)",
                border: "1px dashed oklch(0.77 0.12 70 / 0.3)",
              }}
              onClick={onUpgradeClick}
            >
              <Lock size={12} style={{ color: "oklch(0.77 0.12 70)" }} />
              <span
                className="text-xs"
                style={{ color: "oklch(0.55 0.04 237)" }}
              >
                Advanced filters (vertical, level, year) are a{" "}
              </span>
              <span
                data-ocid="search.upgrade.button"
                className="text-xs font-semibold hover:underline"
                style={{ color: "oklch(0.77 0.12 70)" }}
              >
                Premium feature →
              </span>
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div
            className="px-4 py-2 border-b"
            style={{
              borderColor: "oklch(0.26 0.05 237 / 0.5)",
              background: "oklch(0.15 0.040 237)",
            }}
          >
            <span className="text-xs" style={{ color: "oklch(0.55 0.04 237)" }}>
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </span>
          </div>

          {results.length === 0 ? (
            <div
              data-ocid="search.empty_state"
              className="flex items-center justify-center h-40"
            >
              <p className="text-sm" style={{ color: "oklch(0.45 0.04 237)" }}>
                No policies match your search
              </p>
            </div>
          ) : (
            <div
              className="divide-y"
              style={{ borderColor: "oklch(0.26 0.05 237 / 0.5)" }}
            >
              {results.map((policy, i) => (
                <motion.button
                  type="button"
                  key={policy.id.toString()}
                  data-ocid={`search.item.${i + 1}`}
                  onClick={() => onSelectPolicy(policy)}
                  className="w-full text-left p-4 transition-colors"
                  style={
                    selectedPolicy?.id === policy.id
                      ? { background: "oklch(0.77 0.12 70 / 0.07)" }
                      : {}
                  }
                  whileHover={{ backgroundColor: "oklch(0.20 0.045 237)" }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3
                      className="font-semibold text-sm leading-snug"
                      style={{
                        color:
                          selectedPolicy?.id === policy.id
                            ? "oklch(0.77 0.12 70)"
                            : "oklch(0.90 0.01 237)",
                      }}
                    >
                      {policy.title}
                    </h3>
                    <span
                      className="text-xs font-mono shrink-0"
                      style={{ color: "oklch(0.45 0.04 237)" }}
                    >
                      {policy.year.toString()}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed mb-2 line-clamp-2"
                    style={{ color: "oklch(0.60 0.03 237)" }}
                  >
                    {policy.summary}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    <Badge
                      variant="outline"
                      className="text-xs h-4 px-1.5"
                      style={{
                        borderColor: "oklch(0.77 0.12 70 / 0.3)",
                        color: "oklch(0.70 0.10 70)",
                        background: "oklch(0.77 0.12 70 / 0.08)",
                      }}
                    >
                      {policy.vertical}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs h-4 px-1.5"
                      style={
                        policy.level === "Central"
                          ? {
                              borderColor: "oklch(0.60 0.15 237 / 0.4)",
                              color: "oklch(0.70 0.10 237)",
                              background: "oklch(0.60 0.15 237 / 0.08)",
                            }
                          : {
                              borderColor: "oklch(0.72 0.19 142 / 0.4)",
                              color: "oklch(0.65 0.15 142)",
                              background: "oklch(0.72 0.19 142 / 0.08)",
                            }
                      }
                    >
                      {policy.level}
                    </Badge>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
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

function FilterChip({
  label,
  active,
  onClick,
  ocid,
}: { label: string; active: boolean; onClick: () => void; ocid: string }) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      className="text-xs px-2.5 py-0.5 rounded-full transition-colors"
      style={
        active
          ? {
              background: "oklch(0.77 0.12 70)",
              color: "oklch(0.13 0.038 237)",
              fontWeight: 600,
            }
          : {
              background: "oklch(0.22 0.045 237)",
              color: "oklch(0.55 0.04 237)",
            }
      }
    >
      {label}
    </button>
  );
}
