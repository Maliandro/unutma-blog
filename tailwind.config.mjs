/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4F46E5',
          dark: '#4338CA',
        },
        /** Matches Unutma Android adaptive icon background (`app.json`). */
        peace: {
          DEFAULT: '#0d6636',
          dark: '#0a5230',
          light: '#ecfdf5',
        },
        accent: '#06B6D4',
      },
      fontFamily: {
        /** Body: modern, readable UI */
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        /** Headings & brand wordmark */
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      fontSize: {
        'brand-xl': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        'brand-2xl': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.035em' }],
        'brand-3xl': ['3.25rem', { lineHeight: '1.08', letterSpacing: '-0.04em' }],
      },
      boxShadow: {
        brand: '0 4px 24px -4px rgba(79, 70, 229, 0.25), 0 8px 32px -8px rgba(13, 102, 54, 0.12)',
        'brand-sm': '0 2px 12px rgba(79, 70, 229, 0.18)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            fontSize: '1.0625rem',
            lineHeight: '1.75',
            a: {
              fontWeight: '500',
            },
            h1: {
              fontFamily: 'Fraunces, Georgia, serif',
              fontWeight: '600',
              letterSpacing: '-0.03em',
              lineHeight: '1.2',
            },
            h2: {
              fontFamily: 'Fraunces, Georgia, serif',
              fontWeight: '600',
              letterSpacing: '-0.025em',
              marginTop: '2em',
            },
            h3: {
              fontFamily: 'Fraunces, Georgia, serif',
              fontWeight: '600',
              letterSpacing: '-0.02em',
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftColor: '#c7d2fe',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
