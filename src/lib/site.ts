// Central place to edit your personal content. Change these and the site updates.

export const site = {
  name: "Muzammil",
  role: "Software Engineer",
  location: "India",
  email: "you@example.com",
  resume: "/resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/mdmuzammil911/",
    github: "https://github.com/",
    instagram: "https://www.instagram.com/",
  },
  timeZone: "Asia/Kolkata",
};

export const services = [
  {
    n: "01",
    title: "Product engineering",
    body: "I take ideas from a blank page to production. I care about the data model, the API and the last 10% of the UI, and about whether anyone uses the result.",
    tags: "Next.js · React · TypeScript",
  },
  {
    n: "02",
    title: "Mobile apps",
    body: "React Native and Expo apps from first screen to store, with the push and release pipeline that keeps them alive.",
    tags: "React Native · Expo · Firebase",
  },
  {
    n: "03",
    title: "Backend & systems",
    body: "Spring Boot and Node services, event-driven pipelines and data models that won't need rewriting in six months.",
    tags: "Spring Boot · Node · MySQL",
  },
  {
    n: "04",
    title: "Agentic AI & automation",
    body: "Agents and automations that plan, call tools and hand off to humans — designed to be measured, observed and trusted inside a real product.",
    tags: "MCP · LLM tooling · Automation",
    focus: true,
  },
];

