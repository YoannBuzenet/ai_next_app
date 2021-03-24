import React from "react";

export default React.createContext({
  currentLang: {
    picture: "",
    locale: "en-US",
    translationsForUsersLocale: "",
    langID: 0,
  },
  setCurrentLang: (value) => {},
});
