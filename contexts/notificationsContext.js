import React from "react";

export default React.createContext({
  notificationInfo: {
    alert: { style: {}, severity: "success", variant: "filled", message: "" },
    snackbar: {
      autoHideDuration: null,
      anchorOrigin: { vertical: "bottom", horizontal: "left" },
      isDisplayed: false,
      onClose: "",
    },
  },
  setNotificationInfo: (value) => {},
});
