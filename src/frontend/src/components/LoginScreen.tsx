import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function LoginScreen() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "oklch(0.11 0.035 237)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.77 0.12 70) 1px, transparent 1px), linear-gradient(90deg, oklch(0.77 0.12 70) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.77 0.12 70), transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-8"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.77 0.12 70), oklch(0.62 0.10 70))",
              boxShadow: "0 0 40px oklch(0.77 0.12 70 / 0.3)",
            }}
          >
            <Zap size={28} style={{ color: "oklch(0.13 0.038 237)" }} />
          </motion.div>

          <h1
            className="text-3xl font-bold text-center mb-1"
            style={{ color: "oklch(0.97 0.01 237)" }}
          >
            PowerIntel India
          </h1>
          <p
            className="text-sm text-center"
            style={{ color: "oklch(0.55 0.04 237)" }}
          >
            National Power Policy Intelligence Platform
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 border"
          style={{
            background: "oklch(0.16 0.042 237)",
            borderColor: "oklch(0.26 0.05 237)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          }}
        >
          <h2
            className="text-lg font-semibold mb-2 text-center"
            style={{ color: "oklch(0.90 0.01 237)" }}
          >
            Welcome back
          </h2>
          <p
            className="text-sm text-center mb-7"
            style={{ color: "oklch(0.50 0.04 237)" }}
          >
            Sign in to access India&apos;s comprehensive power sector policy
            database
          </p>

          <Button
            data-ocid="login.primary_button"
            onClick={login}
            disabled={isLoggingIn}
            className="w-full h-11 font-semibold text-sm gap-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.77 0.12 70), oklch(0.62 0.10 70))",
              color: "oklch(0.13 0.038 237)",
              border: "none",
            }}
          >
            {isLoggingIn ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In with Internet Identity"
            )}
          </Button>

          <p
            className="text-xs text-center mt-5"
            style={{ color: "oklch(0.40 0.04 237)" }}
          >
            Secure, decentralized identity — no password required
          </p>
        </div>

        {/* Features teaser */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { icon: "⚡", label: "7 Sector Verticals" },
            { icon: "📋", label: "50+ Policies" },
            { icon: "📊", label: "Amendment Timelines" },
          ].map((f) => (
            <div
              key={f.label}
              className="rounded-xl p-3 text-center border"
              style={{
                background: "oklch(0.14 0.040 237)",
                borderColor: "oklch(0.22 0.045 237)",
              }}
            >
              <div className="text-xl mb-1">{f.icon}</div>
              <div
                className="text-xs font-medium"
                style={{ color: "oklch(0.60 0.04 237)" }}
              >
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <div
        className="absolute bottom-4 text-xs"
        style={{ color: "oklch(0.30 0.04 237)" }}
      >
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: "oklch(0.45 0.04 237)" }}
        >
          caffeine.ai
        </a>
      </div>
    </div>
  );
}
