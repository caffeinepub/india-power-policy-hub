import { Rss } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface Props {
  onUpgradeClick: () => void;
}

const CARD_BG = "oklch(0.17 0.042 237)";
const BORDER = "oklch(0.26 0.05 237)";
const AMBER = "oklch(0.77 0.12 70)";

type Category =
  | "All"
  | "Policy"
  | "Tariff"
  | "Tender"
  | "Technology"
  | "Market Update";
type Sector = "All Sectors" | "BESS" | "Solar" | "Wind" | "Storage";

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Policy: { bg: "oklch(0.45 0.15 237 / 0.2)", text: "oklch(0.70 0.18 237)" },
  Tariff: { bg: "oklch(0.77 0.12 70 / 0.2)", text: AMBER },
  Tender: { bg: "oklch(0.55 0.15 295 / 0.2)", text: "oklch(0.72 0.15 295)" },
  Technology: {
    bg: "oklch(0.45 0.15 142 / 0.2)",
    text: "oklch(0.70 0.18 142)",
  },
  "Market Update": {
    bg: "oklch(0.45 0.15 200 / 0.2)",
    text: "oklch(0.70 0.18 200)",
  },
};

const SECTOR_COLORS: Record<string, { bg: string; text: string }> = {
  BESS: { bg: "oklch(0.60 0.15 55 / 0.2)", text: "oklch(0.75 0.14 55)" },
  Solar: { bg: "oklch(0.77 0.12 70 / 0.2)", text: AMBER },
  Wind: { bg: "oklch(0.55 0.15 185 / 0.2)", text: "oklch(0.70 0.15 185)" },
  Storage: { bg: "oklch(0.55 0.15 295 / 0.2)", text: "oklch(0.72 0.15 295)" },
};

