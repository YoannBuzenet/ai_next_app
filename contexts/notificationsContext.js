import React from "react";

export default React.createContext({
  notificationInfo: {
    alert: { style: {}, severity: "success", variant: "filled" },
    snackbar: {
      autoHideDuration: 20000,
      anchorOrigin: "",
      open: "",
      onClose: "",
    },
  },
  setNotificationInfo: (value) => {},
});
