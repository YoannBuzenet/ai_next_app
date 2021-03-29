import React, { useContext } from "react";
import TransparentDivContext from "../contexts/transparentDiv";
import areFlagsDisplayedContext from "../contexts/areFlagsDisplayed";

const TransparentDiv = () => {
  //Transparent Div Context
  const {
    isTransparentDivDisplayed,
    setIsTransparentDivDisplayed,
  } = useContext(TransparentDivContext);
  const { areFlagsDisplayed, setAreFlagsDisplayed } = useContext(
    areFlagsDisplayedContext
  );

  const closeEverything = (event) => {
    setIsTransparentDivDisplayed(false);
    setAreFlagsDisplayed(false);
  };

  console.log("transparent div maggle");

  return (
    <div className="transparentDiv" onClick={(e) => closeEverything(e)}>
      Transparent Div
    </div>
  );
};

export default TransparentDiv;
