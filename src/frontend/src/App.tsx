import { Toaster } from "@/components/ui/sonner";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, Crown, Loader2, LogOut } from "lucide-react";
import { useMemo, useState } from "react";
import type { Policy } from "./backend.d";
import type { UserProfile } from "./backend.d";
import { LoginScreen } from "./components/LoginScreen";
import { ProfileSetupModal } from "./components/ProfileSetupModal";
import { Sidebar, type View } from "./components/Sidebar";
import { UpgradeModal } from "./components/UpgradeModal";
import {
  SubscriptionProvider,
  useSubscription,
} from "./context/SubscriptionContext";
import { useActor } from "./hooks/useActor";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useAllPolicies } from "./hooks/useQueries";
import { BessMarketPage } from "./pages/BessMarketPage";
import { ComparePage } from "./pages/ComparePage";
import { Dashboard } from "./pages/Dashboard";
import { EnergyFeedPage } from "./pages/EnergyFeedPage";
import { SearchPage } from "./pages/SearchPage";
import { StorageTechRadarPage } from "./pages/StorageTechRadarPage";
import { TariffIntelligencePage } from "./pages/TariffIntelligencePage";
import { VerticalPage } from "./pages/VerticalPage";

const queryClient = new QueryClient();

function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

const VIEW_TITLES: Record<string, string> = {
  dashboard: "National Power Policy Intelligence Platform",
  search: "Policy Search",
  compare: "Policy Comparison",
  "tariff-intelligence": "Tariff Intelligence Engine",
  "bess-market": "India BESS Market Tracker",
  "storage-tech-radar": "Storage Technology Radar",
  "energy-feed": "Energy Intelligence Feed",
};

const INTELLIGENCE_VIEWS = [
  "tariff-intelligence",
  "bess-market",
  "storage-tech-radar",
  "energy-feed",
];
const CORE_VIEWS = ["dashboard", "search", "compare"];

