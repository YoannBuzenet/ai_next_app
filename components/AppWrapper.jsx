import React, { useState } from "react";
import SelectedCategoryContext from "../contexts/selectedCategoryContext";
import BlackDivContextFile from "../contexts/blackDiv";
import UserContextFile from "../contexts/userContext";
import IsResponsiveMenuDisplayedContextFile from "../contexts/menuDisplayed";
import DefinitionsContextFile from "../contexts/definitions";
import TransparentDivContextFile from "../contexts/transparentDiv";
import AppLangContextFile from "../contexts/selectedAppLang";
import AreFlagsDisplayed from "../contexts/areFlagsDisplayed";
import NotificationContext from "../contexts/notificationsContext";
import { IntlProvider } from "react-intl";
import { langInApp } from "../definitions/langs";
import TransparentDiv from "../components/TransparentDiv";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const AppWrapper = ({ children }) => {
  const [selectedCategoryID, setSelectedCategoryID] = useState(1);
  const [isBlackDivDisplayed, setIsBlackDivDisplayed] = useState(false);
  const [areFlagsDisplayed, setAreFlagsDisplayed] = useState(false);
  const [notificationInfo, setNotificationInfo] = useState({
    alert: { style: {}, severity: "success", variant: "filled", message: "" },
    snackbar: {
      autoHideDuration: null,
      anchorOrigin: { vertical: "bottom", horizontal: "left" },
      isDisplayed: false,
      onClose: "",
    },
  });
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

  const [userContext, setUserContext] = useState({
    langSelected: currentLang.locale,
  });

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
  const handleSetIsDisplayedNotification = (contextSnackBar) => {
    setNotificationInfo(contextSnackBar);
  };
  const handleSetContextCurrentLang = (currentLang) => {
    if (Object.keys(langInApp).includes(currentLang?.locale)) {
      setCurrentLang(currentLang);
    } else {
      setCurrentLang(langInApp["en-US"]);
    }
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
  const contextNotification = {
    notificationInfo,
    setNotificationInfo: handleSetIsDisplayedNotification,
  };

  return (
    <UserContextFile.Provider value={contextUserProps}>
      <NotificationContext.Provider value={contextNotification}>
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
                        <>
                          {isTransparentDivDisplayed && <TransparentDiv />}
                          <Snackbar
                            anchorOrigin={
                              notificationInfo.snackbar.anchorOrigin
                            }
                            open={notificationInfo.snackbar.isDisplayed}
                            autoHideDuration={
                              notificationInfo.snackbar.autoHideDuration
                            }
                            onClose={(e) =>
                              handleSetIsDisplayedNotification({
                                ...notificationInfo,
                                snackbar: {
                                  ...notificationInfo.snackbar,
                                  isDisplayed: false,
                                },
                              })
                            }
                          >
                            <MuiAlert
                              onClose={(e) =>
                                handleSetIsDisplayedNotification({
                                  ...notificationInfo,
                                  snackbar: {
                                    ...notificationInfo.snackbar,
                                    isDisplayed: false,
                                  },
                                })
                              }
                              severity={notificationInfo.alert.severity}
                              style={{ whiteSpace: "pre-line" }}
                              variant={notificationInfo.alert.variant}
                            >
                              {notificationInfo.alert.message}
                            </MuiAlert>
                          </Snackbar>
                          {children}
                        </>
                      </IntlProvider>
                    </IsResponsiveMenuDisplayedContextFile.Provider>
                  </AreFlagsDisplayed.Provider>
                </AppLangContextFile.Provider>
              </DefinitionsContextFile.Provider>
            </TransparentDivContextFile.Provider>
          </BlackDivContextFile.Provider>
        </SelectedCategoryContext.Provider>
      </NotificationContext.Provider>
    </UserContextFile.Provider>
  );
};

export default AppWrapper;
