import English from "../translations/en.json";
import French from "../translations/fr.json";

const langInApp = {
  "en-US": {
    translatedText: English,
    picture: "EN.png",
    langID: 0,
    locale: "en-US",
  },
  "fr-FR": {
    translatedText: French,
    picture: "FR.png",
    langID: 1,
    locale: "fr-FR",
  },
};

module.exports = { langInApp };
