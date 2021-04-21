import { useContext, useState, useEffect } from "react";
import SelectedCategoryId from "../../contexts/selectedCategoryContext";
import notificationContext from "../../contexts/notificationsContext";
import UserContext from "../../contexts/userContext";
import { categoriesDefinition } from "../../definitions/categories";
import styles from "../../styles/Text.module.css";
import { FormattedMessage, useIntl } from "react-intl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import AIResultV2 from "../../components/AIResultV2";
import { DateTime } from "luxon";
import axios from "axios";
import { useSession, getSession } from "next-auth/client";
import CircularIndeterminate from "../../components/Loader";
import SimpleSelect from "../../components/Base/Select";
import UserCheck from "../../services/userCheck";
import { FREE_LIMIT_NUMBER_OF_WORDS } from "../../config/settings";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const isLoggedUser = UserCheck.isUserLogged(session?.user?.isLoggedUntil);
  const isSubbed = UserCheck.isUserSubscribed(session?.user?.isSubscribedUntil);
  const isUserOnFreeAccess = session?.user?.isOnFreeAccess === 1;
  if (!isSubbed && !isUserOnFreeAccess) {
    return {
      redirect: {
        destination: "/pricing",
        permanent: false,
      },
      props: {},
    };
  } else {
    return { props: {} };
  }
}

