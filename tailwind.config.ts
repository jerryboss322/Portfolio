import type { Config } from 'tailwindcss';
import path from 'path';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#02040a',
          light: '#f5f8fc',
        },
        surface: {
          DEFAULT: '#070c1e',
          light: '#ffffff',
          strong: '#0c122c',
        },
        border: {
          DEFAULT: '#162447',
          light: '#d2e1f3',
        },
        text: {
          DEFAULT: '#f0f4ff',
          light: '#0e162b',
          muted: '#7c8ba1',
          muted_light: '#5d6a85',
        },
        accent: {
          DEFAULT: '#0077ff',
          strong: '#00f0ff',
          soft: 'rgba(0, 119, 255, 0.15)',
        },
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