function AppContent() {
  const { identity, clear, isInitializing } = useInternetIdentity();
  const qc = useQueryClient();
  const isAuthenticated = !!identity;

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();
  const showProfileSetup =
    isAuthenticated &&
    !profileLoading &&
    profileFetched &&
    userProfile === null;

  const [activeView, setActiveView] = useState<View>("dashboard");
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const { data: policies = [], isLoading } = useAllPolicies();
  const { isPremium } = useSubscription();

  const policyCountByVertical = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of policies) {
      counts[p.vertical] = (counts[p.vertical] ?? 0) + 1;
    }
    return counts;
  }, [policies]);

  const handleNavigate = (view: View) => {
    setActiveView(view);
    setSelectedPolicy(null);
  };

  const handleLogout = async () => {
    await clear();
    qc.clear();
  };

  const pageTitle = VIEW_TITLES[activeView] ?? `${activeView} Policies`;

  if (isInitializing) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ background: "oklch(0.11 0.035 237)" }}
      >
        <Loader2
          size={24}
          className="animate-spin"
          style={{ color: "oklch(0.77 0.12 70)" }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  const isVerticalView =
    !CORE_VIEWS.includes(activeView) &&
    !INTELLIGENCE_VIEWS.includes(activeView);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "oklch(0.13 0.038 237)" }}
    >
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        policyCountByVertical={policyCountByVertical}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        onUpgradeClick={() => setShowUpgrade(true)}
      />

      <div className="flex-1 flex flex-col md:ml-60 overflow-hidden">
        {/* Top bar */}
        <header
          className="shrink-0 h-14 flex items-center justify-between px-4 md:px-5 border-b"
          style={{
            background: "oklch(0.15 0.040 237 / 0.9)",
            borderColor: "oklch(0.26 0.05 237)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="md:hidden w-9" />
          <div className="flex-1 px-2 md:px-0">
            <h2
              className="text-sm font-semibold"
              style={{ color: "oklch(0.80 0.03 237)" }}
            >
              {pageTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {isPremium ? (
              <div
                className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.77 0.12 70), oklch(0.62 0.10 70))",
                  color: "oklch(0.13 0.038 237)",
                }}
              >
                <Crown size={12} />
                PREMIUM
              </div>
            ) : (
              <button
                type="button"
                data-ocid="topbar.upgrade.button"
                onClick={() => setShowUpgrade(true)}
                className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md font-semibold transition-colors"
                style={{
                  background: "oklch(0.22 0.045 237)",
                  color: "oklch(0.77 0.12 70)",
                  border: "1px solid oklch(0.77 0.12 70 / 0.3)",
                }}
              >
                Upgrade ₹299/mo
              </button>
            )}

            <div
              className="sm:hidden text-xs px-2 py-1 rounded font-bold"
              style={
                isPremium
                  ? {
                      background: "oklch(0.77 0.12 70)",
                      color: "oklch(0.13 0.038 237)",
                    }
                  : {
                      background: "oklch(0.22 0.045 237)",
                      color: "oklch(0.77 0.12 70)",
                    }
              }
            >
              {isPremium ? "PRO" : "LITE"}
            </div>

            <button
              type="button"
              data-ocid="topbar.notifications.button"
              className="w-8 h-8 rounded-md flex items-center justify-center"
              style={{
                background: "oklch(0.22 0.045 237)",
                color: "oklch(0.65 0.04 237)",
              }}
            >
              <Bell size={15} />
            </button>

            {userProfile && (
              <div
                className="hidden md:flex items-center gap-2 px-2 py-1 rounded-md"
                style={{ background: "oklch(0.19 0.045 237)" }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "oklch(0.77 0.12 70)",
                    color: "oklch(0.13 0.038 237)",
                  }}
                >
                  {userProfile.name.charAt(0).toUpperCase()}
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "oklch(0.80 0.03 237)" }}
                >
                  {userProfile.name.split(" ")[0]}
                </span>
              </div>
            )}

            <button
              type="button"
              data-ocid="topbar.logout.button"
              onClick={handleLogout}
              className="w-8 h-8 rounded-md flex items-center justify-center"
              style={{
                background: "oklch(0.22 0.045 237)",
                color: "oklch(0.55 0.04 237)",
              }}
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-hidden">
          {activeView === "dashboard" && (
            <Dashboard
              policies={policies}
              isLoading={isLoading}
              selectedPolicy={selectedPolicy}
              onSelectPolicy={setSelectedPolicy}
              onClosePolicy={() => setSelectedPolicy(null)}
              onUpgradeClick={() => setShowUpgrade(true)}
            />
          )}
          {activeView === "search" && (
            <SearchPage
              policies={policies}
              selectedPolicy={selectedPolicy}
              onSelectPolicy={setSelectedPolicy}
              onClosePolicy={() => setSelectedPolicy(null)}
              onUpgradeClick={() => setShowUpgrade(true)}
            />
          )}
          {activeView === "compare" && (
            <ComparePage
              policies={policies}
              onUpgradeClick={() => setShowUpgrade(true)}
            />
          )}
          {activeView === "tariff-intelligence" && (
            <TariffIntelligencePage
              onUpgradeClick={() => setShowUpgrade(true)}
            />
          )}
          {activeView === "bess-market" && (
            <BessMarketPage onUpgradeClick={() => setShowUpgrade(true)} />
          )}
          {activeView === "storage-tech-radar" && (
            <StorageTechRadarPage onUpgradeClick={() => setShowUpgrade(true)} />
          )}
          {activeView === "energy-feed" && (
            <EnergyFeedPage onUpgradeClick={() => setShowUpgrade(true)} />
          )}
          {isVerticalView && (
            <VerticalPage
              vertical={activeView}
              policies={policies}
              selectedPolicy={selectedPolicy}
              onSelectPolicy={setSelectedPolicy}
              onClosePolicy={() => setSelectedPolicy(null)}
              onUpgradeClick={() => setShowUpgrade(true)}
            />
          )}
        </main>
      </div>

      <div className="fixed bottom-0 left-0 right-0 pointer-events-none flex justify-center pb-2 z-50">
        <div className="text-xs" style={{ color: "oklch(0.30 0.04 237)" }}>
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto hover:underline"
            style={{ color: "oklch(0.45 0.04 237)" }}
          >
            caffeine.ai
          </a>
        </div>
      </div>

      {showProfileSetup && (
        <ProfileSetupModal
          onComplete={() =>
            qc.invalidateQueries({ queryKey: ["currentUserProfile"] })
          }
        />
      )}
      {showUpgrade && !isPremium && (
        <UpgradeModal onClose={() => setShowUpgrade(false)} />
      )}

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SubscriptionProvider>
        <AppContent />
      </SubscriptionProvider>
    </QueryClientProvider>
  );
}
