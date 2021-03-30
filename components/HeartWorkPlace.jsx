import style from "../styles/HeartWorkPlace.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularIndeterminate from "./Loader";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    fontWeight: 400,
    fontSize: 16,
    textTransform: "none",
    backgroundColor: "#477bde",
    "&:hover": {
      backgroundColor: "#1c64f2",
      boxShadow: "none",
    },
  },
}));

const HeartWorkPlace = ({
  categoryObject,
  selectedCategory,
  sendDataToBackEnd,
  userInputs,
  setUserInputs,
  isLoadingAPIResults,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  let isOneUserInputTooShort = false;
  for (const oneInput in userInputs) {
    if (userInputs[oneInput].length < 20) {
      isOneUserInputTooShort = true;
    }
  }

  if (categoryObject === null) {
    return (
      <div className={style.noCategoryDiv}>
        <h1>
          <FormattedMessage
            id="compo.heartWorkPlace.noCategory.title"
            defaultMessage="Welcome on Cursify"
          />
        </h1>
        <div className={style.explainationParagraphs}>
          <p>
            <FormattedMessage
              id="compo.heartWorkPlace.noCategory.paragraph1"
              defaultMessage="Please select a category on the left to get started."
            />
          </p>
          <p>
            <FormattedMessage
              id="compo.heartWorkPlace.noCategory.paragraph2"
              defaultMessage="Content will be fully AI generated."
            />
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.rightDivContainer}>
        <div className={style.categoryTitle}>
          <h2>{categoryObject?.name}</h2>
        </div>
        {!isLoadingAPIResults && (
          <div className={style.formContainer}>
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
                <div key={index} className={style.oneInput}>
                  <p>{translatedLabel}</p>
                  <TextField
                    InputProps={{ style: { fontSize: 20 } }}
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
                    multiline={input.inputType === "textarea" ? true : false}
                    rows={input.inputType === "textarea" ? 7 : 1}
                  />
                </div>
              );
            })}
            <Button
              onClick={sendDataToBackEnd}
              className={classes.button}
              variant="contained"
              size="large"
            >
              <FormattedMessage
                id="compo.heartWorkPlace.button.create"
                defaultMessage="Create"
              />
            </Button>
          </div>
        )}
        {isLoadingAPIResults && (
          <div className="global-white-background marginTop20">
            <div className={style.loaderContainer}>
              <div className={style.loaderElements}>
                <CircularIndeterminate size={150} />
                <div className={style.loaderParagraphs}>
                  <p>
                    <FormattedMessage
                      id="compo.heartWorkPlace.loading.pleaseWait"
                      defaultMessage="Please wait ..."
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      id="compo.heartWorkPlace.loading.computerAreWorking"
                      defaultMessage="Our computers are working for you !"
                    />
                  </p>
                  {isOneUserInputTooShort && (
                    <p className={style.proTip}>
                      <FormattedMessage
                        id="compo.heartWorkPlace.loading.proTipsAddMoreWords"
                        defaultMessage="Protip to get better results : try adding more words"
                      />
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default HeartWorkPlace;
