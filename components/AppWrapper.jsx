import React, { useState } from "react";
import SelectedCategoryContext from "../contexts/selectedCategoryContext";
import BlackDivContextFile from "../contexts/blackDiv";
import UserContextFile from "../contexts/userContext";
import IsResponsiveMenuDisplayedContextFile from "../contexts/menuDisplayed";
import DefinitionsContextFile from "../contexts/definitions";
import TransparentDivContextFile from "../contexts/transparentDiv";
import AppLangContextFile from "../contexts/selectedAppLang";
import AreFlagsDisplayed from "../contexts/areFlagsDisplayed";
import { IntlProvider } from "react-intl";
import { langInApp } from "../definitions/langs";
import TransparentDiv from "../components/TransparentDiv";

const AppWrapper = ({ children }) => {
  const [userContext, setUserContext] = useState({});
  const [selectedCategoryID, setSelectedCategoryID] = useState(1);
  const [isBlackDivDisplayed, setIsBlackDivDisplayed] = useState(false);
  const [areFlagsDisplayed, setAreFlagsDisplayed] = useState(false);
  const [isResponsiveMenuDisplayed, setIsResponsiveMenuDisplayed] = useState(
    false
  );
  const [allDefinitions, setAllDefinitions] = useState({});
  const [isTransparentDivDisplayed, setIsTransparentDivDisplayed] = useState(
    false
  );

  // App Language initialization

  let appInitialLang;
  let langSavedInLocalStorage;
  if (typeof window !== "undefined") {
    langSavedInLocalStorage = window.localStorage.getItem("lang");
  }

  if (langSavedInLocalStorage) {
    if (langInApp?.[langSavedInLocalStorage] !== undefined) {
      appInitialLang = langInApp[langSavedInLocalStorage];
    } else {
      appInitialLang = langInApp["en-US"];
      appInitialLang.isDefault = true;
    }
  } else {
    appInitialLang = langInApp["en-US"];
    appInitialLang.isDefault = true;
  }

  const [currentLang, setCurrentLang] = useState(appInitialLang);

  const handleSetContextUser = (contextData) => {
    setUserContext(contextData);
  };

  const handleSetCategoryID = (categoryID) => {
    setSelectedCategoryID(categoryID);
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
    if (Object.keys(langInApp).includes(currentLang.locale)) {
      setCurrentLang(currentLang);
    }
    return;
  };
  const handleSetAreFlagsDisplayed = (areFlagDisplayed) => {
    setAreFlagsDisplayed(areFlagDisplayed);
  };

  const contextUserProps = {
    userContext,
    setUserContext: handleSetContextUser,
  };

  const contextProps = {
    selectedCategoryID,
    setSelectedCategoryID: handleSetCategoryID,
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

  const contextAreFlagsDisplayed = {
    areFlagsDisplayed,
    setAreFlagsDisplayed: handleSetAreFlagsDisplayed,
  };

  return (
    <UserContextFile.Provider value={contextUserProps}>
      <SelectedCategoryContext.Provider value={contextProps}>
        <BlackDivContextFile.Provider value={contextBlackDiv}>
          <TransparentDivContextFile.Provider value={contextTransparentDiv}>
            <DefinitionsContextFile.Provider value={contextAllDefinitions}>
              <AppLangContextFile.Provider value={contextCurrentLang}>
                <AreFlagsDisplayed.Provider value={contextAreFlagsDisplayed}>
                  <IsResponsiveMenuDisplayedContextFile.Provider
                    value={contextResponsiveMenu}
                  >
                    <IntlProvider
                      locale={currentLang.locale}
                      messages={currentLang.translatedText}
                    >
                      {isTransparentDivDisplayed && <TransparentDiv />}
                      {children}
                    </IntlProvider>
                  </IsResponsiveMenuDisplayedContextFile.Provider>
                </AreFlagsDisplayed.Provider>
              </AppLangContextFile.Provider>
            </DefinitionsContextFile.Provider>
          </TransparentDivContextFile.Provider>
        </BlackDivContextFile.Provider>
      </SelectedCategoryContext.Provider>
    </UserContextFile.Provider>
  );
};

export default AppWrapper;
