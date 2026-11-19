/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /** 3.30 kimligi: uygulamanin acik tema dugme yesili (#087F5B). Eski indigo bitti. */
        brand: {
          DEFAULT: '#087F5B',
          dark: '#05553D',
        },
        ink: '#0F2A1F',
        leaf: '#2FBF71',
        mint: { DEFAULT: '#EAF5EE', line: '#D5E6DB' },
        /** Matches Unutma Android adaptive icon background (`app.json`). */
        peace: {
          DEFAULT: '#0d6636',
          dark: '#0a5230',
          light: '#ecfdf5',
        },
        accent: '#06B6D4',
      },
      /**
       * Kontrast (WCAG AA 4.5:1): Tailwind gray-400 (#9ca3af) beyaz zeminde 2.53:1 idi
       * (tarih/etiket yazilari). Yazi rengi olarak gray-400 artik #6b7280 (4.83:1), ayni gri
       * tonu. Yalniz textColor degisir; kenarlik/ikon/placeholder renkleri ayni kalir.
       * Not: site koyu modu acmiyor (darkMode: 'class', .dark hic eklenmiyor).
       */
      textColor: {
        gray: { 400: '#6b7280' },
      },
      fontFamily: {
        /** Body: modern, readable UI */
        sans: ['"Plus Jakarta Sans"', '"Plus Jakarta Sans Fallback"', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        /** Headings & brand wordmark */
        /** 3.30: tek aile. Basliklar da Jakarta (Fraunces dosyalari duruyor, kullanilmiyor). */
        display: ['"Plus Jakarta Sans"', '"Plus Jakarta Sans Fallback"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'brand-xl': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        'brand-2xl': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.035em' }],
        'brand-3xl': ['3.25rem', { lineHeight: '1.08', letterSpacing: '-0.04em' }],
      },
      boxShadow: {
        brand: '0 4px 24px -4px rgba(8, 127, 91, 0.22), 0 8px 32px -8px rgba(15, 42, 31, 0.10)',
        'brand-sm': '0 2px 12px rgba(8, 127, 91, 0.14)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            fontSize: '1.0625rem',
            lineHeight: '1.75',
            color: '#24372d',
            a: {
              fontWeight: '600',
              color: '#087F5B',
              textDecorationColor: 'rgba(8,127,91,.35)',
              textUnderlineOffset: '3px',
            },
            'h1, h2, h3, h4, strong': { color: '#0F2A1F' },
            h1: {
              fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans Fallback', system-ui, sans-serif",
              fontWeight: '600',
              letterSpacing: '-0.03em',
              lineHeight: '1.2',
            },
            h2: {
              fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans Fallback', system-ui, sans-serif",
              fontWeight: '700',
              letterSpacing: '-0.025em',
              marginTop: '2em',
            },
            h3: {
              fontFamily: "'Plus Jakarta Sans', 'Plus Jakarta Sans Fallback', system-ui, sans-serif",
              fontWeight: '600',
              letterSpacing: '-0.02em',
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftColor: '#2FBF71',
              color: '#3d5247',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
