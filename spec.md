# India Power Policy Hub — Tariff Intelligence + BESS Market Add-On

## Current State
The platform has:
- Dashboard with KPI cards and policy charts
- 7 sector vertical pages (Generation, Transmission, Distribution, Renewable Energy, Regulations & Tariffs, Energy Efficiency, Emerging Tech)
- Search, Compare, Policy Detail Panel
- Lite/Premium subscription gating
- Authorization + user profiles

## Requested Changes (Diff)

### Add
1. **Tariff Intelligence page** — new sidebar nav item (premium)
   - Solar+BESS tariff decline curve 2018–2026 (line chart: ₹6.99 → ₹2.70/kWh, with 2hr/4hr BESS sub-series)
   - Standalone BESS tariff trend (₹4.44L → ₹2.85L → ₹2.08L lakh/MW/month)
   - FDRE tariff range chart (₹5.6 → ₹4.38/kWh, Peak vs RTC vs Load-following)
   - Solar+BESS vs Coal comparison bar (₹4.28 vs ₹6/unit)
   - Tariff by state heatmap (static color-coded grid)
   - Tariff vs Capacity bubble chart (year × tariff × capacity)
   - Key AI insights cards (static pre-written trend explanations, risk analysis)

2. **BESS Market Tracker page** — new sidebar nav item (premium)
   - KPI row: Total tenders GWh, Awarded GWh, Under construction GWh, Cancelled GWh (e.g. 102 GWh tenders in 2025)
   - Tender capacity bar chart by year
   - State leadership in storage (Gujarat, Rajasthan, Maharashtra, UP) — horizontal bar or map-grid
   - Use case split donut: Peak shaving / RE integration / DG replacement
   - Project tracker table: capacity, storage duration, tariff, developer, status
   - Auto-generated insight cards: "Tariffs dropped 60% in 5 years", "Shift from 2hr → 4hr storage", "Standalone BESS gaining traction", "FDRE becoming mainstream"

3. **Storage Technology Radar page** — new sidebar nav item (premium)
   - Technology Radar scatter plot: X=maturity (R&D→Pilot→Commercial→Mature), Y=India adoption (Low→Medium→High)
   - Technologies: Li-ion BESS, Sodium-ion, Flow batteries, Solid-state, Hydrogen, Thermal, Gravity
   - Tech detail cards: maturity level, cost trend, use cases, India status, global status

4. **Energy Intelligence Feed page** — new sidebar nav item (free)
   - Scrollable feed of curated static news/policy/tender updates (20+ items)
   - Tag filters: All / Policy / Tariff / Tender / Technology / Market Update
   - Sub-filters: BESS / Solar / Wind / Storage
   - Each item: date, tag badge, title, summary, source label

5. **Sidebar updates**
   - Add section "Intelligence" with 4 new nav items:
     - Tariff Intelligence (premium)
     - BESS Market (premium)
     - Storage Tech Radar (premium)
     - Energy Feed (free)
   - Extend View type to include new routes

6. **App.tsx routing** — add cases for 4 new views

### Modify
- Sidebar: add new section and nav items
- App.tsx: handle new view routing
- Top bar header text for new views

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/TariffIntelligencePage.tsx` with all 4 charts + insight cards
2. Create `src/frontend/src/pages/BessMarketPage.tsx` with KPIs, charts, project table, insights
3. Create `src/frontend/src/pages/StorageTechRadarPage.tsx` with radar scatter + tech cards
4. Create `src/frontend/src/pages/EnergyFeedPage.tsx` with scrollable tagged feed + filters
5. Update `Sidebar.tsx`: extend View type, add Intelligence section
6. Update `App.tsx`: import and render new pages in routing
7. All chart data is static/curated inline in each page component
8. All charts use Recharts (already installed)
