// Sourced from a manual Arc DEX Screener Top-100 research pass (snapshot 2026-09-17).
// Only projects with verified or credible standalone product evidence are included —
// meme/ecosystem-branding-only entries from that research were left out. evidence:
// 'high' = concrete product details verified on the official site/docs, 'medium' =
// direction verified but implementation depth not fully established.
const BUILDERS = [
  {
    id: "arcash", name: "ARCASH", category: "Gamified DeFi / Community / Yield simulator", bucket: "DeFi",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://arcash.tech/",
    building: ["Onchain city simulator", "Wallet-linked banks", "Treasury payout system", "Vault / claim mechanics", "Bank tiers"],
    notes: "Official site displayed live bank/payout statistics."
  },
  {
    id: "arc-index-10", name: "Arc Index 10", category: "Index / Reward mechanism", bucket: "DeFi",
    stage: "Live / Early", stageGroup: "live", evidence: "high",
    website: "https://thearcindex.com/",
    building: ["Trade-fee-funded purchases of top Arc tokens", "Automatic holder distributions", "Periodic rebalancing"],
    notes: "Official site describes the mechanism; dashboard appeared early-stage during crawl."
  },
  {
    id: "arctools", name: "ArcTools", category: "Trading / Analytics / Aggregator / Bots", bucket: "Trading",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://arctools.fun/",
    building: ["Cross-launchpad terminal", "Aggregated swaps", "Wallet PnL intelligence", "Whale / bridge intelligence", "Telegram sniper and buy bots", "Trending feed", "Portfolio / scanner", "Staking / rewards / referrals"],
    notes: "Official site exposes one of the broadest Arc tool suites in this snapshot."
  },
  {
    id: "arcade", name: "Arcade", category: "DEX / Aggregator / Launchpad / Bridge", bucket: "Trading",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://www.arcade.trading/",
    building: ["USDC-native trading", "Bonding-curve launches", "Atomic migration", "Swap aggregator", "USDC bridge via CCTP", "Locked-LP fee streams"],
    notes: "Official site/docs present a multi-function Arc trading stack."
  },
  {
    id: "arcanium-trade", name: "Arcanium Trade", category: "Launchpad / Trading", bucket: "Launchpad",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://arcanium.trade/",
    building: ["Fixed-supply token launches", "Permanently locked markets", "Uniswap liquidity from block one"],
    notes: "Official materials emphasize locked markets and fixed supply."
  },
  {
    id: "archemist", name: "Archemist", category: "Launchpad / DeFi", bucket: "Launchpad",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://archemist.fun/",
    building: ["Arc launchpad", "Custom Uniswap v4 anti-snipe hook", "Creator fee mechanics", "ARCH buyback mechanics", "X-agent launch flow"],
    notes: "Docs describe locked liquidity and anti-snipe mechanics; older docs may describe prior architecture."
  },
  {
    id: "argos-bot", name: "Argos Bot", category: "Trading bot / Social wallet / Launchpad", bucket: "Trading",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://argosbot.io/",
    building: ["Buy/sell Arc tokens from X, Telegram and web", "Swap", "Send USDC/tokens", "Burn", "Launch via social posts"],
    notes: "Official guides describe social launch and trading flows."
  },
  {
    id: "argus", name: "Argus", category: "Launchpad / DeFi", bucket: "Launchpad",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://argus.world/",
    building: ["Fair-launch token infrastructure", "USDC-priced launches into Uniswap v4", "Creator-tax / reward mechanics", "Swap interface"],
    notes: "Official docs describe launch settings, market activity and holder rewards."
  },
  {
    id: "cra-agent", name: "CRA Agent", category: "AI agent payments / API infrastructure", bucket: "AI & Agents",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://cra-agent.tech/",
    building: ["x402 agent payments on Arc", "Paid API calls in USDC", "Spend policies", "Seller verification", "Receipts", "MCP server", "Future seller bonds / escrow"],
    notes: "Official site says CRA token is not required by the software."
  },
  {
    id: "ellipse", name: "ELLIPSE", category: "RWA / Custodial bridge / Launchpad / Data", bucket: "RWA",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://ellipse.fun/",
    building: ["Custodial bridge for claim assets", "Stock-related paired markets", "Launch", "Swap", "Liquidity", "Market data / points"],
    notes: "Official terms distinguish claim tokens from shares/issuer-backed assets."
  },
  {
    id: "faze", name: "Faze", category: "Launchpad / Trading terminal", bucket: "Launchpad",
    stage: "Beta / Live", stageGroup: "live", evidence: "high",
    website: "https://faze.fun/",
    building: ["v4-native Arc launchpad", "Custom-hook launch mechanics", "Trading terminal", "Wallet PnL / coin analytics", "KOL feed / watchlists", "Creator statistics"],
    notes: "Official site labels Beta and describes configurable launch/fee mechanics."
  },
  {
    id: "kairo", name: "Kairo", category: "Prediction markets", bucket: "Prediction Markets",
    stage: "Beta / Live", stageGroup: "live", evidence: "high",
    website: "https://kairo.market/",
    building: ["Permissionless YES/NO markets", "USDC collateral", "Fixed-product AMM", "Onchain bonded resolution", "Market creation"],
    notes: "Transparency docs disclose beta status, no external audit, and single-key owner."
  },
  {
    id: "long", name: "LONG", category: "RWA / Custodial bridge / Stock-paired launch", bucket: "RWA",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://long.supply/",
    building: ["Custodial bridge of stock-related assets to Arc", "Launch markets quoted against bridged assets"],
    notes: "Project disclaimer says bridged assets are claims on matching assets held in custody, not shares."
  },
  {
    id: "minara", name: "Minara", category: "Launchpad", bucket: "Launchpad",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://minara.fun/",
    building: ["One-transaction token launches", "USDC-native Arc liquidity", "Locked liquidity from creation", "Quote-currency support"],
    notes: "Docs describe fixed supply/no mint and locked liquidity."
  },
  {
    id: "parabolic", name: "Parabolic", category: "Launchpad / Trading / Data", bucket: "Launchpad",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://www.parabolic.family/",
    building: ["USDC token launchpad", "Token discovery board", "Trading", "Analytics / points", "Agent and trader views"],
    notes: "Official site exposes trending/rising/new and holder metrics."
  },
  {
    id: "peach-peach", name: "Peach (PEACH)", category: "Aggregator / Launchpad / Discovery", bucket: "Trading",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: null,
    building: ["Market layer for onchain assets", "Aggregator", "Launchpad", "Discovery and trading", "Bonding-curve launches", "DEX graduation"],
    notes: "Rank #50 PEACH is kept distinct from rank #69 PCH until contract provenance is verified."
  },
  {
    id: "tolly", name: "Tolly", category: "Launchpad / DEX / Trading", bucket: "Launchpad",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://tollylabs.com/",
    building: ["Arc token launchpad", "DEX", "Locked USDC liquidity", "One-transaction launches"],
    notes: "Official site says tokens trade from block one with locked liquidity."
  },
  {
    id: "dotarc", name: "dot / .arc", category: "Identity / Naming infrastructure", bucket: "Identity",
    stage: "Live", stageGroup: "live", evidence: "high",
    website: "https://dotarc.org/",
    building: ["Onchain .arc names", "Readable wallet identity", "Profile records", "Registration / management / trading"],
    notes: "Official materials describe an independent .arc namespace."
  },
  {
    id: "arcenzia", name: "Arcenzia", category: "Self-custody / Payments / Vaults / Agent spending", bucket: "Payments",
    stage: "Early access / Building", stageGroup: "building", evidence: "high",
    website: "https://arcenzia.com/",
    building: ["Self-custodial Arc account", "Private spending", "Cashback-to-vault", "Budget / merchant controls", "AI-agent allowances", "Virtual card", "Shared vaults", "Recovery"],
    notes: "Official site contains early-access/waitlist language; not all modules are treated as generally available."
  },
  {
    id: "arcus-network", name: "Arcus Network", category: "AI agent payments / x402 infrastructure", bucket: "AI & Agents",
    stage: "Public build; status unverified", stageGroup: "building", evidence: "medium",
    website: "https://arcusnetwork.io/",
    building: ["x402 facilitator for Arc", "Agent-economy payment infrastructure"],
    notes: "Direction is public; exact production status was not fully verified."
  },
  {
    id: "radian-ai", name: "Radian AI", category: "AI agent marketplace / API", bucket: "AI & Agents",
    stage: "Early public build", stageGroup: "building", evidence: "medium",
    website: "https://www.radianapp.xyz/",
    building: ["Agent capability registry", "Partner discovery", "Per-task USDC payments"],
    notes: "Direction verified from DEX profile plus official website; implementation depth not independently audited."
  },
  {
    id: "arch-rip", name: "ARCH / arch.rip", category: "DeFi / Markets", bucket: "DeFi",
    stage: "Public profile", stageGroup: "public", evidence: "medium",
    website: "https://arch.rip/",
    building: ["Liquid markets"],
    notes: "Official description is too terse to infer more."
  },
  {
    id: "argus-earn", name: "ARGUS EARN", category: "Reward token / Argus ecosystem", bucket: "DeFi",
    stage: "Tokenomics utility", stageGroup: "public", evidence: "medium",
    website: "https://argenarc.xyz/",
    building: ["ARGUS-denominated holder rewards"],
    notes: "DEX profile says 3% tax is directed to ARGUS rewards."
  },
  {
    id: "ath-family", name: "ATH.Family", category: "RWA / Stock-paired launchpad", bucket: "RWA",
    stage: "Public project", stageGroup: "public", evidence: "medium",
    website: "https://ath.family/",
    building: ["Multichain token launchpad with stock-paired markets"],
    notes: "Stock-pairing description is a project claim."
  },
  {
    id: "enso", name: "Enso", category: "Launchpad", bucket: "Launchpad",
    stage: "Public / Active pair", stageGroup: "public", evidence: "medium",
    website: "https://enso.trade/",
    building: ["Arc meme-token launchpad"],
    notes: "Verified from DEX profile and official-site link."
  },
  {
    id: "creo-family", name: "creo.family", category: "AI launchpad", bucket: "Launchpad",
    stage: "Public; chain scope inconsistent", stageGroup: "public", evidence: "medium",
    website: "https://www.creo.family/",
    building: ["AI-assisted token launchpad"],
    notes: "DEX profile says Arc; other official Creo pages referenced Robinhood Chain, so chain scope is flagged."
  },
  {
    id: "lift", name: "lift.fun", category: "Launchpad", bucket: "Launchpad",
    stage: "Public / Active pair", stageGroup: "public", evidence: "medium",
    website: "https://lift.fun/",
    building: ["Arc-only token launchpad"],
    notes: "DEX profile self-describes as Arc-only."
  },
];
