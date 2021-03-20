import React from "react";
import UserContextFile from "../contexts/userContext";

const AppWrapper = ({ children }) => {
  const [userContext, setUserContext] = React.useState({ test: "test" });

  const handleSetContextUser = (contextData) => {
    setUserContext(contextData);
  };

  const contextProps = {
    userContext,
    setUserContext: handleSetContextUser,
  };

  return (
    <UserContextFile.Provider value={contextProps}>
      {children}
    </UserContextFile.Provider>
  );
};

export default AppWrapper;
