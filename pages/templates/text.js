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

export default function Text() {
  const intl = useIntl();
  const { selectedCategoryID, setSelectedCategoryID } = useContext(
    SelectedCategoryId
  );
  const [userInputs, setUserInputs] = useState({});
  const [AIResults, setAIResults] = useState([]);

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
                    />
                  </div>
                  <Button
                    onClick={(e) => console.log("sending data to back end")}
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
              <AIResultV2 />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
