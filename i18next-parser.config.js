module.exports = {
  createOldCatalogs: true,
  indentation: 2,
  lexers: {
    js: ['JsxLexer'],
    ts: ['JsxLexer'],
    jsx: ['JsxLexer'],
    tsx: ['JsxLexer'],

    default: ['JsxLexer'],
  },
  locales: ['en', 'ar'],
  output: `src/assets/i18n/$LOCALE.i18n.json`,
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  verbose: true,
};
