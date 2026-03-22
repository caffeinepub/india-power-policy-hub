import {
  Battery,
  Cable,
  FlaskConical,
  GitCompare,
  Home,
  LayoutDashboard,
  Leaf,
  Lock,
  Menu,
  Radar,
  Rss,
  Scale,
  Search,
  Sun,
  TrendingDown,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSubscription } from "../context/SubscriptionContext";

export type View =
  | "dashboard"
  | "search"
  | "compare"
  | "Generation"
  | "Transmission"
  | "Distribution"
  | "Renewable Energy"
  | "Regulations & Tariffs"
  | "Energy Efficiency"
  | "Emerging Tech"
  | "tariff-intelligence"
  | "bess-market"
  | "storage-tech-radar"
  | "energy-feed";

const VERTICALS: {
  id: View;
  label: string;
  icon: React.ReactNode;
  premiumOnly: boolean;
}[] = [
  {
    id: "Generation",
    label: "Generation",
    icon: <Zap size={16} />,
    premiumOnly: false,
  },
  {
    id: "Transmission",
    label: "Transmission",
    icon: <Cable size={16} />,
    premiumOnly: true,
  },
  {
    id: "Distribution",
    label: "Distribution",
    icon: <Home size={16} />,
    premiumOnly: true,
  },
  {
    id: "Renewable Energy",
    label: "Renewable Energy",
    icon: <Sun size={16} />,
    premiumOnly: false,
  },
  {
    id: "Regulations & Tariffs",
    label: "Regulations & Tariffs",
    icon: <Scale size={16} />,
    premiumOnly: false,
  },
  {
    id: "Energy Efficiency",
    label: "Energy Efficiency",
    icon: <Leaf size={16} />,
    premiumOnly: true,
  },
  {
    id: "Emerging Tech",
    label: "Emerging Tech",
    icon: <FlaskConical size={16} />,
    premiumOnly: true,
  },
];

const INTELLIGENCE: {
  id: View;
  label: string;
  icon: React.ReactNode;
  premiumOnly: boolean;
}[] = [
  {
    id: "tariff-intelligence",
    label: "Tariff Intelligence",
    icon: <TrendingDown size={16} />,
    premiumOnly: true,
  },
  {
    id: "bess-market",
    label: "BESS Market",
    icon: <Battery size={16} />,
    premiumOnly: true,
  },
  {
    id: "storage-tech-radar",
    label: "Storage Tech Radar",
    icon: <Radar size={16} />,
    premiumOnly: true,
  },
  {
    id: "energy-feed",
    label: "Energy Feed",
    icon: <Rss size={16} />,
    premiumOnly: false,
  },
];

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
  policyCountByVertical: Record<string, number>;
  isOpen: boolean;
  onToggle: () => void;
  onUpgradeClick: () => void;
}

