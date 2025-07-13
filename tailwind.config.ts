// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Caminho principal no App Router
  ],
  theme: {
    extend: {
      // Adicione suas fontes e cores personalizadas aqui
      fontFamily: {
        great: ['var(--font-great-vibes)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        primary: '#10b981',
      },
    },
  },
  plugins: [],
}
export default config