export const ventures = [
  {
    slug: "yalla-hajji",
    logo: "Y",
    icon: "/work/yalla-hajji/icon.webp",
    title: "Yalla Hajji",
    platforms: "Web · iOS · Android",
    role: "Co-founder",
    kind: "app" as const,
    screens: [
      "/work/yalla-hajji/screen-1.webp",
      "/work/yalla-hajji/screen-2.webp",
      "/work/yalla-hajji/screen-3.webp",
    ],
    body: "The trusted marketplace for Umrah and Hajj — on the web, iOS and Android.",
    links: [
      { label: "yallahajji.com", href: "https://www.yallahajji.com/", icon: "globe" as const },
      { label: "App Store", href: "https://apps.apple.com/us/app/yalla-hajji/id6774168924", icon: "apple" as const },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.yallahajji.app", icon: "play" as const },
    ],
    caseStudy: {
      n: "01",
      type: "Co-founder · Venture",
      year: "2026",
      roleLong: "Co-founder — product, design & engineering",
      for: "Own venture",
      intro:
        "A marketplace that connects pilgrims with verified travel agencies and Saudi-based field agents, plus a companion app for the journey itself — packages, du'as, step-by-step guides and a private group locator.",
      problem:
        "Planning Umrah or Hajj means trusting agencies you can't easily verify and juggling quotes over WhatsApp. Once you land, it means keeping a family group together in one of the most crowded places on earth.",
      built: [
        "Web marketplace with curated packages from vetted agencies, guided ziyarat experiences and free quotes within 24 hours.",
        "Agency workspace: tiered package pricing, lead management, job dispatch to on-the-ground field agents and conversion analytics.",
        "Pilgrim app on iOS and Android with a Duas Hub — Arabic, transliteration, translation and audio, organised by journey stage and available offline.",
        "Find My People: opt-in real-time group location with quiet hours, SOS alerts and location data purged when the group ends.",
        "A pilgrim toolkit — Qibla compass, INR ↔ SAR converter, packing checklist, Smart Wallet savings goals and a tasbih counter.",
        "Phone sign-in with Face ID / fingerprint, and push alerts for enquiries, trip confirmations and SOS.",
      ],
      outcome: [
        "Live on the App Store, Google Play and the web.",
        "Nine iOS releases shipped between June and August 2026.",
        "Free listing for agencies — the platform earns commission only when agencies do.",
      ],
      stack: ["Next.js", "React Native", "Expo", "Express.js", "Hostinger VPS", "Cloudflare"],
    },
  },
  {
    slug: "labbyk",
    logo: "L",
    icon: "/work/labbyk/icon.webp",
    title: "Labbyk",
    platforms: "Web",
    role: "Co-founder",
    kind: "web" as const,
    site: "/work/labbyk/site.webp",
    body: "Websites for Umrah & Hajj agencies — online in minutes, not months.",
    links: [{ label: "labbyk.in", href: "https://labbyk.in/", icon: "globe" as const }],
    caseStudy: {
      n: "02",
      type: "Co-founder · Venture",
      year: "2026",
      roleLong: "Founder",
      for: "Hanigo Tech Pvt Ltd",
      intro:
        "A website builder made for Umrah and Hajj travel agencies: pick a design, add a logo, colours and a WhatsApp number, and publish a premium site with packages, enquiries and bookings built in.",
      problem:
        "Most small agencies run on a Facebook page, a WhatsApp number and paper flyers. A developer-built site takes weeks and ₹40,000+, and DIY builders need ongoing work they don't have time for.",
      built: [
        "Ready-made designs with package pages, WhatsApp \"Inquire now\" buttons and email alerts.",
        "AI flyer and PDF upload that turns an agency's existing flyers into structured packages.",
        "Bookings paid online (UPI or card) or in cash, plus a lead CRM with an enquiry pipeline.",
        "Flyer Studio and an AI Designer for posters, with one-click Facebook / Instagram ads that land on WhatsApp.",
        "Sites in 8 languages including Arabic and Urdu, with SEO basics, SSL, hosting and custom domains included.",
      ],
      outcome: [
        "Agencies take their offline business online in a few minutes — no developer, no waiting.",
        "Live with a 14-day free trial and plans from ₹599/month.",
      ],
      stack: ["Next.js", "Express.js", "Hostinger VPS", "Cloudflare", "LLM tooling"],
    },
  },
  {
    slug: "hanigo",
    logo: "H",
    icon: "/work/hanigo/icon.webp",
    title: "HaniGo",
    platforms: "Web · iOS · Android",
    role: "Co-founder",
    kind: "app" as const,
    screens: [
      "/work/hanigo/screen-1.webp",
      "/work/hanigo/screen-2.webp",
      "/work/hanigo/screen-3.webp",
    ],
    body: "Food and groceries from your neighbourhood — delivered, with zero platform fee.",
    links: [
      { label: "hanigo.in", href: "https://hanigo.in/", icon: "globe" as const },
      { label: "App Store", href: "https://apps.apple.com/in/app/hanigo-food-groceries/id6782350450", icon: "apple" as const },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.hanigo", icon: "play" as const },
    ],
    caseStudy: {
      n: "03",
      type: "Co-founder · Venture",
      year: "2026",
      roleLong: "Co-founder — product & engineering",
      for: "Hanigo Tech Pvt Ltd",
      intro:
        "A hyperlocal delivery app built for smaller towns: local restaurants and fresh groceries in one app, with live order tracking, secure UPI and card payments, and no platform or packaging fee — plus tools for restaurants, stores and delivery partners.",
      problem:
        "The big delivery apps skip smaller towns. Local restaurants and stores there have customers, but no ordering, payments or delivery infrastructure of their own.",
      built: [
        "Customer app with separate Food and Groceries baskets: browse by craving, filter by rating and delivery speed, and see the nearest shops first.",
        "Live order tracking from kitchen or store to doorstep, with a push notification at every stage.",
        "Honest checkout: every charge listed under Bill Details before paying, ₹0 platform and packaging fee, UPI and cards via Cashfree.",
        "Partner tools for restaurants and stores: scan a printed menu to build the online menu, manage orders in real time and run their own offers.",
        "Delivery partners pick their shifts and zone, get clear pickup and drop details, and track earnings in a dashboard.",
      ],
      outcome: [
        "Live on the App Store, Google Play and at hanigo.in.",
        "Hani's Cafe — an in-house kitchen exclusive to HaniGo — coming soon.",
      ],
      stack: ["React Native", "Expo", "Next.js", "Express.js", "Hostinger VPS", "Cloudflare"],
    },
  },
  {
    slug: "makemyapp",
    logo: "M",
    icon: "/work/makemyapp/icon.webp",
    title: "makemyapp",
    platforms: "Web",
    role: "Co-founder",
    kind: "web" as const,
    site: "/work/makemyapp/site.webp",
    body: "From idea to app store — an app design, development & publishing studio.",
    links: [{ label: "makemyapp.co.in", href: "https://www.makemyapp.co.in/", icon: "globe" as const }],
    caseStudy: {
      n: "04",
      type: "Co-founder · Venture",
      year: "2026",
      roleLong: "Co-founder",
      for: "Own venture",
      intro:
        "A studio that takes founders' apps through design, development, testing and store publishing — React Native and Expo by default, native modules when needed, fixed itemised quotes and full IP handover.",
      problem:
        "Founders lose weeks to store paperwork and review rejections, and too many agencies keep the code hostage after launch.",
      built: [
        "30-minute discovery call → scoped roadmap, timeline and a fixed, itemised quote.",
        "Figma designs that follow Apple's and Google's guidelines.",
        "One TypeScript codebase in React Native + Expo, with Swift / Kotlin modules when a feature needs native.",
        "Backend on AWS, GCP, Firebase or Supabase; QA on real devices; store submission and ASO handled end to end.",
        "Weekly sprint demos, with builds on TestFlight and Play internal testing.",
      ],
      outcome: ["Code, repository and IP transfer to the client — no lock-in."],
      stack: ["React Native", "Expo", "TypeScript", "Next.js", "Vercel"],
    },
  },
];

