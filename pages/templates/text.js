import { useContext, useState } from "react";
import SelectedCategoryId from "../../contexts/selectedCategoryContext";
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

export default function Text() {
  const intl = useIntl();
  const { selectedCategoryID, setSelectedCategoryID } = useContext(
    SelectedCategoryId
  );
  const [userInputs, setUserInputs] = useState({});
  const [AIResults, setAIResults] = useState([
    { content: "test", date: DateTime.now().setLocale("en") },
  ]);
  const [outputNumber, setOutputNumber] = useState(3);
  const [isLoadingAPIResults, setIsLoadingAPIResults] = useState(false);
  const [langSelected, setLangSelected] = useState("en-US");
  const [session, loading] = useSession();

  const handleOuputNumber = (e) => {
    let numberToSet;
    const number = parseInt(e.target.value);
    if (e.target.value === "") {
      numberToSet = "";
    } else if (isNaN(number)) {
      numberToSet = 1;
    } else {
      numberToSet = number;
    }
    setOutputNumber(numberToSet);
  };

  const sendDataToBackEnd = async () => {
    setIsLoadingAPIResults(true);
    setAIResults([]);
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
      lang: langSelected,
      user: session.user,
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
        setAIResults([...resultsWithDates]);
        setIsLoadingAPIResults(false);
      })
      .catch((err) => {
        console.log("error after posting to next", err);
        setIsLoadingAPIResults(false);
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
    <div>
      <div className="container80 TextZone">
        <div className={styles.headlineContainer}>
          <div className={styles.headlinePicture}>image</div>
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
                        onChange={(e) =>
                          setUserInputs({
                            ...userInputs,
                            [input.name]: e.target.value,
                          })
                        }
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
                  <div
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
                      Outputs
                    </span>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      onChange={handleOuputNumber}
                      value={outputNumber}
                    />
                  </div>
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
              </div>
            }
          </div>
          <div className={styles.rightDiv}>
            {AIResults.length === 0 && (
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
                currentText={result.content}
                timeSinceGeneration={result.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
