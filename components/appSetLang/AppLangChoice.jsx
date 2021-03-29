import React, { useContext, useState } from "react";
import SelectAppLangContext from "../../contexts/selectedAppLang";
import AreFlagsDisplayedContext from "../../contexts/areFlagsDisplayed";
import transparentDivContext from "../../contexts/transparentDiv";
import { arrayLangsInApp } from "../../definitions/langs";
import styles from "../../styles/AppLangChoice.module.css";

const AppLangChoice = ({
  top = "22",
  topArrowMenu = "8",
  marginLeft = "0",
  lineHeightSelectAppLang = "25",
  topSelectAppLangFlags = "22",
}) => {
  const { currentLang, setCurrentLang } = useContext(SelectAppLangContext);
  const {
    isTransparentDivDisplayed,
    setIsTransparentDivDisplayed,
  } = useContext(transparentDivContext);
  const { areFlagsDisplayed, setAreFlagsDisplayed } = useContext(
    AreFlagsDisplayedContext
  );

  const handleClick = (event, lang) => {
    setCurrentLang({
      locale: lang.locale,
      translationsForUsersLocale: lang.translationsForUsersLocale,
      picture: lang.picture,
      langID: lang.langID,
    });
    window.localStorage.setItem("appLang", lang.locale);
  };

  const handleClickDisplayFlags = (event) => {
    setAreFlagsDisplayed(!areFlagsDisplayed);
    setIsTransparentDivDisplayed(true);
  };

  return (
    <>
      {areFlagsDisplayed && (
        <div
          className="transparent-div"
          onClick={(e) => handleClickDisplayFlags(e)}
        ></div>
      )}
      <div className={styles.currentAppLang}>
        <div
          className={styles.currentLangFlag}
          style={{ top: top + "px", marginLeft: marginLeft + "px" }}
          onClick={(e) => handleClickDisplayFlags(e)}
        >
          <img
            src={"/pictures/flags/25X13/" + currentLang.picture + ".png"}
            alt={currentLang.picture + " flag"}
          />
          <span
            className={styles.arrowMenu}
            style={{ top: topArrowMenu + "px" }}
          ></span>

          {areFlagsDisplayed && (
            <div
              className={styles.setLangChoosing}
              style={{
                lineHeight: lineHeightSelectAppLang + "px",
                top: topSelectAppLangFlags + "px",
              }}
            >
              {arrayLangsInApp.map((lang, index) => (
                <div
                  className={styles.flagDropDown}
                  key={index}
                  onClick={(event) => handleClick(event, lang)}
                >
                  <img
                    src={"/pictures/flags/25X13/" + lang.picture + ".png"}
                    alt={lang.picture + " flag"}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppLangChoice;
