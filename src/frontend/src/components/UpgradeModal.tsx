import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Lock, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubscription } from "../context/SubscriptionContext";

interface Props {
  onClose: () => void;
}

const LITE_FEATURES = [
  { label: "Dashboard & Analytics", included: true },
  { label: "Generation, Renewable & Regulations sectors", included: true },
  { label: "Policy titles & summaries", included: true },
  { label: "Keyword search", included: true },
  { label: "All 7 sector verticals", included: false },
  { label: "Key Provisions & Amendment Timelines", included: false },
  { label: "Industry Impact analysis", included: false },
  { label: "Policy Comparison tool", included: false },
  { label: "Advanced search filters", included: false },
  { label: "Source document links", included: false },
];

export function UpgradeModal({ onClose }: Props) {
  const { activatePremium } = useSubscription();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await activatePremium();
      toast.success("Welcome to Premium! 🎉 You now have full access.");
      onClose();
    } catch {
      toast.error("Upgrade failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "oklch(0.09 0.03 237 / 0.85)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        data-ocid="upgrade.dialog"
        className="w-full max-w-lg rounded-2xl border overflow-hidden"
        style={{
          background: "oklch(0.16 0.042 237)",
          borderColor: "oklch(0.28 0.05 237)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div
          className="relative p-6 pb-5"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.20 0.05 237), oklch(0.16 0.042 237))",
            borderBottom: "1px solid oklch(0.26 0.05 237)",
          }}
        >
          <button
            type="button"
            data-ocid="upgrade.close_button"
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-md flex items-center justify-center"
            style={{
              background: "oklch(0.22 0.045 237)",
              color: "oklch(0.55 0.04 237)",
            }}
          >
            <X size={14} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="text-2xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.88 0.14 70), oklch(0.70 0.12 70))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ✦ Premium
            </div>
          </div>
          <p
            className="text-2xl font-bold"
            style={{ color: "oklch(0.97 0.01 237)" }}
          >
            ₹299
            <span
              className="text-sm font-normal"
              style={{ color: "oklch(0.55 0.04 237)" }}
            >
              /month
            </span>
          </p>
          <p className="text-sm mt-1" style={{ color: "oklch(0.60 0.04 237)" }}>
            Full access to India&apos;s complete power policy intelligence
            platform
          </p>
        </div>

        {/* Features */}
        <div className="p-6">
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ color: "oklch(0.50 0.04 237)" }}
          >
            What you get
          </p>
          <div className="space-y-3">
            {LITE_FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: f.included
                      ? "oklch(0.72 0.19 142 / 0.15)"
                      : "oklch(0.77 0.12 70 / 0.15)",
                  }}
                >
                  {f.included ? (
                    <CheckCircle
                      size={11}
                      style={{ color: "oklch(0.72 0.19 142)" }}
                    />
                  ) : (
                    <Lock size={10} style={{ color: "oklch(0.77 0.12 70)" }} />
                  )}
                </div>
                <span
                  className="text-sm"
                  style={{
                    color: f.included
                      ? "oklch(0.65 0.04 237)"
                      : "oklch(0.90 0.01 237)",
                    textDecoration: f.included ? "line-through" : "none",
                    opacity: f.included ? 0.5 : 1,
                  }}
                >
                  {f.label}
                </span>
                {!f.included && (
                  <span
                    className="ml-auto text-xs font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      background: "oklch(0.77 0.12 70 / 0.15)",
                      color: "oklch(0.77 0.12 70)",
                    }}
                  >
                    Premium
                  </span>
                )}
              </div>
            ))}
          </div>

          <Button
            data-ocid="upgrade.confirm_button"
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full h-12 font-bold text-sm mt-6 gap-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.77 0.12 70), oklch(0.62 0.10 70))",
              color: "oklch(0.13 0.038 237)",
              border: "none",
              boxShadow: "0 4px 24px oklch(0.77 0.12 70 / 0.3)",
            }}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Activating..." : "Activate Premium (Mock)"}
          </Button>
          <p
            className="text-xs text-center mt-3"
            style={{ color: "oklch(0.40 0.04 237)" }}
          >
            This is a demonstration — no real payment will be processed
          </p>
        </div>
      </div>
    </div>
  );
}
