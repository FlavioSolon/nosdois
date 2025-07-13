// postcss.config.mjs
const config = {
  plugins: {
    // Use o novo pacote @tailwindcss/postcss aqui
    '@tailwindcss/postcss': {}, // <-- ATUALIZE ESTA LINHA
    autoprefixer: {},
  },
};

export default config;