import { routes } from "@/lib/site";

export const siteCopy = {
  brand: "GOAT RIPS",
  promo: {
    lines: [
      "Bonus pack-ins on select drops — while supplies last",
      "Shipping offers shown at checkout",
      "Most orders ship within one business day",
    ] as const,
  },
  hero: {
    line1: "THE GREATEST OF ALL TRADING.",
    line2: "FIND YOUR GRAIL.",
    ctaShop: "Shop packs",
    ctaPacks: "View packs",
  },
  nav: [
    { label: "Shop", href: routes.shop },
    { label: "Packs", href: routes.packs },
    { label: "Blog", href: routes.blog },
    { label: "About", href: routes.about },
  ] as const,
  home: {
    trustStrip: {
      score: "4.9",
      scoreMax: "5",
      stars: 5,
      line: "Collectors rate their experience — authentic product, careful packing, fast answers.",
      sub: "Shop sealed, singles, and slabs with confidence.",
    },
    categoryLanes: {
      sectionTitle: "Shop the lanes",
      sectionSubtitle:
        "Same quick-scan energy as a specialty storefront — tap a lane and we will drop you in the catalog.",
      viewAllLabel: "View all",
      tiles: [
        { label: "Slabs", sub: "Graded hits", href: routes.shop, asset: "card" as const },
        { label: "Singles", sub: "Raw chases", href: routes.shop, asset: "goat" as const },
        { label: "Packs", sub: "Boosters", href: routes.packs, asset: "pack" as const },
        { label: "Sealed", sub: "Blisters & more", href: routes.shop, asset: "ripped" as const },
        { label: "New", sub: "Fresh drops", href: routes.shop, asset: "logo" as const },
      ],
    },
    productRail: {
      titleLive: "Trending picks",
      titleMocks: "Explore new arrivals",
      subtitleLive: "A taste of what is live in the shop right now.",
      subtitleMocks:
        "Sealed packs, blisters, and the pulls everyone talks about — sample look below.",
      cta: "View all products",
      emptyHint: "Connect Shopify to show live inventory here.",
      mockRibbon: "Featured Pokémon (sample)",
      mockCaption:
        "Placeholder TCG photography for layout. Replace files in public/cards/ or edit src/lib/mockCards.ts.",
      mockCtaPrimary: "Shop packs",
      mockCtaSecondary: "Pack drops",
    },
    valueTitle: "Why rip with us",
    valueLead:
      "Sealed product, transparent odds, and a community that lives for the chase. Every pack is a shot at your next grail.",
    valuePoints: [
      {
        title: "Authentic product",
        body: "Sourced from trusted distributors. We stand behind every seal.",
      },
      {
        title: "The unboxing rush",
        body: "From first tear to last card — we build the experience around the moment.",
      },
      {
        title: "For collectors",
        body: "Sports, Pokémon, and the hits you actually want to chase.",
      },
    ],
    ctaBandTitle: "Ready to rip?",
    ctaBandBody: "Browse the shop or learn how we curate our drops.",
    faqTitle: "FAQ",
    faqIntro:
      "Answers to common questions about orders, shipping, and how we work. Still stuck? Email us — we are happy to help.",
    faq: [
      {
        q: "What is GOAT RIPS?",
        a: "We are a collectible trading card shop focused on sealed product, singles, and the rip experience — built for collectors who want real product and straight talk.",
      },
      {
        q: "How do I place an order?",
        a: "Browse the shop, add items to your cart, and check out securely through Shopify. You will get confirmation and tracking when your order ships.",
      },
      {
        q: "Do you ship internationally?",
        a: "Shipping zones and rates depend on how we configure fulfillment in Shopify. You will see options and pricing at checkout before you pay.",
      },
      {
        q: "Are customs or import fees included?",
        a: "International customers may owe duties, taxes, or brokerage fees charged by their country. Those are set by customs — not by us — and are the buyer's responsibility.",
      },
      {
        q: "How can I contact you?",
        a: "Use the email in the footer for support questions, order issues, or inventory requests. We aim to reply on business days.",
      },
    ] as const,
  },
  footer: {
    tagline: "The greatest of all trading.",
    rights: "All rights reserved.",
    payRow:
      "Visa · Mastercard · American Express · Shop Pay · PayPal — checkout secured by Shopify.",
    trustBadges: [
      {
        title: "Secure checkout",
        body: "Payments are processed through Shopify with industry-standard encryption.",
      },
      {
        title: "Tracked shipping",
        body: "Orders ship with tracking so you can follow every pack to your door.",
      },
      {
        title: "Collector-first support",
        body: "Questions before you buy? Reach out — we actually collect too.",
      },
    ] as const,
  },
  shop: {
    title: "Shop",
    emptyTitle: "Store coming online",
    emptyBody:
      "Connect your Shopify store via environment variables to show products here.",
  },
  cart: {
    title: "Cart",
    empty: "Your cart is empty.",
    checkout: "Checkout",
    continue: "Continue shopping",
  },
} as const;
