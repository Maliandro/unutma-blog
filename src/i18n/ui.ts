import type { Locale } from './locales';

export type UIStrings = {
  nav: { home: string; blog: string; about: string };
  header: { blog: string; peace: string };
  footer: {
    blurb: string;
    privacy: string;
    googlePlay: string;
    appStore: string;
    rights: string;
  };
  home: {
    seoTitle: string;
    seoDesc: string;
    peace: string;
    heroTitle: string;
    heroBody: string;
    readBlog: string;
    latest: string;
    latestSub: string;
    viewAll: string;
    why: string;
    f1t: string; f1d: string;
    f2t: string; f2d: string;
    f3t: string; f3d: string;
    f4t: string; f4d: string;
    noPosts: string;
    noPostsHint: string;
  };
  blog: {
    seoTitle: string;
    seoDesc: string;
    title: string;
    sub: string;
    enNote: string;
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
  about: { seoTitle: string; seoDesc: string; h1: string; p1: string; h2: string; p2: string; p3: string };
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
  lang: { label: string };
  notFound: { seoTitle: string; seoDesc: string; title: string; body: string; home: string };
};

export const ui: Record<Locale, UIStrings> = {
  en: {
    nav: { home: 'Home', blog: 'Blog', about: 'About' },
    header: { blog: 'Blog', peace: 'Peace of mind' },
    footer: {
      blurb: 'Privacy-first organization: lists, journal, routines, and more — on your device.',
      privacy: 'Privacy policy',
      googlePlay: 'Google Play',
      appStore: 'App Store',
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
      readBlog: 'Read the blog',
      latest: 'Latest articles',
      latestSub: 'Ideas for productivity, privacy, and habits — updated as we publish.',
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
      enNote: '',
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
    about: {
      seoTitle: 'About',
      seoDesc:
        'About Unutma and this blog — privacy-first productivity, offline organization, and practical articles.',
      h1: 'About this blog',
      p1: 'Unutma Blog publishes helpful, SEO-friendly articles on productivity, journaling, routines, privacy-first tools, and personal organization. The goal is simple: help you build calmer habits — and introduce Unutma when it genuinely fits.',
      h2: 'About Unutma',
      p2: 'Unutma is a mobile app for lists, journal, password vault, wishlist, finance tracking, routines, and more — with a focus on offline use and keeping your data on your device. No account is required for your content.',
      p3: 'We are not a cloud-first service; we believe your notes and tasks belong with you. This blog is independent in tone: you should get value even if you never download the app.',
    },
    privacy: {
      seoTitle: 'Privacy Policy',
      seoDesc:
        'Official Unutma privacy policy (Google Sites) — app data practices, your rights, and contact. Plus notes on this marketing website.',
      h1: 'Privacy policy',
      p1: 'The canonical privacy policy for the Unutma app is maintained on Google Sites and updated there (including all languages). Please read the full text at the link below — it is the binding document for how Unutma handles app-related data.',
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
      hint: 'Connect your email provider in NewsletterForm.astro when ready.',
    },
    appBanner: {
      title: 'Ready to get organized?',
      body: 'Unutma keeps your life organized — offline, private, and free. No account needed. Your data stays on your device.',
    },
    theme: { light: 'Light', dark: 'Dark', toggle: 'Theme' },
    lang: { label: 'Language' },
    notFound: {
      seoTitle: 'Page not found',
      seoDesc: 'The page you are looking for does not exist.',
      title: 'Page not found',
      body: 'That link may be outdated or mistyped.',
      home: 'Back to home',
    },
  },
  de: {
    nav: { home: 'Start', blog: 'Blog', about: 'Über uns' },
    header: { blog: 'Blog', peace: 'Ruhe im Kopf' },
    footer: {
      blurb: 'Organisation mit Fokus auf Privatsphäre: Listen, Tagebuch, Routinen und mehr — auf deinem Gerät.',
      privacy: 'Datenschutz',
      googlePlay: 'Google Play',
      appStore: 'App Store',
      rights: 'Alle Rechte vorbehalten.',
    },
    home: {
      seoTitle: 'Organisiere dein Leben, auf deine Art',
      seoDesc:
        'Unutma Blog — praktische Tipps zu Produktivität, datenschutzfreundlichen Apps, Journaling und Routinen. Unutma: offline, privat, kostenlos starten.',
      peace: 'Ruhe im Kopf, auf dem Smartphone',
      heroTitle: 'Organisiere dein Leben, auf deine Art',
      heroBody:
        'Offline-Listen, Tagebuch, Routinen, Tresor und mehr — alles auf dem Handy. Kein Konto nötig. Dieser Blog hilft dir zu einem ruhigeren digitalen Alltag.',
      readBlog: 'Zum Blog',
      latest: 'Neueste Artikel',
      latestSub: 'Ideen zu Produktivität, Datenschutz und Gewohnheiten — laufend ergänzt.',
      viewAll: 'Alle Beiträge',
      why: 'Warum Unutma?',
      f1t: 'Offline zuerst',
      f1d: 'Kernfunktionen funktionieren ohne ständige Internetverbindung.',
      f2t: 'Privat',
      f2d: 'Deine Notizen und Listen bleiben auf deinem Gerät — nicht auf unseren Servern.',
      f3t: 'Kostenlos starten',
      f3d: 'Organisation ohne Paywall für das Wesentliche.',
      f4t: 'Mehrsprachig',
      f4d: 'Nutze die App in der Sprache, die zu dir passt.',
      noPosts: 'Noch keine Beiträge — Markdown-Dateien hinzufügen unter',
      noPostsHint: 'oder den Python-Generator ausführen.',
    },
    blog: {
      seoTitle: 'Blog',
      seoDesc:
        'Artikel zu Produktivität, datenschutzfreundlichen Tools, Journaling, Routinen und Organisation — vom Unutma-Team.',
      title: 'Blog',
      sub: 'Alle Beiträge, neueste zuerst. Über die Karten nach Stichwort filtern.',
      enNote: 'Artikel sind auf Englisch; die App ist mehrsprachig.',
      pageTitle: 'Blog — Seite',
      older: 'Ältere Artikel.',
      pageOf: 'Seite',
      next: 'Weiter',
      prev: 'Zurück',
      tagSeo: 'Unutma Blog — Tag',
      tagAll: '← Alle Beiträge',
      tagCount: 'Artikel',
    },
    blogCard: { readMore: 'Weiterlesen →' },
    about: {
      seoTitle: 'Über uns',
      seoDesc: 'Über Unutma und diesen Blog — produktiv und privat, offline organisiert.',
      h1: 'Über diesen Blog',
      p1: 'Der Unutma Blog veröffentlicht hilfreiche Artikel zu Produktivität, Journaling, Routinen, datenschutzfreundlichen Tools und Organisation. Ziel: ruhigere Gewohnheiten — und Unutma nur dort vorstellen, wo es passt.',
      h2: 'Über Unutma',
      p2: 'Unutma ist eine App für Listen, Tagebuch, Passwort-Tresor, Wunschliste, Finanzen, Routinen und mehr — mit Fokus auf Offline und Daten auf deinem Gerät. Für deine Inhalte ist kein Konto nötig.',
      p3: 'Wir sind kein reiner Cloud-Dienst; deine Aufgaben und Notizen gehören dir. Der Blog steht für sich: Nutzen auch ohne App-Download.',
    },
    privacy: {
      seoTitle: 'Datenschutz',
      seoDesc: 'Offizielle Unutma-Datenschutzerklärung (Google Sites) und Hinweise zu dieser Website.',
      h1: 'Datenschutz',
      p1: 'Die verbindliche Datenschutzerklärung für die Unutma-App wird auf Google Sites gepflegt (mehrsprachig). Bitte den vollständigen Text über den Link unten lesen.',
      cta: 'Offizielle Datenschutzerklärung öffnen →',
      direct: 'Direktlink:',
      h2web: 'Diese Website (Blog)',
      pWeb:
        'Statische Marketing-Seite: dein Hoster (z. B. Vercel) kann übliche Server- oder CDN-Logs speichern. In der Unutma-App schalten wir keine Werbung; dieser Blog zeigt nur dann Drittanbieter-Werbung, wenn wir das aktivieren und diesen Hinweis anpassen.',
      h2contact: 'Kontakt (App-Richtlinie)',
      pContact:
        'Fragen zur auf Google Sites veröffentlichten Richtlinie bitte über die dort angegebenen Kanäle — z. B.',
      back: '← Start',
    },
    newsletter: {
      title: 'Bleib organisiert',
      sub: 'Gelegentlich Tipps zu Produktivität und datenschutzfreundlichen Apps. Kein Spam.',
      email: 'E-Mail',
      placeholder: 'du@beispiel.de',
      btn: 'Demnächst',
      hint: 'E-Mail-Anbieter in NewsletterForm.astro verbinden, wenn bereit.',
    },
    appBanner: {
      title: 'Bereit für mehr Ordnung?',
      body: 'Unutma hält dein Leben organisiert — offline, privat und kostenlos starten. Kein Konto nötig. Daten bleiben auf deinem Gerät.',
    },
    theme: { light: 'Hell', dark: 'Dunkel', toggle: 'Darstellung' },
    lang: { label: 'Sprache' },
    notFound: {
      seoTitle: 'Seite nicht gefunden',
      seoDesc: 'Die Seite existiert nicht.',
      title: 'Seite nicht gefunden',
      body: 'Der Link ist veraltet oder falsch geschrieben.',
      home: 'Zur Startseite',
    },
  },
  es: {
    nav: { home: 'Inicio', blog: 'Blog', about: 'Acerca de' },
    header: { blog: 'Blog', peace: 'Tranquilidad mental' },
    footer: {
      blurb: 'Organización con privacidad: listas, diario, rutinas y más — en tu dispositivo.',
      privacy: 'Privacidad',
      googlePlay: 'Google Play',
      appStore: 'App Store',
      rights: 'Todos los derechos reservados.',
    },
    home: {
      seoTitle: 'Organiza tu vida, a tu manera',
      seoDesc:
        'Blog Unutma — guías sobre productividad, apps que respetan la privacidad, diario y rutinas. Descarga Unutma: sin conexión, privada, gratis para empezar.',
      peace: 'Tranquilidad mental, en tu móvil',
      heroTitle: 'Organiza tu vida, a tu manera',
      heroBody:
        'Listas sin conexión, diario, rutinas, caja fuerte y más — todo en el teléfono. Sin cuenta obligatoria. Este blog comparte consejos para una vida digital más calmada.',
      readBlog: 'Ir al blog',
      latest: 'Últimos artículos',
      latestSub: 'Ideas de productividad, privacidad y hábitos — se actualiza con nuevas publicaciones.',
      viewAll: 'Ver todas las entradas',
      why: '¿Por qué Unutma?',
      f1t: 'Sin conexión primero',
      f1d: 'Lo esencial funciona sin internet constante.',
      f2t: 'Privado',
      f2d: 'Tus notas y listas se quedan en tu dispositivo — no en nuestros servidores.',
      f3t: 'Gratis para empezar',
      f3d: 'Organízate sin barreras de suscripción para lo básico.',
      f4t: 'Multilingüe',
      f4d: 'Usa la app en el idioma que prefieras.',
      noPosts: 'Aún no hay entradas — añade Markdown en',
      noPostsHint: 'o ejecuta el generador en Python.',
    },
    blog: {
      seoTitle: 'Blog',
      seoDesc:
        'Artículos sobre productividad, herramientas que respetan la privacidad, diario, rutinas y organización — del equipo Unutma.',
      title: 'Blog',
      sub: 'Todas las entradas, las más nuevas primero. Filtra por etiqueta en cada tarjeta.',
      enNote: 'Los artículos están en inglés; la app es multilingüe.',
      pageTitle: 'Blog — página',
      older: 'Artículos anteriores.',
      pageOf: 'Página',
      next: 'Siguiente',
      prev: 'Anterior',
      tagSeo: 'Blog Unutma — etiqueta',
      tagAll: '← Todas las entradas',
      tagCount: 'artículo(s)',
    },
    blogCard: { readMore: 'Leer más →' },
    about: {
      seoTitle: 'Acerca de',
      seoDesc: 'Sobre Unutma y este blog — productividad con privacidad y artículos prácticos.',
      h1: 'Sobre este blog',
      p1: 'Unutma Blog publica artículos útiles sobre productividad, diario, rutinas, herramientas que respetan la privacidad y organización personal. El objetivo: hábitos más tranquilos — y presentar Unutma cuando encaje de verdad.',
      h2: 'Sobre Unutma',
      p2: 'Unutma es una app móvil para listas, diario, cofre de contraseñas, lista de deseos, finanzas, rutinas y más — pensada para uso sin conexión y con tus datos en tu dispositivo. No necesitas cuenta para tu contenido.',
      p3: 'No somos un servicio solo en la nube; creemos que tus notas y tareas son tuyas. Este blog tiene valor incluso si nunca descargas la app.',
    },
    privacy: {
      seoTitle: 'Privacidad',
      seoDesc: 'Política oficial de privacidad de Unutma (Google Sites) y notas sobre este sitio web.',
      h1: 'Privacidad',
      p1: 'La política de privacidad oficial de la app Unutma se mantiene en Google Sites (incluye varios idiomas). Lee el texto completo en el enlace — es el documento vinculante.',
      cta: 'Abrir política oficial de privacidad →',
      direct: 'URL directa:',
      h2web: 'Este sitio web (blog)',
      pWeb:
        'Sitio estático: tu alojamiento (p. ej. Vercel) puede guardar logs habituales. No mostramos anuncios en la app Unutma; este blog solo mostraría anuncios de terceros si lo activamos y actualizamos este aviso.',
      h2contact: 'Contacto (política de la app)',
      pContact:
        'Para dudas sobre la política publicada en Google Sites, usa el canal indicado allí — por ejemplo',
      back: '← Inicio',
    },
    newsletter: {
      title: 'Mantente organizado',
      sub: 'Consejos ocasionales sobre productividad y apps que respetan la privacidad. Sin spam.',
      email: 'Correo',
      placeholder: 'tu@ejemplo.com',
      btn: 'Próximamente',
      hint: 'Conecta tu proveedor de correo en NewsletterForm.astro cuando esté listo.',
    },
    appBanner: {
      title: '¿Listo para organizarte?',
      body: 'Unutma organiza tu vida — sin conexión, privada y gratis para empezar. Sin cuenta obligatoria. Tus datos se quedan en el dispositivo.',
    },
    theme: { light: 'Claro', dark: 'Oscuro', toggle: 'Tema' },
    lang: { label: 'Idioma' },
    notFound: {
      seoTitle: 'Página no encontrada',
      seoDesc: 'La página no existe.',
      title: 'Página no encontrada',
      body: 'El enlace puede estar desactualizado o mal escrito.',
      home: 'Volver al inicio',
    },
  },
  it: {
    nav: { home: 'Home', blog: 'Blog', about: 'Chi siamo' },
    header: { blog: 'Blog', peace: 'Tranquillità' },
    footer: {
      blurb: 'Organizzazione privacy-first: liste, diario, routine e altro — sul tuo dispositivo.',
      privacy: 'Privacy',
      googlePlay: 'Google Play',
      appStore: 'App Store',
      rights: 'Tutti i diritti riservati.',
    },
    home: {
      seoTitle: 'Organizza la tua vita, a modo tuo',
      seoDesc:
        'Blog Unutma — guide su produttività, app rispettose della privacy, diario e routine. Scarica Unutma: offline, privata, gratis per iniziare.',
      peace: 'Tranquillità, sul telefono',
      heroTitle: 'Organizza la tua vita, a modo tuo',
      heroBody:
        'Liste offline, diario, routine, cassaforte e altro — tutto sul telefono. Nessun account obbligatorio. Questo blog offre consigli per un digitale più calmo.',
      readBlog: 'Vai al blog',
      latest: 'Articoli recenti',
      latestSub: 'Idee su produttività, privacy e abitudini — aggiornato con nuovi post.',
      viewAll: 'Tutti gli articoli',
      why: 'Perché Unutma?',
      f1t: 'Offline prima di tutto',
      f1d: 'Le funzioni principali funzionano senza connessione continua.',
      f2t: 'Privato',
      f2d: 'Note e liste restano sul dispositivo — non sui nostri server.',
      f3t: 'Gratis per iniziare',
      f3d: 'Organizzati senza paywall per l’essenziale.',
      f4t: 'Multilingua',
      f4d: 'Usa l’app nella lingua che preferisci.',
      noPosts: 'Nessun articolo — aggiungi Markdown in',
      noPostsHint: 'oppure esegui lo script Python.',
    },
    blog: {
      seoTitle: 'Blog',
      seoDesc:
        'Articoli su produttività, strumenti privacy-first, diario, routine e organizzazione — dal team Unutma.',
      title: 'Blog',
      sub: 'Tutti i post, i più recenti prima. Filtra per tag da ogni scheda.',
      enNote: 'Gli articoli sono in inglese; l’app è multilingua.',
      pageTitle: 'Blog — pagina',
      older: 'Articoli precedenti.',
      pageOf: 'Pagina',
      next: 'Avanti',
      prev: 'Indietro',
      tagSeo: 'Blog Unutma — tag',
      tagAll: '← Tutti gli articoli',
      tagCount: 'articolo/i',
    },
    blogCard: { readMore: 'Leggi di più →' },
    about: {
      seoTitle: 'Chi siamo',
      seoDesc: 'Su Unutma e questo blog — produttività con privacy e articoli pratici.',
      h1: 'Su questo blog',
      p1: 'Unutma Blog pubblica articoli utili su produttività, diario, routine, strumenti privacy-first e organizzazione personale. Obiettivo: abitudini più serene — e presentare Unutma solo quando ha senso.',
      h2: 'Su Unutma',
      p2: 'Unutma è un’app per liste, diario, cassaforte password, wishlist, finanze, routine e altro — pensata per l’offline e i dati sul dispositivo. Nessun account richiesto per i tuoi contenuti.',
      p3: 'Non siamo solo cloud: crediamo che note e attività siano tue. Il blog ha valore anche senza scaricare l’app.',
    },
    privacy: {
      seoTitle: 'Privacy',
      seoDesc: 'Informativa ufficiale Unutma (Google Sites) e note su questo sito.',
      h1: 'Privacy',
      p1: 'L’informativa ufficiale dell’app Unutma è su Google Sites (anche multilingua). Leggi il testo completo al link — è il documento vincolante.',
      cta: 'Apri l’informativa ufficiale →',
      direct: 'URL diretto:',
      h2web: 'Questo sito (blog)',
      pWeb:
        'Sito statico: l’host (es. Vercel) può conservare log di server/CDN. Nessuna pubblicità nell’app Unutma; questo blog mostrerebbe annunci solo se attivati e aggiornando questo avviso.',
      h2contact: 'Contatto (policy app)',
      pContact:
        'Per domande sulla policy su Google Sites usa i canali indicati lì — ad esempio',
      back: '← Home',
    },
    newsletter: {
      title: 'Resta organizzato',
      sub: 'Suggerimenti occasionali su produttività e app rispettose della privacy. Niente spam.',
      email: 'Email',
      placeholder: 'tu@esempio.it',
      btn: 'Prossimamente',
      hint: 'Collega il provider email in NewsletterForm.astro quando pronto.',
    },
    appBanner: {
      title: 'Pronto a organizzarti?',
      body: 'Unutma organizza la tua vita — offline, privata e gratis per iniziare. Nessun account obbligatorio. I dati restano sul dispositivo.',
    },
    theme: { light: 'Chiaro', dark: 'Scuro', toggle: 'Tema' },
    lang: { label: 'Lingua' },
    notFound: {
      seoTitle: 'Pagina non trovata',
      seoDesc: 'La pagina non esiste.',
      title: 'Pagina non trovata',
      body: 'Il link potrebbe essere vecchio o errato.',
      home: 'Torna alla home',
    },
  },
  fr: {
    nav: { home: 'Accueil', blog: 'Blog', about: 'À propos' },
    header: { blog: 'Blog', peace: 'Sérénité' },
    footer: {
      blurb: 'Organisation axée confidentialité : listes, journal, routines et plus — sur votre appareil.',
      privacy: 'Confidentialité',
      googlePlay: 'Google Play',
      appStore: 'App Store',
      rights: 'Tous droits réservés.',
    },
    home: {
      seoTitle: 'Organisez votre vie, à votre façon',
      seoDesc:
        'Blog Unutma — guides sur la productivité, apps respectueuses de la vie privée, journal et routines. Téléchargez Unutma : hors ligne, privée, gratuite pour commencer.',
      peace: 'Sérénité, dans votre poche',
      heroTitle: 'Organisez votre vie, à votre façon',
      heroBody:
        'Listes hors ligne, journal, routines, coffre-fort et plus — sur le téléphone. Pas de compte obligatoire. Ce blog partage des conseils pour un numérique plus calme.',
      readBlog: 'Voir le blog',
      latest: 'Derniers articles',
      latestSub: 'Idées productivité, confidentialité et habitudes — mis à jour régulièrement.',
      viewAll: 'Tous les articles',
      why: 'Pourquoi Unutma ?',
      f1t: 'Hors ligne d’abord',
      f1d: 'L’essentiel fonctionne sans connexion permanente.',
      f2t: 'Privé',
      f2d: 'Vos notes et listes restent sur l’appareil — pas sur nos serveurs.',
      f3t: 'Gratuit pour commencer',
      f3d: 'Organisez-vous sans paywall pour l’essentiel.',
      f4t: 'Multilingue',
      f4d: 'Utilisez l’app dans la langue qui vous convient.',
      noPosts: 'Pas encore d’articles — ajoutez des Markdown dans',
      noPostsHint: 'ou lancez le script Python.',
    },
    blog: {
      seoTitle: 'Blog',
      seoDesc:
        'Articles sur la productivité, outils respectueux de la vie privée, journal, routines et organisation — par l’équipe Unutma.',
      title: 'Blog',
      sub: 'Tous les articles, les plus récents d’abord. Filtrez par étiquette sur chaque carte.',
      enNote: 'Les articles sont en anglais ; l’app est multilingue.',
      pageTitle: 'Blog — page',
      older: 'Articles plus anciens.',
      pageOf: 'Page',
      next: 'Suivant',
      prev: 'Précédent',
      tagSeo: 'Blog Unutma — étiquette',
      tagAll: '← Tous les articles',
      tagCount: 'article(s)',
    },
    blogCard: { readMore: 'Lire la suite →' },
    about: {
      seoTitle: 'À propos',
      seoDesc: 'À propos d’Unutma et de ce blog — productivité et confidentialité, articles pratiques.',
      h1: 'À propos de ce blog',
      p1: 'Unutma Blog publie des articles utiles sur la productivité, le journal, les routines, les outils respectueux de la vie privée et l’organisation personnelle. Objectif : des habitudes plus sereines — et présenter Unutma quand c’est pertinent.',
      h2: 'À propos d’Unutma',
      p2: 'Unutma est une app mobile pour listes, journal, coffre mots de passe, liste de souhaits, finances, routines et plus — centrée sur le hors ligne et vos données sur l’appareil. Aucun compte requis pour votre contenu.',
      p3: 'Nous ne sommes pas un service 100 % cloud : vos notes et tâches vous appartiennent. Ce blog a de la valeur même sans télécharger l’app.',
    },
    privacy: {
      seoTitle: 'Confidentialité',
      seoDesc: 'Politique officielle Unutma (Google Sites) et notes sur ce site.',
      h1: 'Confidentialité',
      p1: 'La politique officielle de l’app Unutma est maintenue sur Google Sites (multilingue). Lisez le texte complet via le lien — c’est le document faisant foi.',
      cta: 'Ouvrir la politique officielle →',
      direct: 'URL directe :',
      h2web: 'Ce site web (blog)',
      pWeb:
        'Site statique : votre hébergeur (ex. Vercel) peut conserver des journaux classiques. Pas de pubs dans l’app Unutma ; ce blog n’afficherait des pubs tierces qu’après activation et mise à jour de cet avis.',
      h2contact: 'Contact (politique app)',
      pContact:
        'Pour les questions sur la politique publiée sur Google Sites, utilisez les canaux indiqués — par exemple',
      back: '← Accueil',
    },
    newsletter: {
      title: 'Restez organisé',
      sub: 'Conseils occasionnels sur la productivité et les apps respectueuses de la vie privée. Pas de spam.',
      email: 'E-mail',
      placeholder: 'vous@exemple.com',
      btn: 'Bientôt',
      hint: 'Connectez votre fournisseur e-mail dans NewsletterForm.astro quand prêt.',
    },
    appBanner: {
      title: 'Prêt à vous organiser ?',
      body: 'Unutma organise votre vie — hors ligne, privée et gratuite pour commencer. Pas de compte obligatoire. Vos données restent sur l’appareil.',
    },
    theme: { light: 'Clair', dark: 'Sombre', toggle: 'Thème' },
    lang: { label: 'Langue' },
    notFound: {
      seoTitle: 'Page introuvable',
      seoDesc: 'La page n’existe pas.',
      title: 'Page introuvable',
      body: 'Le lien est peut-être obsolète ou incorrect.',
      home: 'Retour à l’accueil',
    },
  },
  tr: {
    nav: { home: 'Ana sayfa', blog: 'Blog', about: 'Hakkında' },
    header: { blog: 'Blog', peace: 'Huzur' },
    footer: {
      blurb: 'Gizlilik odaklı düzen: listeler, günlük, rutinler ve daha fazlası — cihazında.',
      privacy: 'Gizlilik politikası',
      googlePlay: 'Google Play',
      appStore: 'App Store',
      rights: 'Tüm hakları saklıdır.',
    },
    home: {
      seoTitle: 'Hayatını kendi kurallarına göre düzenle',
      seoDesc:
        'Unutma Blog — verimlilik, gizlilik dostu uygulamalar, günlük ve rutinler hakkında rehberler. Unutma: çevrimdışı, özel, ücretsiz başla.',
      peace: 'Huzur, cebinde',
      heroTitle: 'Hayatını kendi kurallarına göre düzenle',
      heroBody:
        'Çevrimdışı listeler, günlük, rutinler, kasa ve daha fazlası — telefonunda. Hesap gerekmez. Bu blog, daha sakin bir dijital yaşam için ipuçları paylaşır.',
      readBlog: 'Bloga git',
      latest: 'Son yazılar',
      latestSub: 'Verimlilik, gizlilik ve alışkanlıklar — yeni yazılar geldikçe güncellenir.',
      viewAll: 'Tüm yazılar',
      why: 'Neden Unutma?',
      f1t: 'Önce çevrimdışı',
      f1d: 'Temel özellikler sürekli internet olmadan çalışır.',
      f2t: 'Gizli',
      f2d: 'Notların ve listelerin cihazında kalır — sunucularımızda değil.',
      f3t: 'Ücretsiz başla',
      f3d: 'Temel düzen için abonelik duvarı yok.',
      f4t: 'Çok dilli',
      f4d: 'Uygulamayı güne uygun dilde kullan.',
      noPosts: 'Henüz yazı yok — Markdown ekleyin:',
      noPostsHint: 'veya Python üreticisini çalıştırın.',
    },
    blog: {
      seoTitle: 'Blog',
      seoDesc:
        'Verimlilik, gizlilik dostu araçlar, günlük, rutinler ve düzen hakkında yazılar — Unutma ekibinden.',
      title: 'Blog',
      sub: 'Tüm yazılar, en yeniler üstte. Her karttan etikete göre süz.',
      enNote: 'Yazılar İngilizce; uygulama çok dilli.',
      pageTitle: 'Blog — sayfa',
      older: 'Eski yazılar.',
      pageOf: 'Sayfa',
      next: 'İleri',
      prev: 'Geri',
      tagSeo: 'Unutma Blog — etiket',
      tagAll: '← Tüm yazılar',
      tagCount: 'yazı',
    },
    blogCard: { readMore: 'Devamını oku →' },
    about: {
      seoTitle: 'Hakkında',
      seoDesc: 'Unutma ve bu blog hakkında — gizlilik odaklı verimlilik ve pratik yazılar.',
      h1: 'Bu blog hakkında',
      p1: 'Unutma Blog; verimlilik, günlük, rutinler, gizlilik dostu araçlar ve kişisel düzen üzerine yararlı yazılar yayınlar. Amaç: daha sakin alışkanlıklar — ve Unutma’yı gerçekten uyduğunda tanıtmak.',
      h2: 'Unutma hakkında',
      p2: 'Unutma; listeler, günlük, şifre kasası, istek listesi, finans, rutinler ve daha fazlası için bir mobil uygulamadır — çevrimdışı kullanım ve verilerin cihazında kalması önceliklidir. İçeriğin için hesap gerekmez.',
      p3: 'Bulut-öncelikli bir servis değiliz; notların ve görevlerin sana ait. Bu blog, uygulamayı indirmesen de değer sunar.',
    },
    privacy: {
      seoTitle: 'Gizlilik politikası',
      seoDesc: 'Resmi Unutma gizlilik politikası (Google Sites) ve bu site hakkında notlar.',
      h1: 'Gizlilik politikası',
      p1: 'Unutma uygulaması için bağlayıcı gizlilik politikası Google Sites üzerinde güncellenir (çok dilli). Lütfen aşağıdaki bağlantıdan tam metni okuyun.',
      cta: 'Resmi gizlilik politikasını aç →',
      direct: 'Doğrudan adres:',
      h2web: 'Bu web sitesi (blog)',
      pWeb:
        'Bu site statik bir pazarlama blogudur; barındırıcı (ör. Vercel) olağan sunucu/CDN günlükleri tutabilir. Unutma uygulamasında reklam yok; bu blogda üçüncü taraf reklamları yalnızca açıkça etkinleştirirsek gösterilir.',
      h2contact: 'İletişim (uygulama politikası)',
      pContact:
        'Google Sites’taki politika hakkında sorular için orada belirtilen kanalı kullanın — örneğin',
      back: '← Ana sayfa',
    },
    newsletter: {
      title: 'Düzenli kal',
      sub: 'Arada sırada verimlilik ve gizlilik dostu uygulamalar hakkında ipuçları. Spam yok.',
      email: 'E-posta',
      placeholder: 'sen@ornek.com',
      btn: 'Çok yakında',
      hint: 'Hazır olduğunda NewsletterForm.astro içinde e-posta sağlayıcısını bağlayın.',
    },
    appBanner: {
      title: 'Düzene geçmeye hazır mısın?',
      body: 'Unutma hayatını düzenler — çevrimdışı, özel ve ücretsiz başla. Hesap gerekmez. Veriler cihazında kalır.',
    },
    theme: { light: 'Açık', dark: 'Koyu', toggle: 'Görünüm' },
    lang: { label: 'Dil' },
    notFound: {
      seoTitle: 'Sayfa bulunamadı',
      seoDesc: 'Aradığınız sayfa yok.',
      title: 'Sayfa bulunamadı',
      body: 'Bağlantı eski veya hatalı olabilir.',
      home: 'Ana sayfaya dön',
    },
  },
};

export function t(locale: Locale): UIStrings {
  return ui[locale];
}
