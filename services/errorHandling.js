import { FormattedMessage } from "react-intl";
import React from "react";

function checkErrorStatus(error) {
  console.log("error from error handling :", error);
  if (error.response) {
    console.log("error.response", error.response);
    if (error.response.status === 401) {
      return (
        <FormattedMessage
          id="general.errorHandling.error401"
          defaultMessage={`You are not logged anymore. Please log again.`}
        />
      );
    } else if (error.response.status === 403) {
      return (
        <FormattedMessage
          id="general.errorHandling.error403"
          defaultMessage={`You don't have access to this ressource.`}
        />
      );
    }
  } else if (error.response.status === 500) {
    return (
      <FormattedMessage
        id="general.errorHandling.error500"
        defaultMessage={`There has been an error. Please try again later.`}
      />
    );
  } else {
    return (
      <FormattedMessage
        id="general.errorHandling.errorUnknown"
        defaultMessage={`There has been an error. Please try again later.`}
      />
    );
  }

  return false;
}

export default { checkErrorStatus };
