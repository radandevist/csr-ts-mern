/* eslint-disable */
module.exports = (ctx) => {
  return {
    plugins: {
      "postcss-preset-env": {},
      autoprefixer: {},
      "postcss-normalize": {},
      cssnano: (ctx.env == "production") ? {} : null,
      tailwindcss: {},
    }
  };
};
