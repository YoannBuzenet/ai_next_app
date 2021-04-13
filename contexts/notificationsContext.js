import React from "react";

export default React.createContext({
  notificationInfo: {
    alert: { style: {}, severity: "success", variant: "filled", message: "" },
    snackbar: {
      autoHideDuration: 20000,
      anchorOrigin: "",
      isDisplayed: false,
      onClose: "",
    },
  },
  setNotificationInfo: (value) => {},
});