export function Sidebar({
  activeView,
  onNavigate,
  policyCountByVertical,
  isOpen,
  onToggle,
  onUpgradeClick,
}: SidebarProps) {
  const { isPremium } = useSubscription();

  const handleNavigate = (view: View, premiumOnly: boolean) => {
    if (premiumOnly && !isPremium) {
      onUpgradeClick();
      return;
    }
    onNavigate(view);
    if (window.innerWidth < 768) onToggle();
  };

  const sidebarContent = (
    <aside
      className="flex flex-col h-full w-60"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.042 237) 0%, oklch(0.13 0.038 237) 100%)",
        borderRight: "1px solid oklch(0.26 0.05 237)",
      }}
    >
      {/* Brand */}
      <div
        className="px-5 pt-6 pb-5 border-b flex items-center justify-between"
        style={{ borderColor: "oklch(0.26 0.05 237)" }}
      >
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.77 0.12 70), oklch(0.65 0.10 70))",
                boxShadow: "0 0 12px oklch(0.77 0.12 70 / 0.4)",
              }}
            >
              <Zap size={16} style={{ color: "oklch(0.13 0.038 237)" }} />
            </div>
            <div>
              <div
                className="font-bold text-sm leading-none"
                style={{ color: "oklch(0.97 0.01 237)" }}
              >
                PowerIntel
              </div>
              <div
                className="text-xs font-medium"
                style={{ color: "oklch(0.77 0.12 70)" }}
              >
                | India
              </div>
            </div>
          </div>
          <p className="text-xs mt-2" style={{ color: "oklch(0.65 0.04 237)" }}>
            Power Policy Intelligence
          </p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="md:hidden w-7 h-7 flex items-center justify-center rounded"
          style={{ color: "oklch(0.55 0.04 237)" }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <NavItem
          id="dashboard"
          label="Dashboard"
          icon={<LayoutDashboard size={15} />}
          active={activeView === "dashboard"}
          locked={false}
          onClick={() => handleNavigate("dashboard", false)}
        />
        <NavItem
          id="search"
          label="Search Policies"
          icon={<Search size={15} />}
          active={activeView === "search"}
          locked={false}
          onClick={() => handleNavigate("search", false)}
        />
        <NavItem
          id="compare"
          label="Compare Policies"
          icon={<GitCompare size={15} />}
          active={activeView === "compare"}
          locked={!isPremium}
          onClick={() => handleNavigate("compare", !isPremium)}
        />

        <div className="pt-3 pb-1 px-2">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.45 0.04 237)" }}
          >
            Verticals
          </p>
        </div>

        {VERTICALS.map((v) => (
          <NavItem
            key={v.id}
            id={v.id}
            label={v.label}
            icon={v.icon}
            count={policyCountByVertical[v.id] ?? 0}
            active={activeView === v.id}
            locked={v.premiumOnly && !isPremium}
            onClick={() => handleNavigate(v.id, v.premiumOnly && !isPremium)}
          />
        ))}

        <div className="pt-3 pb-1 px-2">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.45 0.04 237)" }}
          >
            Intelligence
          </p>
        </div>

        {INTELLIGENCE.map((v) => (
          <NavItem
            key={v.id}
            id={v.id}
            label={v.label}
            icon={v.icon}
            active={activeView === v.id}
            locked={v.premiumOnly && !isPremium}
            onClick={() => handleNavigate(v.id, v.premiumOnly && !isPremium)}
          />
        ))}
      </nav>

      {/* Footer */}
      <div
        className="px-4 py-3 border-t text-xs"
        style={{
          borderColor: "oklch(0.26 0.05 237)",
          color: "oklch(0.45 0.04 237)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "oklch(0.72 0.19 142)" }}
          />
          System Online
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden md:block fixed left-0 top-0 h-screen w-60 z-30">
        {sidebarContent}
      </div>

      <button
        type="button"
        data-ocid="nav.menu.toggle"
        onClick={onToggle}
        className="md:hidden fixed top-3 left-3 z-50 w-9 h-9 flex items-center justify-center rounded-lg"
        style={{
          background: "oklch(0.19 0.045 237)",
          border: "1px solid oklch(0.26 0.05 237)",
          color: "oklch(0.80 0.03 237)",
        }}
      >
        <Menu size={17} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40"
              style={{ background: "oklch(0.09 0.03 237 / 0.7)" }}
              onClick={onToggle}
            />
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden fixed left-0 top-0 h-screen w-60 z-50"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({
  id,
  label,
  icon,
  count,
  active,
  locked,
  onClick,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
  active: boolean;
  locked: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      data-ocid={`nav.${id.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`}
      onClick={onClick}
      className="w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
      style={
        locked
          ? {
              color: "oklch(0.38 0.04 237)",
              borderLeft: "3px solid transparent",
            }
          : active
            ? {
                background:
                  "linear-gradient(90deg, oklch(0.77 0.12 70 / 0.18), oklch(0.77 0.12 70 / 0.08))",
                color: "oklch(0.77 0.12 70)",
                borderLeft: "3px solid oklch(0.77 0.12 70)",
              }
            : {
                color: "oklch(0.65 0.04 237)",
                borderLeft: "3px solid transparent",
              }
      }
      whileHover={{ x: locked ? 0 : 2 }}
      transition={{ duration: 0.1 }}
    >
      <span className="flex items-center gap-2.5">
        {icon}
        {label}
      </span>
      <span className="flex items-center gap-1.5">
        {count !== undefined && count > 0 && !locked && (
          <span
            className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
            style={
              active
                ? {
                    background: "oklch(0.77 0.12 70 / 0.25)",
                    color: "oklch(0.77 0.12 70)",
                  }
                : {
                    background: "oklch(0.26 0.05 237)",
                    color: "oklch(0.55 0.04 237)",
                  }
            }
          >
            {count}
          </span>
        )}
        {locked && <Lock size={11} style={{ color: "oklch(0.40 0.04 237)" }} />}
      </span>
    </motion.button>
  );
}
