export type UIStrings = {
  nav: { home: string; blog: string; about: string };
  skip: { toMain: string };
  header: {
    blog: string;
    peace: string;
    menu: string;
    menuClose: string;
    navAria: string;
  };
  footer: {
    blurb: string;
    explore: string;
    privacy: string;
    googlePlay: string;
    appStore: string;
    allPosts: string;
    legalApp: string;
    rights: string;
  };
  home: {
    seoTitle: string;
    seoDesc: string;
    peace: string;
    heroTitle: string;
    heroBody: string;
    /** Primary hero button (filled) */
    heroCtaPrimary: string;
    getApp: string;
    readBlog: string;
    latest: string;
    latestSub: string;
    viewAll: string;
    why: string;
    f1t: string;
    f1d: string;
    f2t: string;
    f2d: string;
    f3t: string;
    f3d: string;
    f4t: string;
    f4d: string;
    noPosts: string;
    noPostsHint: string;
  };
  blog: {
    seoTitle: string;
    seoDesc: string;
    title: string;
    sub: string;
    pageTitle: string;
    older: string;
    pageOf: string;
    next: string;
    prev: string;
    tagSeo: string;
    tagAll: string;
    tagCount: string;
  };
  blogCard: { readMore: string };
  blogPost: {
    tocTitle: string;
    minRead: string;
  };
  about: {
    seoTitle: string;
    seoDesc: string;
    h1: string;
    p1: string;
    h2: string;
    p2: string;
    p3: string;
  };
  privacy: {
    seoTitle: string;
    seoDesc: string;
    h1: string;
    p1: string;
    cta: string;
    direct: string;
    h2web: string;
    pWeb: string;
    h2contact: string;
    pContact: string;
    back: string;
  };
  newsletter: {
    title: string;
    sub: string;
    email: string;
    placeholder: string;
    btn: string;
    hint: string;
  };
  appBanner: { title: string; body: string };
  theme: { light: string; dark: string; toggle: string };
  notFound: {
    seoTitle: string;
    seoDesc: string;
    title: string;
    body: string;
    home: string;
  };
};

const ui: UIStrings = {
  nav: { home: 'Home', blog: 'Blog', about: 'About' },
  skip: { toMain: 'Skip to main content' },
  header: {
    blog: 'Blog',
    peace: 'Peace of mind',
    menu: 'Open menu',
    menuClose: 'Close menu',
    navAria: 'Primary navigation',
  },
  footer: {
    blurb:
      'Privacy-first organization: lists, journal, routines, and more — on your device.',
    explore: 'Explore',
    privacy: 'Privacy policy',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    allPosts: 'All posts',
    legalApp: 'Legal & app',
    rights: 'All rights reserved.',
  },
  home: {
    seoTitle: 'Organize Your Life, Your Way',
    seoDesc:
      'Unutma Blog — practical guides on productivity, privacy-first apps, journaling, and routines. Download Unutma: offline, private, free.',
    peace: 'Peace of mind, on your phone',
    heroTitle: 'Organize your life, your way',
    heroBody:
      'Offline-first lists, journal, routines, vault, and more — all on your phone. No account required. This blog shares tips that pair perfectly with a calmer digital life.',
    heroCtaPrimary: 'Go to blog',
    getApp: 'Get the app',
    readBlog: 'Read the blog',
    latest: 'Latest articles',
    latestSub:
      'Ideas for productivity, privacy, and habits — updated as we publish.',
    viewAll: 'View all posts',
    why: 'Why Unutma?',
    f1t: 'Offline-first',
    f1d: 'Core features work without a constant internet connection.',
    f2t: 'Private',
    f2d: 'Your notes and lists stay on your device — not on our servers.',
    f3t: 'Free to start',
    f3d: 'Get organized without a subscription wall for the essentials.',
    f4t: 'Multi-language',
    f4d: 'Use the app in the language that fits your day.',
    noPosts: 'No posts yet — add Markdown files under',
    noPostsHint: 'or run the Python generator.',
  },
  blog: {
    seoTitle: 'Blog',
    seoDesc:
      'Articles on productivity, privacy-first tools, journaling, routines, and organization — from the Unutma team.',
    title: 'Blog',
    sub: 'All posts, newest first. Filter by tag from each card.',
    pageTitle: 'Blog — page',
    older: 'Older articles.',
    pageOf: 'Page',
    next: 'Next',
    prev: 'Previous',
    tagSeo: 'Unutma Blog — tag',
    tagAll: '← All posts',
    tagCount: 'article(s)',
  },
  blogCard: { readMore: 'Read more →' },
  blogPost: {
    tocTitle: 'On this page',
    minRead: 'min read',
  },
  about: {
    seoTitle: 'About',
    seoDesc:
      'About Unutma and this blog — privacy-first productivity, offline organization, and practical articles.',
    h1: 'About this blog',
    p1:
      'Unutma Blog publishes helpful, SEO-friendly articles on productivity, journaling, routines, privacy-first tools, and personal organization. The goal is simple: help you build calmer habits — and introduce Unutma when it genuinely fits.',
    h2: 'About Unutma',
    p2:
      'Unutma is a mobile app for lists, journal, password vault, wishlist, finance tracking, routines, and more — with a focus on offline use and keeping your data on your device. No account is required for your content.',
    p3:
      'We are not a cloud-first service; we believe your notes and tasks belong with you. This blog is independent in tone: you should get value even if you never download the app.',
  },
  privacy: {
    seoTitle: 'Privacy Policy',
    seoDesc:
      'Official Unutma privacy policy (Google Sites) — app data practices, your rights, and contact. Plus notes on this marketing website.',
    h1: 'Privacy policy',
    p1:
      'The canonical privacy policy for the Unutma app is maintained on Google Sites and updated there (including all languages). Please read the full text at the link below — it is the binding document for how Unutma handles app-related data.',
    cta: 'Open official Unutma Privacy Policy →',
    direct: 'Direct URL:',
    h2web: 'This website (blog)',
    pWeb:
      'This site is a static marketing blog: your host (for example Vercel) may keep ordinary server or CDN logs. We do not run ads in the Unutma app, and this blog does not show third-party ad banners unless we explicitly enable that later and update this notice.',
    h2contact: 'Contact (app policy)',
    pContact:
      'For questions about the policy published on Google Sites, use the contact channel listed there — for example',
    back: '← Home',
  },
  newsletter: {
    title: 'Stay organized',
    sub: 'Get occasional tips on productivity and privacy-first apps. No spam.',
    email: 'Email',
    placeholder: 'you@example.com',
    btn: 'Coming soon',
    hint: 'We will only email when sign-up opens. No spam.',
  },
  appBanner: {
    title: 'Ready to get organized?',
    body:
      'Unutma keeps your life organized — offline, private, and free. No account needed. Your data stays on your device.',
  },
  theme: { light: 'Light', dark: 'Dark', toggle: 'Theme' },
  notFound: {
    seoTitle: 'Page not found',
    seoDesc: 'The page you are looking for does not exist.',
    title: 'Page not found',
    body: 'That link may be outdated or mistyped.',
    home: 'Back to home',
  },
};

export function t(): UIStrings {
  return ui;
}
