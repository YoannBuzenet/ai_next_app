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
import Head from "next/head";
import errorHandling from "../../services/errorHandling";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("session from server", session);
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
    return { props: { session } };
  }
}

export default function Text(props) {
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
  // We will count the number of request on that page with this state
  const [resultSerie, setResultSerie] = useState(0);

  const isSubbed =
    UserCheck.isUserSubscribed(props.session?.user?.isSubscribedUntil) ||
    UserCheck.isUserSubscribed(session?.user?.isSubscribedUntil);

  const isUserOnFreeAccess =
    props.session?.user?.isOnFreeAccess === 1 ||
    session?.user?.isOnFreeAccess === 1;

  console.log("session front", session);
  console.log("is subbed", isSubbed);
  console.log(
    "session?.user?.isOnFreeAccess === 1",
    session?.user?.isOnFreeAccess === 1
  );
  console.log(
    "session?.wordsTotalConsumption?.userTotalConsumption",
    session?.user?.totalWordsConsumption
  );
  console.log(
    "limit dépassée ?",
    session?.user?.totalWordsConsumption > FREE_LIMIT_NUMBER_OF_WORDS
  );

  // TRANSLATIONS
  const translatedInfoLess2000WordsMessage = intl.formatMessage({
    id: "notification.remainingConsoUnder2000words",
    defaultMessage:
      "There are less than 2,000 words remaining in your credit this month. If needed, you can purchase additional credits in My Account.",
  });
  const translatedInfoLess2000WordsMessageFreeTrial = intl.formatMessage({
    id: "notification.remainingConsoUnder2000wordsFreeTrial",
    defaultMessage:
      "You have less than 2,000 words left to use this month. If necessary, you can subscribe via the Pricing page.",
  });
  const translatedInfonoMoreCreditMessage = intl.formatMessage({
    id: "notification.remainingConsoat0",
    defaultMessage:
      "All your credits have been used this month. If needed, you can purchase additional credits in My Account.",
  });
  const translatedInfonoMoreCreditMessageFreeTrial = intl.formatMessage({
    id: "notification.remainingConsoat0.FreeTrial",
    defaultMessage:
      "You have no more words to use. If you like the service, you can subscribe via the Pricing page!",
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
  const translatedInputnoIdea = intl.formatMessage({
    id: "compo.text.notification.0output",
    defaultMessage:
      "Oops ! AI could not find any relevant idea. Could you try to enter more text or rephrase your words ?",
  });

  const translatedHead = intl.formatMessage({
    id: "compo.text.head.title",
    defaultMessage: "Let's get creative !",
  });

  useEffect(() => {
    if (!isSubbed && !isUserOnFreeAccess) {
      return;
    }
    // User arrives at the end of its free trial
    if (
      isUserOnFreeAccess &&
      FREE_LIMIT_NUMBER_OF_WORDS - props?.session?.user?.totalWordsConsumption <
        2000
    ) {
      setNotificationInfo({
        ...notificationInfo,
        alert: {
          ...notificationInfo.alert,
          message: translatedInfoLess2000WordsMessageFreeTrial,
          severity: "info",
        },
        snackbar: {
          ...notificationInfo.snackbar,
          isDisplayed: true,
        },
      });
    }
    // User ended free trial
    else if (
      isUserOnFreeAccess &&
      FREE_LIMIT_NUMBER_OF_WORDS - props?.session?.user?.totalWordsConsumption <
        0
    ) {
      setNotificationInfo({
        ...notificationInfo,
        alert: {
          ...notificationInfo.alert,
          message: translatedInfonoMoreCreditMessageFreeTrial,
          severity: "info",
        },
        snackbar: {
          ...notificationInfo.snackbar,
          isDisplayed: true,
        },
      });
    }
    // User arrived at the end of its paid subscription amount
    else if (
      props?.session?.user?.totalMaxWordsUserThisMonth -
        props?.session?.user?.consumptionThisMonth <=
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
    }
    // User arrived at less than 2000 words of credit
    else if (
      props?.session?.user?.totalMaxWordsUserThisMonth -
        props?.session?.user?.consumptionThisMonth <
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
  }, [props?.session?.user?.monthlyWordsConsumption]);

  const handleOuputNumber = (value) => {
    setOutputNumber(value);
  };

  const passLangSelectedToUserContext = (value) => {
    setUserContext({ ...userContext, langSelected: value });
  };

  const handleChangeInputs = (e, input) => {
    console.log("e.target.value", e.target.value);
    console.log("input", input);

    const userInput = e.target.value;
    let finalInput = userInputs?.[input.name];

    setUserInputs({
      ...userInputs,
      [input.name]: userInput,
    });
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
        const resultsWithDates = resp.data.response.map((result, index) => ({
          currentText: result,
          date: DateTime.now().setLocale("en"),
          resultSerie,
          indexCreation: index,
        }));
        const wasAllAIOutputFiltered = resp.data.wasAllAIOutputFiltered;

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
        } else if (
          array.isArray(resp?.data?.response) &&
          resp.data.response.length === 0
        ) {
          setNotificationInfo({
            ...notificationInfo,
            alert: {
              ...notificationInfo.alert,
              message: translatedInputnoIdea,
              severity: "info",
            },
            snackbar: {
              ...notificationInfo.snackbar,
              isDisplayed: true,
            },
          });
        }

        console.log("result with dates", resultsWithDates);
        setAIResults([...resultsWithDates, ...AIResults]);
        setResultSerie(resultSerie + 1);
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

  const areThereErrorsInFields =
    categoryObject.inputs.filter(
      (input) => userInputs?.[input.name]?.length > input.maxLengthInput
    ).length > 0;

  const classes = useStyles();
  return (
    <>
      <Head>
        <title>{translatedHead}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
                          error={
                            userInputs?.[input.name]?.length >
                            input.maxLengthInput
                          }
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
                    <div className="selectContainer outputLanguage">
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
                    {/* User is subscribed and has words left or user is on free access and has words left*/}
                    {((isUserOnFreeAccess &&
                      props.session?.user?.totalWordsConsumption <
                        FREE_LIMIT_NUMBER_OF_WORDS) ||
                      (isSubbed &&
                        (props.session?.user?.consumptionThisMonth || 0) <=
                          props.session?.user?.totalMaxWordsUserThisMonth)) && (
                      <div>
                        <Button
                          onClick={(e) => sendDataToBackEnd()}
                          className={classes.button}
                          variant="contained"
                          size="small"
                          disabled={areThereErrorsInFields}
                          endIcon={<ArrowRightAltIcon />}
                        >
                          <FormattedMessage
                            id="compo.text.button.generateAIContent"
                            defaultMessage="Generate AI Content"
                          />
                        </Button>
                      </div>
                    )}
                    {/* User is subscribed but used everything */}
                    {isSubbed &&
                      (props.session?.user?.consumptionThisMonth || 0) >=
                        props.session?.user?.totalMaxWordsUserThisMonth && (
                        <div>
                          <Button
                            onClick={(e) => sendDataToBackEnd()}
                            className={classes.button}
                            variant="contained"
                            size="small"
                            disabled
                            endIcon={<ArrowRightAltIcon />}
                          >
                            <FormattedMessage
                              id="compo.text.paidQuotReached"
                              defaultMessage="Monthly Quota reached"
                            />
                          </Button>
                        </div>
                      )}
                    {/* User is on Free Access but used everything */}
                    {isUserOnFreeAccess &&
                      props.session?.user?.totalWordsConsumption >
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
              {AIResults.map((result, index) => (
                <AIResultV2
                  currentText={result.currentText}
                  timeSinceGeneration={result.date}
                  index={index}
                  resultSerie={result.resultSerie}
                  constructedId={`${result.resultSerie}${result.indexCreation}`}
                  key={`${result.resultSerie}${result.indexCreation}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