const FEED_ITEMS: {
  date: string;
  cat: string;
  sector: string;
  title: string;
  summary: string;
  source: string;
}[] = [
  {
    date: "Mar 2026",
    cat: "Tender",
    sector: "BESS",
    title: "SECI issues 5 GWh standalone BESS tender",
    summary:
      "SECI releases RfS for 5 GWh/1250 MW standalone BESS under PM-KUSUM framework targeting 4-hour duration storage systems.",
    source: "SECI",
  },
  {
    date: "Mar 2026",
    cat: "Tariff",
    sector: "Solar",
    title: "GUVNL discovers ₹2.02/kWh in solar auction",
    summary:
      "Gujarat Urja Vikas Nigam records lowest-ever solar tariff at ₹2.02/kWh in 500 MW auction; 7 bidders participated.",
    source: "GUVNL",
  },
  {
    date: "Feb 2026",
    cat: "Policy",
    sector: "Storage",
    title: "Ministry of Power notifies Battery Storage Policy 2026",
    summary:
      "Comprehensive policy framework for grid-scale battery storage including must-run status, grid connection norms, and ancillary services participation.",
    source: "Ministry of Power",
  },
  {
    date: "Feb 2026",
    cat: "Market Update",
    sector: "BESS",
    title: "India crosses 1 GWh operational BESS milestone",
    summary:
      "India's cumulative operational battery storage capacity crosses 1 GWh mark, led by projects in Rajasthan and Gujarat.",
    source: "CEA",
  },
  {
    date: "Jan 2026",
    cat: "Tariff",
    sector: "BESS",
    title: "SECI Solar+BESS (4hr) L1 at ₹2.70/kWh",
    summary:
      "Lowest-ever Solar+BESS tariff discovered at ₹2.70/kWh for 4-hour duration system in 1500 MW SECI auction.",
    source: "SECI",
  },
  {
    date: "Jan 2026",
    cat: "Tender",
    sector: "Wind",
    title: "SECI 10 GW wind repowering tender launched",
    summary:
      "SECI launches India's largest wind repowering tender covering sites across Tamil Nadu, Rajasthan, and Gujarat with new 2MW+ turbines.",
    source: "SECI",
  },
  {
    date: "Dec 2025",
    cat: "Technology",
    sector: "BESS",
    title: "NTPC commissions 100 MW battery storage in Leh",
    summary:
      "NTPC's 100 MW/200 MWh BESS project commissioned in Leh to provide grid stability and reduce diesel dependence in J&K.",
    source: "NTPC",
  },
  {
    date: "Dec 2025",
    cat: "Policy",
    sector: "Solar",
    title: "MNRE releases PM Surya Ghar Phase 2 guidelines",
    summary:
      "Phase 2 extends rooftop solar subsidy to 2 crore households, increases subsidy to ₹30,000 for 3kW systems, mandates portal registration.",
    source: "MNRE",
  },
  {
    date: "Nov 2025",
    cat: "Tariff",
    sector: "BESS",
    title: "MSEDCL standalone BESS tariff at ₹2.08L/MW/month",
    summary:
      "Maharashtra records lowest standalone BESS tariff at ₹2.08 lakh/MW/month in 1000 MWh tender, 53% lower than 2021 benchmark.",
    source: "MSEDCL",
  },
  {
    date: "Nov 2025",
    cat: "Tender",
    sector: "BESS",
    title: "UPPCL releases 500 MWh BESS tender for UP grid",
    summary:
      "Uttar Pradesh Power Corp issues tender for 500 MWh battery storage to manage peak demand in western UP grid zone.",
    source: "UPPCL",
  },
  {
    date: "Oct 2025",
    cat: "Market Update",
    sector: "Solar",
    title: "India solar capacity crosses 100 GW",
    summary:
      "India's cumulative solar installations reach 100 GW milestone, with utility-scale projects comprising 73% of total capacity.",
    source: "CEA",
  },
  {
    date: "Oct 2025",
    cat: "Policy",
    sector: "Storage",
    title: "CERC notifies ancillary services regulations for BESS",
    summary:
      "Central Electricity Regulatory Commission notifies regulations enabling battery storage to participate in frequency regulation and spinning reserve markets.",
    source: "CERC",
  },
  {
    date: "Sep 2025",
    cat: "Tariff",
    sector: "BESS",
    title: "FDRE tariff falls to ₹4.38/kWh in SECI auction",
    summary:
      "Firm and Dispatchable Renewable Energy (FDRE) tariff reaches ₹4.38/kWh, down from ₹5.60/kWh in 2022, driven by cheaper solar and storage.",
    source: "SECI",
  },
  {
    date: "Sep 2025",
    cat: "Technology",
    sector: "Storage",
    title: "Flow battery pilot commissioned in Andhra Pradesh",
    summary:
      "8-hour vanadium flow battery system of 2 MW/16 MWh commissioned in AP; first commercial flow battery project in India.",
    source: "APERC",
  },
  {
    date: "Aug 2025",
    cat: "Tender",
    sector: "BESS",
    title: "102 GWh tendered in FY2025, a record",
    summary:
      "India issued record 102 GWh of BESS tenders in FY2025, up from 42 GWh in FY2023, signaling accelerated storage procurement.",
    source: "MNRE",
  },
  {
    date: "Aug 2025",
    cat: "Market Update",
    sector: "Wind",
    title: "Wind repowering market to reach 10 GW by 2027",
    summary:
      "CEA report estimates 10 GW of old wind farms (pre-2010) are eligible for repowering with modern turbines, potentially doubling output.",
    source: "CEA",
  },
  {
    date: "Jul 2025",
    cat: "Policy",
    sector: "BESS",
    title: "VGF scheme extended for BESS projects to 2028",
    summary:
      "Ministry of Power extends Viability Gap Funding for standalone BESS projects until 2028 with enhanced funding of ₹3,500 crore per GWh.",
    source: "Ministry of Power",
  },
  {
    date: "Jun 2025",
    cat: "Tariff",
    sector: "Solar",
    title: "Rooftop solar tariff benchmark revised to ₹3.20/kWh",
    summary:
      "MNRE revises benchmark cost for rooftop solar to reflect market conditions; DISCOM procurement cost for net-metering adjusted accordingly.",
    source: "MNRE",
  },
  {
    date: "May 2025",
    cat: "Technology",
    sector: "BESS",
    title: "Sodium-ion battery pilot by ISRO-CSIR partnership",
    summary:
      "ISRO and CSIR jointly demonstrate 10 kWh sodium-ion battery pack; plans for 1 MW grid demonstration under National Mission on Strategic Knowledge.",
    source: "ISRO",
  },
  {
    date: "Apr 2025",
    cat: "Market Update",
    sector: "BESS",
    title: "Chinese LFP cell prices fall to $60/kWh",
    summary:
      "LFP cell prices in China hit $60/kWh in Q1 2025, down 40% year-on-year, directly enabling sub-₹3/kWh solar+BESS tariffs in India.",
    source: "Bloomberg NEF",
  },
  {
    date: "Mar 2025",
    cat: "Tender",
    sector: "Solar",
    title: "SECI 10 GW ultra-mega solar park tender",
    summary:
      "SECI launches 10 GW ultra-mega solar park tender at Khavda, Gujarat, with integrated transmission infrastructure and 20-year PPA.",
    source: "SECI",
  },
  {
    date: "Feb 2025",
    cat: "Policy",
    sector: "Wind",
    title: "Repowering policy notified by Ministry of Power",
    summary:
      "Policy enables owners of pre-2011 wind turbines to replace with modern turbines; provides grid priority, simplified land-lease extension, and accelerated depreciation.",
    source: "Ministry of Power",
  },
  {
    date: "Jan 2025",
    cat: "Tariff",
    sector: "BESS",
    title: "Standalone BESS benchmark at ₹2.85L/MW/month",
    summary:
      "SECI's 2500 MWh standalone BESS auction discovers tariff of ₹2.85 lakh/MW/month, down from ₹4.44 lakh in 2021.",
    source: "SECI",
  },
  {
    date: "Dec 2024",
    cat: "Market Update",
    sector: "Solar",
    title: "India achieves 500 GW RE capacity target 3 years early",
    summary:
      "India's total renewable capacity including large hydro reaches 500 GW target set for 2030, achieved in December 2024.",
    source: "CEA",
  },
  {
    date: "Nov 2024",
    cat: "Technology",
    sector: "Storage",
    title: "Green hydrogen storage pilot at NTPC Vindhyachal",
    summary:
      "NTPC commissions 1 MW electrolyzer with compressed H2 storage at Vindhyachal, India's first utility-scale green hydrogen storage demonstration.",
    source: "NTPC",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Policy",
  "Tariff",
  "Tender",
  "Technology",
  "Market Update",
];
const SECTORS: Sector[] = ["All Sectors", "BESS", "Solar", "Wind", "Storage"];

export function EnergyFeedPage({ onUpgradeClick: _onUpgradeClick }: Props) {
  const [activeCat, setActiveCat] = useState<Category>("All");
  const [activeSector, setActiveSector] = useState<Sector>("All Sectors");

  const filtered = FEED_ITEMS.filter((item) => {
    const catMatch = activeCat === "All" || item.cat === activeCat;
    const sectorMatch =
      activeSector === "All Sectors" || item.sector === activeSector;
    return catMatch && sectorMatch;
  });

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <Rss size={22} style={{ color: AMBER }} />
            <h1
              className="text-2xl font-bold"
              style={{ color: "oklch(0.97 0.01 237)" }}
            >
              Energy Intelligence Feed
            </h1>
          </div>
          <p className="text-sm" style={{ color: "oklch(0.60 0.04 237)" }}>
            Latest policies, tenders, tariff orders & market updates
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`feed.${cat.toLowerCase().replace(/ /g, "_")}.tab`}
                onClick={() => setActiveCat(cat)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                style={
                  activeCat === cat
                    ? {
                        background: AMBER,
                        color: "oklch(0.13 0.038 237)",
                        fontWeight: 700,
                      }
                    : {
                        background: CARD_BG,
                        border: `1px solid ${BORDER}`,
                        color: "oklch(0.60 0.04 237)",
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {SECTORS.map((sec) => (
              <button
                key={sec}
                type="button"
                data-ocid={`feed.${sec.toLowerCase().replace(/ /g, "_")}.tab`}
                onClick={() => setActiveSector(sec)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                style={
                  activeSector === sec
                    ? {
                        background: "oklch(0.60 0.15 237)",
                        color: "oklch(0.97 0.01 237)",
                        fontWeight: 700,
                      }
                    : {
                        background: CARD_BG,
                        border: `1px solid ${BORDER}`,
                        color: "oklch(0.60 0.04 237)",
                      }
                }
              >
                {sec}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Feed */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div
              className="text-center py-12"
              data-ocid="feed.empty_state"
              style={{ color: "oklch(0.45 0.04 237)" }}
            >
              <p className="text-sm">No items match the selected filters.</p>
            </div>
          )}
          {filtered.map((item, i) => {
            const catC = CAT_COLORS[item.cat] ?? {
              bg: CARD_BG,
              text: "oklch(0.65 0.04 237)",
            };
            const secC = SECTOR_COLORS[item.sector] ?? {
              bg: CARD_BG,
              text: "oklch(0.65 0.04 237)",
            };
            return (
              <motion.div
                key={`${item.date}-${item.title}`}
                data-ocid={`feed.item.${i + 1}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.6) }}
                className="rounded-xl p-4"
                style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap"
                        style={{ background: catC.bg, color: catC.text }}
                      >
                        {item.cat}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                        style={{ background: secC.bg, color: secC.text }}
                      >
                        {item.sector}
                      </span>
                    </div>
                    <h3
                      className="text-sm font-semibold leading-snug mb-1"
                      style={{ color: "oklch(0.90 0.02 237)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed line-clamp-2"
                      style={{ color: "oklch(0.60 0.04 237)" }}
                    >
                      {item.summary}
                    </p>
                    <p
                      className="text-xs mt-2"
                      style={{ color: "oklch(0.45 0.04 237)" }}
                    >
                      Source: {item.source}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span
                      className="text-xs px-2 py-1 rounded-lg font-medium whitespace-nowrap"
                      style={{
                        background: "oklch(0.14 0.040 237)",
                        color: "oklch(0.50 0.04 237)",
                        border: `1px solid ${BORDER}`,
                      }}
                    >
                      {item.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
