import React from "react";

export default React.createContext({
  isDisplayedNotification: true,
  setIsDisplayedNotification: (value) => {},
});
