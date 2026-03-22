import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

interface Props {
  onComplete: () => void;
}

export function ProfileSetupModal({ onComplete }: Props) {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !name.trim()) return;
    setSaving(true);
    try {
      await actor.saveCallerUserProfile({
        name: name.trim(),
        email: "",
        organization: organization.trim() || undefined,
      });
      toast.success("Profile saved!");
      onComplete();
    } catch {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
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
        data-ocid="profile_setup.dialog"
        className="w-full max-w-sm rounded-2xl border p-7"
        style={{
          background: "oklch(0.17 0.042 237)",
          borderColor: "oklch(0.28 0.05 237)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        <h2
          className="text-lg font-bold mb-1"
          style={{ color: "oklch(0.97 0.01 237)" }}
        >
          Complete Your Profile
        </h2>
        <p className="text-sm mb-6" style={{ color: "oklch(0.55 0.04 237)" }}>
          Tell us a bit about yourself to get started.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="profile-name"
              className="text-xs font-semibold"
              style={{ color: "oklch(0.65 0.04 237)" }}
            >
              Full Name *
            </Label>
            <Input
              id="profile-name"
              data-ocid="profile_setup.name.input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              required
              style={{
                background: "oklch(0.13 0.038 237)",
                borderColor: "oklch(0.26 0.05 237)",
                color: "oklch(0.97 0.01 237)",
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="profile-org"
              className="text-xs font-semibold"
              style={{ color: "oklch(0.65 0.04 237)" }}
            >
              Organization (Optional)
            </Label>
            <Input
              id="profile-org"
              data-ocid="profile_setup.organization.input"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. MNRE, CERC, Adani Green"
              style={{
                background: "oklch(0.13 0.038 237)",
                borderColor: "oklch(0.26 0.05 237)",
                color: "oklch(0.97 0.01 237)",
              }}
            />
          </div>
          <Button
            type="submit"
            data-ocid="profile_setup.submit_button"
            disabled={saving || !name.trim()}
            className="w-full h-10 font-semibold gap-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.77 0.12 70), oklch(0.62 0.10 70))",
              color: "oklch(0.13 0.038 237)",
              border: "none",
            }}
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? "Saving..." : "Get Started"}
          </Button>
        </form>
      </div>
    </div>
  );
}
