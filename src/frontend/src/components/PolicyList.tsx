import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Policy } from "../backend.d";

interface Props {
  policies: Policy[];
  selectedId: bigint | null;
  onSelect: (policy: Policy) => void;
  filterVertical?: string;
  showSearch?: boolean;
}

export function PolicyList({
  policies,
  selectedId,
  onSelect,
  filterVertical,
  showSearch = true,
}: Props) {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<"All" | "Central" | "State">(
    "All",
  );

  const filtered = policies.filter((p) => {
    const matchesVertical = !filterVertical || p.vertical === filterVertical;
    const matchesLevel = levelFilter === "All" || p.level === levelFilter;
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase());
    return matchesVertical && matchesLevel && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      {showSearch && (
        <div
          className="p-3 border-b space-y-2"
          style={{ borderColor: "oklch(0.26 0.05 237)" }}
        >
          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "oklch(0.45 0.04 237)" }}
            />
            <Input
              data-ocid="policy_list.search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter policies..."
              className="pl-8 h-8 text-xs"
              style={{
                background: "oklch(0.13 0.038 237)",
                borderColor: "oklch(0.26 0.05 237)",
                color: "oklch(0.97 0.01 237)",
              }}
            />
          </div>
          <div className="flex gap-1.5">
            {(["All", "Central", "State"] as const).map((l) => (
              <button
                type="button"
                key={l}
                data-ocid={`policy_list.${l.toLowerCase()}.tab`}
                onClick={() => setLevelFilter(l)}
                className="text-xs px-2.5 py-1 rounded-full font-medium transition-colors"
                style={
                  levelFilter === l
                    ? {
                        background: "oklch(0.77 0.12 70)",
                        color: "oklch(0.13 0.038 237)",
                      }
                    : {
                        background: "oklch(0.22 0.045 237)",
                        color: "oklch(0.55 0.04 237)",
                      }
                }
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div
            data-ocid="policy_list.empty_state"
            className="flex flex-col items-center justify-center h-40 text-center px-4"
          >
            <p className="text-sm" style={{ color: "oklch(0.45 0.04 237)" }}>
              No policies found
            </p>
          </div>
        ) : (
          <div
            className="divide-y"
            style={{ borderColor: "oklch(0.26 0.05 237 / 0.5)" }}
          >
            {filtered.map((policy, i) => (
              <motion.button
                type="button"
                key={policy.id.toString()}
                data-ocid={`policy_list.item.${i + 1}`}
                onClick={() => onSelect(policy)}
                className="w-full text-left p-3 transition-colors duration-100"
                style={
                  selectedId === policy.id
                    ? { background: "oklch(0.77 0.12 70 / 0.08)" }
                    : { background: "transparent" }
                }
                whileHover={{ backgroundColor: "oklch(0.20 0.045 237)" }}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span
                    className="text-xs font-semibold leading-snug flex-1"
                    style={{
                      color:
                        selectedId === policy.id
                          ? "oklch(0.77 0.12 70)"
                          : "oklch(0.90 0.01 237)",
                    }}
                  >
                    {policy.title}
                  </span>
                  <span
                    className="text-xs shrink-0 font-mono"
                    style={{ color: "oklch(0.45 0.04 237)" }}
                  >
                    {policy.year.toString()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
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
                  <span
                    className="text-xs"
                    style={{ color: "oklch(0.50 0.04 237)" }}
                  >
                    {policy.policyType}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
