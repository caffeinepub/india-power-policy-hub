import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, GitCompare, Lock } from "lucide-react";
import { useState } from "react";
import type { Policy } from "../backend.d";
import { useSubscription } from "../context/SubscriptionContext";

interface Props {
  policies: Policy[];
  onUpgradeClick: () => void;
}

export function ComparePage({ policies, onUpgradeClick }: Props) {
  const { isPremium } = useSubscription();
  const [leftId, setLeftId] = useState<bigint | null>(policies[0]?.id ?? null);
  const [rightId, setRightId] = useState<bigint | null>(
    policies[3]?.id ?? null,
  );

  const leftPolicy = policies.find((p) => p.id === leftId) ?? null;
  const rightPolicy = policies.find((p) => p.id === rightId) ?? null;

  if (!isPremium) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div
          className="max-w-md w-full rounded-2xl border p-8 text-center"
          style={{
            background: "oklch(0.17 0.042 237)",
            borderColor: "oklch(0.77 0.12 70 / 0.2)",
            borderStyle: "dashed",
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "oklch(0.77 0.12 70 / 0.1)" }}
          >
            <Lock size={28} style={{ color: "oklch(0.77 0.12 70)" }} />
          </div>
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: "oklch(0.97 0.01 237)" }}
          >
            Premium Feature
          </h2>
          <p className="text-sm mb-6" style={{ color: "oklch(0.55 0.04 237)" }}>
            The Policy Comparison tool lets you compare any two policies
            side-by-side with full details, amendments, and impact analysis.
          </p>
          <Button
            data-ocid="compare.upgrade.primary_button"
            onClick={onUpgradeClick}
            className="w-full font-bold gap-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.77 0.12 70), oklch(0.62 0.10 70))",
              color: "oklch(0.13 0.038 237)",
              border: "none",
            }}
          >
            <GitCompare size={15} />
            Unlock Comparison — ₹299/mo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div
        className="p-5 border-b shrink-0"
        style={{ borderColor: "oklch(0.26 0.05 237)" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <GitCompare size={18} style={{ color: "oklch(0.77 0.12 70)" }} />
          <h1
            className="text-xl font-bold"
            style={{ color: "oklch(0.97 0.01 237)" }}
          >
            Compare Policies
          </h1>
        </div>
        <p className="text-sm" style={{ color: "oklch(0.55 0.04 237)" }}>
          Select two policies to compare side-by-side
        </p>
      </div>

      {/* Selectors */}
      <div
        className="grid grid-cols-2 gap-4 p-4 border-b shrink-0"
        style={{ borderColor: "oklch(0.26 0.05 237)" }}
      >
        <PolicySelector
          label="Policy A"
          selectId="compare-policy-a"
          value={leftId}
          onChange={setLeftId}
          policies={policies}
          ocid="compare.policy_a.select"
        />
        <PolicySelector
          label="Policy B"
          selectId="compare-policy-b"
          value={rightId}
          onChange={setRightId}
          policies={policies}
          ocid="compare.policy_b.select"
        />
      </div>

      {/* Comparison */}
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-2 gap-0 min-h-full">
          <CompareColumn policy={leftPolicy} side="left" />
          <CompareColumn policy={rightPolicy} side="right" />
        </div>
      </ScrollArea>
    </div>
  );
}

function PolicySelector({
  label,
  selectId,
  value,
  onChange,
  policies,
  ocid,
}: {
  label: string;
  selectId: string;
  value: bigint | null;
  onChange: (id: bigint) => void;
  policies: Policy[];
  ocid: string;
}) {
  return (
    <div>
      <label
        htmlFor={selectId}
        className="text-xs font-semibold mb-1.5 block"
        style={{ color: "oklch(0.65 0.04 237)" }}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          data-ocid={ocid}
          value={value?.toString() ?? ""}
          onChange={(e) => onChange(BigInt(e.target.value))}
          className="w-full appearance-none text-xs px-3 py-2.5 pr-8 rounded-md outline-none"
          style={{
            background: "oklch(0.17 0.042 237)",
            border: "1px solid oklch(0.26 0.05 237)",
            color: "oklch(0.90 0.01 237)",
          }}
        >
          {policies.map((p) => (
            <option
              key={p.id.toString()}
              value={p.id.toString()}
              style={{ background: "oklch(0.17 0.042 237)" }}
            >
              {p.title} ({p.year.toString()})
            </option>
          ))}
        </select>
        <ChevronDown
          size={13}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "oklch(0.55 0.04 237)" }}
        />
      </div>
    </div>
  );
}

