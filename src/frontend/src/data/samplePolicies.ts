import type { Policy } from "../backend.d";

export const SAMPLE_POLICIES: Policy[] = [
  {
    id: BigInt(1),
    title: "Electricity Act, 2003",
    policyType: "Central Legislation",
    year: BigInt(2003),
    vertical: "Generation",
    level: "Central",
    summary:
      "The Electricity Act 2003 is the principal legislation governing the Indian power sector. It replaced three earlier laws and introduced competition, delicensed generation, and established independent regulatory commissions.",
    keyProvisions: [
      "Delicensing of generation (except hydro projects above specified capacity)",
      "Open access in transmission and distribution",
      "Establishment of Central Electricity Regulatory Commission (CERC)",
      "State Electricity Regulatory Commissions (SERCs) made mandatory",
      "Appellate Tribunal for Electricity (APTEL) created",
      "Franchisee model introduced for distribution",
    ],
    stakeholders: [
      "Ministry of Power",
      "CERC",
      "SERCs",
      "DISCOMs",
      "IPPs",
      "Consumers",
    ],
    industryImpact:
      "Transformed the power sector from a government-controlled monopoly to a competitive market. Enabled private investment in generation and facilitated renewable energy growth.",
    sourceUrl:
      "https://powermin.gov.in/sites/default/files/uploads/THE_ELECTRICITY_ACT_2003.pdf",
    amendments: [
      {
        version: "Amendment 2007",
        date: "2007-06-15",
        description:
          "Introduced trading as a distinct licensed activity and strengthened penalties for power theft.",
      },
      {
        version: "Amendment 2022",
        date: "2022-04-06",
        description:
          "Proposed amendments for smart meters, energy transition, and strengthening of renewable energy commitments.",
      },
    ],
  },
  {
    id: BigInt(2),
    title: "National Electricity Policy, 2005",
    policyType: "National Policy",
    year: BigInt(2005),
    vertical: "Generation",
    level: "Central",
    summary:
      "The National Electricity Policy 2005 sets out the vision for the power sector with objectives of access to electricity for all households, reliability, quality power, and optimal utilisation of resources.",
    keyProvisions: [
      "Access to electricity for all households by 2009",
      "Per capita availability of 1000 units annually by 2012",
      "Reliable power, quality power at reasonable rates",
      "Preference to hydro power projects",
      "Thrust on rural electrification",
    ],
    stakeholders: [
      "Ministry of Power",
      "State Governments",
      "Rural Households",
      "DISCOMs",
    ],
    industryImpact:
      "Provided a comprehensive roadmap that accelerated rural electrification programs and guided investment decisions in generation capacity.",
    sourceUrl:
      "https://powermin.gov.in/sites/default/files/uploads/National_Electricity_Policy.pdf",
    amendments: [],
  },
  {
    id: BigInt(3),
    title: "National Tariff Policy, 2006",
    policyType: "Tariff Policy",
    year: BigInt(2006),
    vertical: "Regulations & Tariffs",
    level: "Central",
    summary:
      "The National Tariff Policy provides a framework for determination of tariff for generation, transmission, and distribution of electricity across India.",
    keyProvisions: [
      "Cost-reflective tariff determination",
      "Multi Year Tariff (MYT) framework",
      "Renewable Purchase Obligation (RPO)",
      "Competitive bidding for procurement",
      "Cross-subsidy reduction roadmap",
    ],
    stakeholders: [
      "CERC",
      "SERCs",
      "Generators",
      "Transmission Companies",
      "DISCOMs",
      "Consumers",
    ],
    industryImpact:
      "Standardised tariff methodology across states, promoting investor confidence and enabling competitive power procurement.",
    sourceUrl:
      "https://powermin.gov.in/sites/default/files/uploads/National_Tariff_Policy.pdf",
    amendments: [
      {
        version: "Amendment 2016",
        date: "2016-01-20",
        description:
          "Strengthened RPO targets, introduced new provisions for solar energy, and revised cross-subsidy norms.",
      },
      {
        version: "Amendment 2021",
        date: "2021-03-22",
        description:
          "Increased focus on renewable energy integration, battery storage, and green tariff options.",
      },
    ],
  },
  {
    id: BigInt(4),
    title:
      "National Solar Mission (Jawaharlal Nehru National Solar Mission), 2010",
    policyType: "National Mission",
    year: BigInt(2010),
    vertical: "Renewable Energy",
    level: "Central",
    summary:
      "The National Solar Mission is a major initiative of the Government of India to promote ecologically sustainable growth while addressing India's energy security challenge. It aims to establish India as a global leader in solar energy.",
    keyProvisions: [
      "Target of 100 GW solar capacity by 2022 (revised from 20 GW)",
      "Grid-connected and off-grid solar promotion",
      "Solar parks and ultra mega solar power projects",
      "Domestic content requirements for certain segments",
      "Viability Gap Funding (VGF) mechanism",
    ],
    stakeholders: [
      "MNRE",
      "SECI",
      "State Governments",
      "Solar Developers",
      "Consumers",
    ],
    industryImpact:
      "Transformed India into a top-5 global solar market, drove down solar tariffs from Rs 17/unit in 2010 to below Rs 2/unit by 2020.",
    sourceUrl: "https://mnre.gov.in/solar/schemes",
    amendments: [
      {
        version: "Phase I (2010-13)",
        date: "2010-01-11",
        description:
          "Focus on R&D, pilot projects, and establishing manufacturing base.",
      },
      {
        version: "Phase II (2013-17)",
        date: "2013-04-01",
        description:
          "Scale-up of grid-connected solar, solar parks concept introduced.",
      },
      {
        version: "Phase III (2017-22)",
        date: "2017-03-01",
        description:
          "Target revised to 100 GW, emphasis on floating solar and rooftop solar.",
      },
    ],
  },
  {
    id: BigInt(5),
    title: "Wind Power Programme & National Wind Energy Mission",
    policyType: "National Mission",
    year: BigInt(2015),
    vertical: "Renewable Energy",
    level: "Central",
    summary:
      "India's wind energy programme aims to develop 140 GW of wind energy capacity by 2030, making India one of the largest wind energy markets globally.",
    keyProvisions: [
      "Generation Based Incentive (GBI) for wind projects",
      "Repowering policy for old wind turbines",
      "Offshore wind policy framework",
      "Wind-Solar hybrid policy",
      "Competitive bidding for wind energy",
    ],
    stakeholders: [
      "MNRE",
      "SECI",
      "Wind Developers",
      "State Nodal Agencies",
      "Grid Operators",
    ],
    industryImpact:
      "India reached 44 GW of installed wind capacity, becoming the 4th largest wind market. Offshore wind opens new frontier for 30 GW by 2030.",
    sourceUrl: "https://mnre.gov.in/wind/",
    amendments: [
      {
        version: "Repowering Policy 2016",
        date: "2016-08-05",
        description:
          "Framework for replacing old wind turbines with new high-capacity machines.",
      },
      {
        version: "Offshore Wind Policy 2015",
        date: "2015-10-06",
        description:
          "First offshore wind energy policy enabling development in EEZ.",
      },
    ],
  },
  {
    id: BigInt(6),
    title: "National Mission for Enhanced Energy Efficiency (NMEEE)",
    policyType: "National Mission",
    year: BigInt(2008),
    vertical: "Energy Efficiency",
    level: "Central",
    summary:
      "NMEEE is one of the eight missions under the National Action Plan on Climate Change. It aims to strengthen the market for energy efficiency by fostering innovative policies and effective market instruments.",
    keyProvisions: [
      "Perform Achieve and Trade (PAT) scheme for energy-intensive industries",
      "Market Transformation for Energy Efficiency (MTEE)",
      "Energy Efficiency Financing Platform (EEFP)",
      "Framework for Energy Efficient Economic Development (FEEED)",
      "Bureau of Energy Efficiency (BEE) empowered",
    ],
    stakeholders: [
      "Bureau of Energy Efficiency",
      "Ministry of Power",
      "Energy-Intensive Industries",
      "Financial Institutions",
    ],
    industryImpact:
      "PAT scheme achieved savings of 8.67 MTOE in first cycle. Energy Conservation Building Code upgraded. LED bulbs distributed under UJALA scheme.",
    sourceUrl: "https://beeindia.gov.in/schemes/nmeee",
    amendments: [
      {
        version: "PAT Cycle II (2014-15 to 2016-17)",
        date: "2014-04-01",
        description:
          "Extended to 621 DCs across 11 sectors with target saving of 8.869 MTOE.",
      },
      {
        version: "PAT Cycle III (2017-18 to 2019-20)",
        date: "2017-04-01",
        description:
          "Further extended with enhanced targets and new sectors included.",
      },
    ],
  },
  {
    id: BigInt(7),
    title: "Transmission System Planning & Grid Code",
    policyType: "Regulatory Framework",
    year: BigInt(2010),
    vertical: "Transmission",
    level: "Central",
    summary:
      "The Grid Code and transmission planning frameworks govern the operation of India's National Grid, ensuring reliable power evacuation from generators to distribution utilities.",
    keyProvisions: [
      "Grid Standards for stable transmission operation",
      "Central Transmission Utility (CTU) planning responsibilities",
      "HVDC and UHVAC transmission corridors",
      "Inter-regional transmission capacity expansion",
      "Grid frequency standards (49.95-50.05 Hz)",
    ],
    stakeholders: [
      "PGCIL",
      "CERC",
      "Regional Load Despatch Centres",
      "State Transmission Utilities",
    ],
    industryImpact:
      "National Grid synchronisation completed, enabling free flow of power across regions. Transmission capacity expanded to over 1 lakh MW.",
    sourceUrl: "https://cea.nic.in/grid-standard",
    amendments: [
      {
        version: "Grid Code Amendment 2015",
        date: "2015-03-15",
        description:
          "Integration of renewable energy sources into grid operation protocols.",
      },
      {
        version: "Green Energy Corridor 2019",
        date: "2019-07-01",
        description:
          "Special transmission infrastructure for renewable energy evacuation.",
      },
    ],
  },
  {
    id: BigInt(8),
    title: "UDAY Scheme (Ujwal DISCOM Assurance Yojana), 2015",
    policyType: "Financial Restructuring Scheme",
    year: BigInt(2015),
    vertical: "Distribution",
    level: "Central",
    summary:
      "UDAY is a financial and operational turnaround programme for electricity distribution companies (DISCOMs) to reduce the financial burden and improve operational efficiency.",
    keyProvisions: [
      "State governments to take over 75% of DISCOM debt",
      "Reduction in Aggregate Technical & Commercial (AT&C) losses to 15%",
      "Elimination of gap between average cost of supply and revenue",
      "Operational efficiency improvement targets",
      "Smart metering and feeder separation",
    ],
    stakeholders: [
      "Ministry of Power",
      "State Governments",
      "DISCOMs",
      "Banks",
      "Consumers",
    ],
    industryImpact:
      "Reduced DISCOM debt by Rs 2.32 lakh crore. AT&C losses reduced from 22% to 17%. However, long-term financial health remains a concern.",
    sourceUrl: "https://powermin.gov.in/en/content/uday",
    amendments: [
      {
        version: "UDAY 2.0 / RDSS 2021",
        date: "2021-07-22",
        description:
          "Revamped Distribution Sector Scheme (RDSS) replaced UDAY with focus on infrastructure upgradation and prepaid smart meters.",
      },
    ],
  },
  {
    id: BigInt(9),
    title: "National Green Hydrogen Mission, 2023",
    policyType: "National Mission",
    year: BigInt(2023),
    vertical: "Emerging Tech",
    level: "Central",
    summary:
      "India's National Green Hydrogen Mission aims to make India a global hub for production and export of green hydrogen, targeting 5 MMT annual production capacity by 2030.",
    keyProvisions: [
      "5 MMT green hydrogen production by 2030",
      "125 GW associated renewable energy capacity",
      "Strategic Interventions for Green Hydrogen Transition (SIGHT) incentives",
      "Green Hydrogen Hubs in states",
      "Demand creation in fertilizer, refinery, and steel sectors",
    ],
    stakeholders: [
      "MNRE",
      "Ministry of Petroleum",
      "SECI",
      "Industry Players",
      "Electrolyzer Manufacturers",
    ],
    industryImpact:
      "Expected to decarbonize hard-to-abate sectors and create over 600,000 jobs. India positioned as major exporter to Europe and Japan.",
    sourceUrl: "https://mnre.gov.in/green-hydrogen",
    amendments: [],
  },
  {
    id: BigInt(10),
    title:
      "PM-KUSUM Scheme (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan)",
    policyType: "Central Scheme",
    year: BigInt(2019),
    vertical: "Renewable Energy",
    level: "Central",
    summary:
      "PM-KUSUM aims to promote solar energy for agricultural use, providing farmers with financial and water security by solarizing irrigation pumps and creating additional income through solar power generation.",
    keyProvisions: [
      "10 lakh grid-connected solar pumps for farmers",
      "20 lakh standalone solar pumps",
      "Solar power plants on barren/fallow land",
      "Solarization of existing grid-connected pumps",
      "Direct farmer benefit transfer",
    ],
    stakeholders: [
      "MNRE",
      "State Governments",
      "DISCOM",
      "Farmers",
      "Solar Developers",
    ],
    industryImpact:
      "Reduced agricultural diesel consumption, improved 24x7 rural power supply, created additional income for farmers through surplus power sale.",
    sourceUrl: "https://mnre.gov.in/solar/schemes/pm-kusum",
    amendments: [
      {
        version: "Revised Guidelines 2021",
        date: "2021-02-08",
        description:
          "Enhanced target of 30.8 GW by 2022-23, simplified procurement process.",
      },
    ],
  },
  {
    id: BigInt(11),
    title: "Rajasthan Solar Energy Policy, 2019",
    policyType: "State Policy",
    year: BigInt(2019),
    vertical: "Renewable Energy",
    level: "State",
    state: "Rajasthan",
    summary:
      "Rajasthan Solar Energy Policy 2019 aims to harness Rajasthan's solar potential with 30 GW capacity by 2024-25, offering incentives for investors and creating employment.",
    keyProvisions: [
      "30 GW solar capacity target by 2024-25",
      "Single-window clearance for solar projects",
      "Exemption from electricity duty for 7 years",
      "Solar Park development by RRECL",
      "Banking facility for solar power",
    ],
    stakeholders: [
      "Rajasthan Government",
      "RRECL",
      "RERC",
      "Solar Developers",
      "Land Owners",
    ],
    industryImpact:
      "Rajasthan became India's largest solar state with over 15 GW capacity, attracting major investments from domestic and international developers.",
    sourceUrl: "https://energy.rajasthan.gov.in/solar-policy",
    amendments: [],
  },
  {
    id: BigInt(12),
    title: "Energy Conservation Building Code (ECBC), 2017",
    policyType: "Building Code",
    year: BigInt(2017),
    vertical: "Energy Efficiency",
    level: "Central",
    summary:
      "ECBC 2017 prescribes energy performance standards for new commercial buildings with connected load of 100 kW and above, significantly upgrading requirements from 2007 version.",
    keyProvisions: [
      "Compliance path: Prescriptive or Whole Building Performance",
      "ECBC Compliant, ECBC+, and Super ECBC categories",
      "30-40% energy savings vs conventional buildings",
      "Mandatory for new commercial constructions",
      "Mandatory for data centres and hospitals",
    ],
    stakeholders: [
      "Bureau of Energy Efficiency",
      "Urban Local Bodies",
      "Architects",
      "Building Owners",
      "Real Estate Developers",
    ],
    industryImpact:
      "If fully implemented, can save 300 billion units of electricity annually by 2030, equivalent to 30 large power plants.",
    sourceUrl: "https://beeindia.gov.in/ecbc",
    amendments: [
      {
        version: "ECBC 2022 Residential",
        date: "2022-03-28",
        description:
          "First ever residential building code extended ECBC principles to homes.",
      },
    ],
  },
  {
    id: BigInt(13),
    title: "Battery Energy Storage Systems (BESS) Policy Framework, 2022",
    policyType: "Policy Framework",
    year: BigInt(2022),
    vertical: "Emerging Tech",
    level: "Central",
    summary:
      "India's BESS framework aims to achieve 51.5 GWh of grid-scale battery storage by 2030 through a viability gap funding mechanism to make battery storage economically viable.",
    keyProvisions: [
      "51.5 GWh BESS by 2030 target",
      "Viability Gap Funding up to 40% of project cost",
      "Must-run status for BESS during peak hours",
      "SECI/NTPC as nodal agencies for procurement",
      "Waiver of inter-state transmission charges",
    ],
    stakeholders: [
      "MNRE",
      "Ministry of Power",
      "SECI",
      "NTPC",
      "Battery Manufacturers",
      "Grid Operators",
    ],
    industryImpact:
      "Critical enabler for 500 GW renewable energy target by 2030. Supports grid stability and enables round-the-clock renewable power.",
    sourceUrl: "https://mnre.gov.in/storage",
    amendments: [],
  },
  {
    id: BigInt(14),
    title: "EV Charging Infrastructure Guidelines, 2022",
    policyType: "Guidelines",
    year: BigInt(2022),
    vertical: "Emerging Tech",
    level: "Central",
    summary:
      "Guidelines for development of EV charging infrastructure to ensure interoperability, safety, and widespread availability of charging stations across India.",
    keyProvisions: [
      "Interoperability standards for chargers",
      "Public charging stations every 25 km on highways",
      "Charging stations in all cities with population above 4 lakh",
      "No separate license required for EV charging",
      "DISCOM to provide connections within 7 days",
    ],
    stakeholders: [
      "Ministry of Power",
      "BEE",
      "DISCOMs",
      "EV OEMs",
      "Charging Network Operators",
      "Consumers",
    ],
    industryImpact:
      "Accelerated EV adoption by addressing range anxiety. India's EV charging network expanded from 1,640 stations in 2020 to over 12,000 by 2023.",
    sourceUrl: "https://powermin.gov.in/ev-charging",
    amendments: [
      {
        version: "Revised Guidelines 2023",
        date: "2023-01-15",
        description:
          "Updated to include DC fast charger standards and battery swapping stations.",
      },
    ],
  },
  {
    id: BigInt(15),
    title: "RDSS - Revamped Distribution Sector Scheme, 2021",
    policyType: "Central Scheme",
    year: BigInt(2021),
    vertical: "Distribution",
    level: "Central",
    summary:
      "RDSS aims to improve the operational and financial health of DISCOMs by providing conditional financial assistance for infrastructure upgradation and smart metering.",
    keyProvisions: [
      "Rs 3,03,758 crore over 5 years",
      "Prepaid smart meters for all consumers",
      "Upgradation of distribution infrastructure",
      "AT&C loss reduction to 12-15% by 2024-25",
      "ACS-ARR gap elimination",
      "Result-linked financial assistance",
    ],
    stakeholders: [
      "Ministry of Power",
      "State Governments",
      "DISCOMs",
      "Smart Meter Manufacturers",
      "Consumers",
    ],
    industryImpact:
      "Major step towards 24x7 power supply. Smart metering reduces theft and improves billing efficiency, potentially saving DISCOMs Rs 70,000 crore annually.",
    sourceUrl: "https://powermin.gov.in/rdss",
    amendments: [],
  },
];
