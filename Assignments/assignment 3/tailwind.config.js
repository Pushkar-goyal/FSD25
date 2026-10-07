/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050508',
        ink: '#0a0a10',
        panel: '#0d0d14',
        edge: '#1a1a24',
        signal: '#6e7bff',
        signal2: '#a06bff',
        cyan: '#5ee6d0',
        mist: '#8a8ba0',
        paper: '#eef0f7',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #6e7bff 0%, #a06bff 100%)',
        'grad-radial': 'radial-gradient(circle at center, rgba(110,123,255,0.15), transparent 70%)',
      },
      boxShadow: {
        glow: '0 0 60px rgba(110,123,255,0.35)',
        'glow-purple': '0 0 60px rgba(160,107,255,0.35)',
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
}
