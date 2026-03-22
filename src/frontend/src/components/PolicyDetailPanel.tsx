import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  ChevronRight,
  ExternalLink,
  Lock,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Policy } from "../backend.d";
import { useSubscription } from "../context/SubscriptionContext";

interface Props {
  policy: Policy | null;
  onClose: () => void;
  onUpgradeClick?: () => void;
}

export function PolicyDetailPanel({ policy, onClose, onUpgradeClick }: Props) {
  const { isPremium } = useSubscription();

  return (
    <AnimatePresence>
      {policy && (
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex flex-col h-full"
          style={{
            background: "oklch(0.17 0.042 237)",
            borderLeft: "1px solid oklch(0.26 0.05 237)",
          }}
        >
          {/* Header */}
          <div
            className="p-4 border-b flex items-start justify-between gap-3"
            style={{ borderColor: "oklch(0.26 0.05 237)" }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    borderColor: "oklch(0.77 0.12 70 / 0.5)",
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
                          borderColor: "oklch(0.60 0.15 237 / 0.5)",
                          color: "oklch(0.75 0.12 237)",
                          background: "oklch(0.60 0.15 237 / 0.1)",
                        }
                      : {
                          borderColor: "oklch(0.72 0.19 142 / 0.5)",
                          color: "oklch(0.72 0.19 142)",
                          background: "oklch(0.72 0.19 142 / 0.1)",
                        }
                  }
                >
                  {policy.level}
                  {policy.state ? ` — ${policy.state}` : ""}
                </Badge>
              </div>
              <h2
                className="font-bold text-sm leading-snug"
                style={{ color: "oklch(0.97 0.01 237)" }}
              >
                {policy.title}
              </h2>
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.55 0.04 237)" }}
              >
                {policy.policyType} · {policy.year.toString()}
              </p>
            </div>
            <Button
              data-ocid="policy_detail.close_button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0"
              onClick={onClose}
              style={{ color: "oklch(0.55 0.04 237)" }}
            >
              <X size={14} />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-5">
              <Section icon={<BookOpen size={13} />} title="Summary">
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.75 0.03 237)" }}
                >
                  {policy.summary}
                </p>
              </Section>

              {/* Key Provisions - locked for lite */}
              {isPremium ? (
                <Section
                  icon={<ChevronRight size={13} />}
                  title="Key Provisions"
                >
                  <ul className="space-y-1.5">
                    {policy.keyProvisions.map((prov) => (
                      <li
                        key={prov}
                        className="flex items-start gap-2 text-xs"
                        style={{ color: "oklch(0.75 0.03 237)" }}
                      >
                        <span
                          className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "oklch(0.77 0.12 70)" }}
                        />
                        {prov}
                      </li>
                    ))}
                  </ul>
                </Section>
              ) : (
                <LockedSection
                  title="Key Provisions"
                  onUpgrade={onUpgradeClick}
                />
              )}

              <Section icon={<Users size={13} />} title="Stakeholders">
                <div className="flex flex-wrap gap-1.5">
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
              </Section>

              {/* Industry Impact - locked for lite */}
              {isPremium ? (
                <Section icon={<Zap size={13} />} title="Industry Impact">
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.75 0.03 237)" }}
                  >
                    {policy.industryImpact}
                  </p>
                </Section>
              ) : (
                <LockedSection
                  title="Industry Impact"
                  onUpgrade={onUpgradeClick}
                />
              )}

              {/* Amendments - locked for lite */}
              {isPremium ? (
                policy.amendments.length > 0 && (
                  <Section
                    icon={<ChevronRight size={13} />}
                    title="Amendment Timeline"
                  >
                    <div className="relative pl-4">
                      <div
                        className="absolute left-1.5 top-0 bottom-0 w-px"
                        style={{ background: "oklch(0.26 0.05 237)" }}
                      />
                      {policy.amendments.map((a) => (
                        <div
                          key={a.version}
                          className="relative mb-4 last:mb-0"
                        >
                          <div
                            className="absolute -left-2.5 top-1 w-2 h-2 rounded-full border"
                            style={{
                              background: "oklch(0.77 0.12 70)",
                              borderColor: "oklch(0.13 0.038 237)",
                            }}
                          />
                          <div
                            className="text-xs font-semibold mb-0.5"
                            style={{ color: "oklch(0.77 0.12 70)" }}
                          >
                            {a.version}
                          </div>
                          <div
                            className="text-xs mb-1"
                            style={{ color: "oklch(0.45 0.04 237)" }}
                          >
                            {a.date}
                          </div>
                          <div
                            className="text-xs leading-relaxed"
                            style={{ color: "oklch(0.65 0.04 237)" }}
                          >
                            {a.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                )
              ) : (
                <LockedSection
                  title="Amendment Timeline"
                  onUpgrade={onUpgradeClick}
                />
              )}
            </div>
          </ScrollArea>

          <div
            className="p-4 border-t"
            style={{ borderColor: "oklch(0.26 0.05 237)" }}
          >
            {isPremium ? (
              <a
                href={policy.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  data-ocid="policy_detail.source_button"
                  className="w-full text-xs gap-2 font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.77 0.12 70), oklch(0.65 0.10 70))",
                    color: "oklch(0.13 0.038 237)",
                  }}
                >
                  <ExternalLink size={13} /> View Source Document
                </Button>
              </a>
            ) : (
              <Button
                data-ocid="policy_detail.upgrade_button"
                onClick={onUpgradeClick}
                className="w-full text-xs gap-2 font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.77 0.12 70 / 0.2), oklch(0.65 0.10 70 / 0.2))",
                  color: "oklch(0.77 0.12 70)",
                  border: "1px solid oklch(0.77 0.12 70 / 0.4)",
                }}
              >
                <Lock size={12} /> Upgrade for Source Document
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LockedSection({
  title,
  onUpgrade,
}: { title: string; onUpgrade?: () => void }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <Lock size={12} style={{ color: "oklch(0.50 0.04 237)" }} />
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "oklch(0.50 0.04 237)" }}
        >
          {title}
        </h3>
      </div>
      <button
        type="button"
        className="w-full rounded-lg p-3 border text-left cursor-pointer"
        style={{
          background: "oklch(0.15 0.040 237)",
          borderColor: "oklch(0.77 0.12 70 / 0.2)",
          borderStyle: "dashed",
        }}
        onClick={onUpgrade}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <Lock size={12} style={{ color: "oklch(0.77 0.12 70)" }} />
          <span
            className="text-xs font-semibold"
            style={{ color: "oklch(0.77 0.12 70)" }}
          >
            Premium Feature
          </span>
        </div>
        <p className="text-xs" style={{ color: "oklch(0.50 0.04 237)" }}>
          Upgrade to Premium to unlock {title.toLowerCase()} and full policy
          analysis.
        </p>
        <span
          data-ocid="policy_detail.upgrade_cta.button"
          className="mt-2 text-xs font-semibold hover:underline block"
          style={{ color: "oklch(0.77 0.12 70)" }}
        >
          Upgrade ₹299/mo →
        </span>
      </button>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <span style={{ color: "oklch(0.77 0.12 70)" }}>{icon}</span>
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "oklch(0.77 0.12 70)" }}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