export const timeline = [
  {
    logo: "E",
    company: "Emids Technologies",
    current: true,
    meta: "Dec 2025 — Present · Bengaluru",
    roles: [
      {
        title: "Senior Consultant",
        period: "Dec 2025 — Present",
        body: "Building full-stack AI products — an expense tracker with an embedded chat assistant, RAG pipelines on the OpenAI API and Pinecone, and multi-agent orchestration that plans tasks and hands off to humans.",
      },
    ],
  },
  {
    logo: "K",
    company: "KPMG (KDN AI)",
    meta: "Jun 2025 — Oct 2025 · Bengaluru",
    roles: [
      {
        title: "AI Full-Stack Developer",
        period: "Jun 2025 — Oct 2025",
        body: "Built a chat-driven knowledge-graph interface with the Vercel AI SDK, React, Redux-Saga and TypeScript, backed by Node.js APIs, Azure Functions and a full RAG architecture deployed on Azure.",
      },
    ],
  },
  {
    logo: "Y",
    company: "Yalla Hajji",
    meta: "Mar 2024 — Jun 2025 · Remote",
    roles: [
      {
        title: "Founding Engineer & Sr. Developer",
        period: "Mar 2024 — Jun 2025",
        body: "Built the SaaS marketplace from scratch and shipped it across web, iOS and Android — a scalable multi-tenant Node.js backend, React/TypeScript dashboards and React Native + Expo mobile apps.",
      },
    ],
  },
  {
    logo: "L",
    company: "Lemnisk",
    meta: "Dec 2020 — Mar 2024 · Bengaluru",
    promo: "↑ 1 promotion",
    roles: [
      {
        title: "Senior Software Developer",
        period: "Jul 2021 — Mar 2024",
        body: "Owned the Customer Data Platform UI in React.js, Redux-Saga and TypeScript, and built Node.js onboarding automation on AWS (S3, Lambda, API Gateway).",
      },
      { title: "Software Developer", period: "Dec 2020 — Jun 2021" },
    ],
  },
];

export const stack = [
  { tag: "where users feel it", title: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Web Workers"] },
  { tag: "in their pocket", title: "Mobile", items: ["React Native", "Expo", "Firebase", "Push notifications"] },
  { tag: "the quiet part", title: "Backend", items: ["Node.js", "Express", "Spring Boot", "REST APIs"] },
  { tag: "the source of truth", title: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { tag: "the new frontier", title: "AI", items: ["Agentic workflows", "Model Context Protocol", "LLM evaluation"] },
  { tag: "did it work?", title: "Product & growth", items: ["Mixpanel", "Analytics", "A/B testing", "SEO"] },
];

export const testimonials = [
  {
    pull: "…delivered quickly and with great attention to detail.",
    quote:
      "Replace this with a real recommendation. Describe how they helped the team, the quality of their work and what made them stand out.",
    avatar: "JD",
    name: "Jane Doe",
    title: "Engineering Manager · Company One",
  },
  {
    pull: "…a calm, supportive leader and a strong engineer.",
    quote:
      "Another testimonial goes here. Keep it authentic — pull quotes from LinkedIn recommendations work well.",
    avatar: "JS",
    name: "John Smith",
    title: "SDE · Company Two",
  },
  {
    pull: "…always ready to take on the hardest problem.",
    quote: "A third testimonial. Mention a specific project or trait so it feels concrete.",
    avatar: "AK",
    name: "Alex Kim",
    title: "Product Manager · Company Two",
  },
];

export const stats = [
  { count: 5, suffix: "", label: "yrs shipping" },
  { count: 12, suffix: "", label: "projects owned end-to-end" },
  { count: 3, suffix: "×", label: "awards" },
  { count: 2, suffix: "", label: "products founded" },
];
