/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../packages/shared_ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: '#0E1117',
          secondary: '#161B26',
          tertiary: '#1E2533',
          elevated: '#252D3D',
        },
        brand: {
          DEFAULT: '#3B82F6',
          muted: 'rgba(59, 130, 246, 0.12)',
        },
        state: {
          red: '#EF4444',
          amber: '#F59E0B',
          green: '#22C55E',
          cyan: '#06B6D4',
          violet: '#8B5CF6',
        },
        txt: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          medium: 'rgba(255, 255, 255, 0.12)',
          strong: 'rgba(255, 255, 255, 0.20)',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-lg': ['20px', { lineHeight: '28px', letterSpacing: '-0.015em', fontWeight: '600' }],
        'heading-md': ['16px', { lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg':    ['15px', { lineHeight: '24px', fontWeight: '400' }],
        'body-md':    ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-sm':    ['13px', { lineHeight: '18px', fontWeight: '400' }],
        'label-lg':   ['13px', { lineHeight: '16px', letterSpacing: '0.01em', fontWeight: '600' }],
        'label-md':   ['12px', { lineHeight: '16px', letterSpacing: '0.02em', fontWeight: '600' }],
        'label-sm':   ['11px', { lineHeight: '14px', letterSpacing: '0.04em', fontWeight: '500' }],
        'caption':    ['10px', { lineHeight: '14px', letterSpacing: '0.03em', fontWeight: '500' }],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'elevation-1': '0 1px 2px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.15)',
        'elevation-2': '0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.15)',
        'elevation-3': '0 10px 15px rgba(0,0,0,0.35), 0 4px 6px rgba(0,0,0,0.15)',
        'elevation-4': '0 20px 25px rgba(0,0,0,0.4), 0 8px 10px rgba(0,0,0,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right': 'slideRight 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-live': 'pulseLive 2s ease-in-out infinite',
        'scale-in': 'scaleIn 250ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseLive: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
