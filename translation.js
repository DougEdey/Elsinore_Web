const {
  generateTranslationDictionaries,
} = require("@shopify/react-i18n/generate-dictionaries");

const SUPPORTED_LOCALES = ["en"];

(async () => {
  await generateTranslationDictionaries(SUPPORTED_LOCALES, {
    fallbackLocale: "en",
  });
})();
