import React, { useState } from "react";
import UserContextFile from "../contexts/userContext";
import BlackDivContextFile from "../contexts/blackDiv";
import IsResponsiveMenuDisplayedContextFile from "../contexts/menuDisplayed";
import DefinitionsContextFile from "../contexts/definitions";
import TransparentDivContextFile from "../contexts/transparentDiv";
import AppLangContextFile from "../contexts/selectedAppLang";
import { IntlProvider } from "react-intl";
import English from "../translations/en.json";

const AppWrapper = ({ children }) => {
  const [userContext, setUserContext] = useState({ test: "test" });
  const [isBlackDivDisplayed, setIsBlackDivDisplayed] = useState(false);
  const [isResponsiveMenuDisplayed, setIsResponsiveMenuDisplayed] = useState(
    false
  );
  const [allDefinitions, setAllDefinitions] = useState({});
  const [isTransparentDivDisplayed, setIsTransparentDivDisplayed] = useState(
    false
  );

  // App Language initialization

  // to do : allow app to start on local storage for language langFromLocalStorage || defaultLanguage,
  const [currentLang, setCurrentLang] = useState({
    picture: "",
    locale: "en-US",
    translationsForUsersLocale: English,
    langID: 0,
  });

  const handleSetContextUser = (contextData) => {
    setUserContext(contextData);
  };
  const handleSetContextBlackDiv = (blackDiv) => {
    setIsBlackDivDisplayed(blackDiv);
  };
  const handleSetContextResponsiveMenu = (responsiveMenu) => {
    setIsResponsiveMenuDisplayed(responsiveMenu);
  };
  const handleSetContextAllDefinitions = (definitions) => {
    setAllDefinitions(definitions);
  };
  const handleSetContextTransparentDiv = (transparentDiv) => {
    setIsTransparentDivDisplayed(transparentDiv);
  };
  const handleSetContextCurrentLang = (currentLang) => {
    setCurrentLang(currentLang);
  };

  const contextProps = {
    userContext,
    setUserContext: handleSetContextUser,
  };
  const contextBlackDiv = {
    isBlackDivDisplayed,
    setIsBlackDivDisplayed: handleSetContextBlackDiv,
  };

  const contextResponsiveMenu = {
    isResponsiveMenuDisplayed,
    setIsResponsiveMenuDisplayed: handleSetContextResponsiveMenu,
  };

  const contextAllDefinitions = {
    allDefinitions,
    setAllDefinitions: handleSetContextAllDefinitions,
  };
  const contextTransparentDiv = {
    isTransparentDivDisplayed,
    setIsTransparentDivDisplayed: handleSetContextTransparentDiv,
  };

  const contextCurrentLang = {
    currentLang,
    setCurrentLang: handleSetContextCurrentLang,
  };

  return (
    <UserContextFile.Provider value={contextProps}>
      <BlackDivContextFile.Provider value={contextBlackDiv}>
        <TransparentDivContextFile.Provider value={contextTransparentDiv}>
          <DefinitionsContextFile.Provider value={contextAllDefinitions}>
            <AppLangContextFile.Provider value={contextCurrentLang}>
              <IsResponsiveMenuDisplayedContextFile.Provider
                value={contextResponsiveMenu}
              >
                <IntlProvider
                  locale={currentLang.locale}
                  messages={currentLang.translationsForUsersLocale}
                >
                  {children}
                </IntlProvider>
              </IsResponsiveMenuDisplayedContextFile.Provider>
            </AppLangContextFile.Provider>
          </DefinitionsContextFile.Provider>
        </TransparentDivContextFile.Provider>
      </BlackDivContextFile.Provider>
    </UserContextFile.Provider>
  );
};

export default AppWrapper;
