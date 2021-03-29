import English from "../translations/en.json";
import French from "../translations/fr.json";

const langInApp = {
  "en-US": {
    translatedText: English,
    picture: "EN",
    langID: 0,
    locale: "en-US",
  },
  "fr-FR": {
    translatedText: French,
    picture: "FR",
    langID: 1,
    locale: "fr-FR",
  },
};

const arrayLangsInApp = [
  {
    translatedText: English,
    picture: "EN",
    langID: 0,
    locale: "en-US",
  },
  {
    translatedText: French,
    picture: "FR",
    langID: 1,
    locale: "fr-FR",
  },
  {
    translatedText: {},
    picture: "IT",
    langID: 1,
    locale: "fr-FR",
  },
];

module.exports = { langInApp, arrayLangsInApp };