function CompareColumn({
  policy,
  side,
}: { policy: Policy | null; side: "left" | "right" }) {
  const borderStyle =
    side === "left" ? { borderRight: "1px solid oklch(0.26 0.05 237)" } : {};

  if (!policy) {
    return (
      <div className="p-6 flex items-center justify-center" style={borderStyle}>
        <p className="text-sm" style={{ color: "oklch(0.45 0.04 237)" }}>
          Select a policy
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-5" style={borderStyle}>
      <div
        className="rounded-lg p-4 border"
        style={{
          background: "oklch(0.17 0.042 237)",
          borderColor: "oklch(0.77 0.12 70 / 0.2)",
        }}
      >
        <div className="flex flex-wrap gap-1.5 mb-2">
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              borderColor: "oklch(0.77 0.12 70 / 0.4)",
              color: "oklch(0.77 0.12 70)",
              background: "oklch(0.77 0.12 70 / 0.1)",
            }}
          >
            {policy.vertical}
          </Badge>
          <Badge
            variant="outline"
            className="text-xs"
            style={
              policy.level === "Central"
                ? {
                    borderColor: "oklch(0.60 0.15 237 / 0.4)",
                    color: "oklch(0.70 0.10 237)",
                    background: "oklch(0.60 0.15 237 / 0.1)",
                  }
                : {
                    borderColor: "oklch(0.72 0.19 142 / 0.4)",
                    color: "oklch(0.65 0.15 142)",
                    background: "oklch(0.72 0.19 142 / 0.1)",
                  }
            }
          >
            {policy.level}
          </Badge>
        </div>
        <h2
          className="font-bold text-sm leading-snug mb-1"
          style={{ color: "oklch(0.97 0.01 237)" }}
        >
          {policy.title}
        </h2>
        <p className="text-xs" style={{ color: "oklch(0.55 0.04 237)" }}>
          {policy.policyType} · {policy.year.toString()}
        </p>
      </div>

      <CompareSection title="Summary">
        <p
          className="text-xs leading-relaxed"
          style={{ color: "oklch(0.70 0.03 237)" }}
        >
          {policy.summary}
        </p>
      </CompareSection>

      <CompareSection title="Key Provisions">
        <ul className="space-y-1.5">
          {policy.keyProvisions.map((prov) => (
            <li
              key={prov}
              className="flex items-start gap-2 text-xs"
              style={{ color: "oklch(0.70 0.03 237)" }}
            >
              <span
                className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                style={{ background: "oklch(0.77 0.12 70)" }}
              />
              {prov}
            </li>
          ))}
        </ul>
      </CompareSection>

      <CompareSection title="Stakeholders">
        <div className="flex flex-wrap gap-1">
          {policy.stakeholders.map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "oklch(0.22 0.045 237)",
                color: "oklch(0.65 0.04 237)",
                border: "1px solid oklch(0.28 0.05 237)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </CompareSection>

      <CompareSection title="Industry Impact">
        <p
          className="text-xs leading-relaxed"
          style={{ color: "oklch(0.70 0.03 237)" }}
        >
          {policy.industryImpact}
        </p>
      </CompareSection>

      <CompareSection title="Amendments">
        {policy.amendments.length === 0 ? (
          <p className="text-xs" style={{ color: "oklch(0.45 0.04 237)" }}>
            No amendments recorded
          </p>
        ) : (
          <div className="space-y-2">
            {policy.amendments.map((a) => (
              <div
                key={a.version}
                className="text-xs p-2.5 rounded"
                style={{
                  background: "oklch(0.15 0.040 237)",
                  border: "1px solid oklch(0.26 0.05 237)",
                }}
              >
                <div
                  className="font-semibold mb-0.5"
                  style={{ color: "oklch(0.77 0.12 70)" }}
                >
                  {a.version}
                </div>
                <div style={{ color: "oklch(0.45 0.04 237)" }}>{a.date}</div>
                <div className="mt-1" style={{ color: "oklch(0.65 0.04 237)" }}>
                  {a.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </CompareSection>
    </div>
  );
}

function CompareSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: "oklch(0.77 0.12 70)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