export default function Text() {
  const intl = useIntl();
  const { selectedCategoryID, setSelectedCategoryID } = useContext(
    SelectedCategoryId
  );
  const { notificationInfo, setNotificationInfo } = useContext(
    notificationContext
  );
  const [userInputs, setUserInputs] = useState({});
  const [AIResults, setAIResults] = useState([]);
  const [outputNumber, setOutputNumber] = useState(3);
  const [isLoadingAPIResults, setIsLoadingAPIResults] = useState(false);
  const [session, loading] = useSession();
  const { userContext, setUserContext } = useContext(UserContext);

  const isSubbed = UserCheck.isUserSubscribed(session?.user?.isSubscribedUntil);

  // TRANSLATIONS
  const translatedInfoLess2000WordsMessage = intl.formatMessage({
    id: "notification.remainingConsoUnder2000words",
    defaultMessage:
      "There are less than 2,000 words remaining in your credit this month. If needed, you can purchase additional credits in My Account.",
  });
  const translatedInfonoMoreCreditMessage = intl.formatMessage({
    id: "notification.remainingConsoat0",
    defaultMessage:
      "All your credits have been used this month. If needed, you can purchase additional credits in My Account.",
  });
  const translatedLabelName = intl.formatMessage({
    id: "compo.text.inputOutput",
    defaultMessage: "Input / Output",
  });
  const translatedEnglishName = intl.formatMessage({
    id: "generic.lang.english",
    defaultMessage: "English",
  });
  const translatedFrenchName = intl.formatMessage({
    id: "generic.lang.french",
    defaultMessage: "French",
  });
  const translatedOutPutLabels = intl.formatMessage({
    id: "compo.text.numberOfOutputs",
    defaultMessage: "Outputs",
  });
  const translatedInputShouldHaveLength = intl.formatMessage({
    id: "compo.text.inputLenghtMin",
    defaultMessage: "Your input should contain at least one character.",
  });
  const translatedInputCompletelyFiltered = intl.formatMessage({
    id: "compo.text.AllAIoutputFiltered",
    defaultMessage:
      "All AI results have been filtered. This happens when inappropriate inputs are entered. Please ensure that you include politically correct content. Any abuse may lead to the account being closed.",
  });

  useEffect(() => {
    if (!isSubbed) {
      return;
    }
    if (
      session?.user?.totalMaxWordsUserThisMonth -
        session?.user?.consumptionThisMonth <=
      0
    ) {
      console.log("consommation terminée");
      setNotificationInfo({
        ...notificationInfo,
        alert: {
          ...notificationInfo.alert,
          message: translatedInfonoMoreCreditMessage,
          severity: "info",
        },
        snackbar: {
          ...notificationInfo.snackbar,
          isDisplayed: true,
        },
      });
    } else if (
      session?.user?.totalMaxWordsUserThisMonth -
        session?.user?.consumptionThisMonth <
      2000
    ) {
      console.log("consommation presque terminée");
      setNotificationInfo({
        ...notificationInfo,
        alert: {
          ...notificationInfo.alert,
          message: translatedInfoLess2000WordsMessage,
          severity: "info",
        },
        snackbar: {
          ...notificationInfo.snackbar,
          isDisplayed: true,
        },
      });
    } else {
      console.log("consommation ok");
    }
  }, [session?.user?.monthlyWordsConsumption]);

  const handleOuputNumber = (value) => {
    setOutputNumber(value);
  };

  const passLangSelectedToUserContext = (value) => {
    setUserContext({ ...userContext, langSelected: value });
  };

  const handleChangeInputs = (e, input) => {
    const userInput = e.target.value;
    let finalInput = userInputs?.[input.name];

    if (userInput.length > input.maxLengthInput) {
      setUserInputs({
        ...userInputs,
        [input.name]: finalInput,
      });
    } else {
      setUserInputs({
        ...userInputs,
        [input.name]: userInput,
      });
    }
  };

  console.log("yo", userContext.langSelected);

  const sendDataToBackEnd = async () => {
    // Check input here, if 0 return + notif
    // else, go

    for (const userInput in userInputs) {
      if (userInputs[userInput].length === 0) {
        setNotificationInfo({
          ...notificationInfo,
          alert: {
            ...notificationInfo.alert,
            message: translatedInputShouldHaveLength,
            severity: "error",
          },
          snackbar: {
            ...notificationInfo.snackbar,
            isDisplayed: true,
          },
        });
        return;
      }
    }

    setIsLoadingAPIResults(true);
    let arrayofuserInputs = [];
    for (const userInput in userInputs) {
      arrayofuserInputs = [
        ...arrayofuserInputs,
        { [userInput]: userInputs[userInput] },
      ];
    }
    const finalPayload = {
      categoryID: selectedCategoryID,
      userInputs: arrayofuserInputs,
      lang: userContext.langSelected,
      user: session.user,
      numberOfOutputs: outputNumber,
    };
    console.log("we build the final payload here. Here :", finalPayload);
    axios
      .post("/api/creation", finalPayload)
      .then((resp) => {
        console.log("resp after posting to next API", resp);
        const resultsWithDates = resp.data.response.map((result) => ({
          currentText: result,
          date: DateTime.now().setLocale("en"),
        }));
        const wasAllAIOutputFiltered = resp.data.wasAllInputFiltered;

        // If all AI output has been filtered (user may have entered an inadapted content, for example impolite or politically harmful)
        if (wasAllAIOutputFiltered) {
          setNotificationInfo({
            ...notificationInfo,
            alert: {
              ...notificationInfo.alert,
              message: translatedInputCompletelyFiltered,
              severity: "warning",
            },
            snackbar: {
              ...notificationInfo.snackbar,
              isDisplayed: true,
            },
          });
        }

        console.log("result with dates", resultsWithDates);
        setAIResults([...AIResults, ...resultsWithDates]);
        setIsLoadingAPIResults(false);
      })
      .catch((err) => {
        console.log("error after posting to next", err);
        setIsLoadingAPIResults(false);
        const messageToDisplay = errorHandling(err);
        setNotificationInfo({
          ...notificationInfo,
          alert: {
            ...notificationInfo.alert,
            message: messageToDisplay,
            severity: "error",
          },
          snackbar: {
            ...notificationInfo.snackbar,
            isDisplayed: true,
          },
        });
      });
  };

  const categoryObject = categoriesDefinition[selectedCategoryID];

  console.log("category selected", selectedCategoryID);

  const useStyles = makeStyles((theme) => ({
    button: {
      color: "white",
      fontWeight: 400,
      fontSize: 16,
      marginLeft: "20px",
      textTransform: "none",
      backgroundColor: "#477bde",
      "&:hover": {
        backgroundColor: "#1c64f2",
        boxShadow: "none",
      },
    },
  }));

  const classes = useStyles();
  return (
    <div className="heightContainer">
      <div className="container80 TextZone">
        <div className={styles.headlineContainer}>
          <div className={styles.pictureContainer}>
            <div className={styles.logoBackground}>
              <img src={categoryObject.urlIcon} className={styles.pictures} />
            </div>
          </div>
          <div className={styles.headlineText}>
            <p className={styles.headlineTitle}>
              <FormattedMessage
                id={categoryObject.name.id}
                defaultMessage={categoryObject.name.defaultMessage}
              />
            </p>
            <p className={styles.headlineDescription}>
              <FormattedMessage
                id={categoryObject.description.id}
                defaultMessage={categoryObject.description.defaultMessage}
              />
            </p>
          </div>
        </div>
        <div className={styles.textGeneratorContainer}>
          <div className={styles.leftDiv}>
            {
              <div className={styles.formContainer}>
                {categoryObject.inputs.map((input, index) => {
                  const translatedLabel = intl.formatMessage({
                    id: input.label.id,
                    defaultMessage: input.label.defaultMessage,
                  });
                  const translatedPlaceholder = intl.formatMessage({
                    id: input.placeholder.id,
                    defaultMessage: input.placeholder.defaultMessage,
                  });

                  return (
                    <div key={index} className={styles.oneInput}>
                      <div className={styles.lineAboveText}>
                        <p>{translatedLabel}</p>
                        <p className={styles.counter}>
                          {userInputs?.[input.name]?.length || 0}/
                          {input.maxLengthInput}
                        </p>
                      </div>
                      <TextField
                        className="inputUserTextGeneration"
                        InputProps={{ styles: { fontSize: 20 } }}
                        placeholder={translatedPlaceholder}
                        value={userInputs?.[input.name] || ""}
                        onChange={(e) => handleChangeInputs(e, input)}
                        fullWidth
                        variant="outlined"
                        multiline={
                          input.inputType === "textarea" ? true : false
                        }
                        rows={input.inputType === "textarea" ? 5 : 2}
                      />
                    </div>
                  );
                })}
                <div className={styles.spaceContainer}></div>
                <div className={styles.buttonContainer}>
                  <div className="selectContainer">
                    <SimpleSelect
                      handleChange={passLangSelectedToUserContext}
                      listToDisplay={[
                        { value: "en-US", name: translatedEnglishName },
                        { value: "fr-FR", name: translatedFrenchName },
                      ]}
                      value={userContext.langSelected}
                      label={translatedLabelName}
                    />
                  </div>
                  {/* <div
                    className="outputContainer"
                    style={{ position: "relative" }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        fontSize: "14px",
                        color: "#7c7c7c",
                      }}
                    >
                      <FormattedMessage
                        id="compo.text.numberOfOutputs"
                        defaultMessage="Outputs"
                      />
                    </span>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      onChange={handleOuputNumber}
                      value={outputNumber}
                    />
                  </div> */}
                  <div className="selectContainer">
                    <SimpleSelect
                      id="outlined-basic"
                      size="small"
                      listToDisplay={[
                        { value: 1, name: 1 },
                        { value: 2, name: 2 },
                        { value: 3, name: 3 },
                      ]}
                      label={translatedOutPutLabels}
                      handleChange={handleOuputNumber}
                      value={outputNumber}
                    />
                  </div>

                  {session?.user?.isOnFreeAccess === 1 &&
                    session?.wordsTotalConsumption?.userTotalConsumption <
                      FREE_LIMIT_NUMBER_OF_WORDS && (
                      <div>
                        <Button
                          onClick={(e) => sendDataToBackEnd()}
                          className={classes.button}
                          variant="contained"
                          size="small"
                          endIcon={<ArrowRightAltIcon />}
                        >
                          <FormattedMessage
                            id="compo.text.button.generateAIContent"
                            defaultMessage="Generate AI Content"
                          />
                        </Button>
                      </div>
                    )}
                  {session?.user?.isOnFreeAccess === 1 &&
                    session?.wordsTotalConsumption?.userTotalConsumption >
                      FREE_LIMIT_NUMBER_OF_WORDS && (
                      <div>
                        <Button
                          onClick={(e) => sendDataToBackEnd()}
                          className={classes.button}
                          variant="contained"
                          size="small"
                          disabled
                        >
                          <FormattedMessage
                            id="compo.text.quotaReached"
                            defaultMessage="Free Quota limit reached"
                          />
                        </Button>
                      </div>
                    )}
                </div>
              </div>
            }
          </div>
          <div className={styles.rightDiv}>
            {isLoadingAPIResults && (
              <div className="global-white-background marginTop20">
                <div className={styles.loaderContainer}>
                  <div className={styles.loaderElements}>
                    <CircularIndeterminate size={50} />
                    <div className={styles.loaderParagraphs}>
                      <p>
                        <FormattedMessage
                          id="compo.heartWorkPlace.loading.pleaseWait"
                          defaultMessage="Loading ..."
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!isLoadingAPIResults && AIResults.length === 0 && (
              <div>
                <p className={styles.noResults}>
                  <FormattedMessage
                    id="compo.text.noResults"
                    defaultMessage="Results will be displayed here."
                  />
                </p>
              </div>
            )}
            {AIResults.map((result) => (
              <AIResultV2
                currentText={result.currentText}
                timeSinceGeneration={result.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
