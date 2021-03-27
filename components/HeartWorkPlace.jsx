import style from "../styles/HeartWorkPlace.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularIndeterminate from "./Loader";

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

  let isOneUserInputTooShort = false;
  for (const oneInput in userInputs) {
    if (userInputs[oneInput].length < 20) {
      isOneUserInputTooShort = true;
    }
  }
  console.log("categoryObject", categoryObject);
  if (categoryObject === null) {
    return (
      <div className={style.noCategoryDiv}>
        <h1>Welcome on Cursify</h1>
        <p>Please select a category to get started !</p>
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
            {categoryObject.inputs.map((input, index) => (
              <div key={index} className={style.oneInput}>
                <p>{input.label}</p>
                <TextField
                  InputProps={{ style: { fontSize: 20 } }}
                  placeholder={input.placeholder}
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
            ))}
            <Button
              onClick={sendDataToBackEnd}
              className={classes.button}
              variant="contained"
              size="large"
            >
              Create
            </Button>
          </div>
        )}
        {isLoadingAPIResults && (
          <div className="global-white-background marginTop20">
            <div className={style.loaderContainer}>
              <div className={style.loaderElements}>
                <CircularIndeterminate size={150} />
                <div className={style.loaderParagraphs}>
                  <p>Please wait ...</p>
                  <p>Our computers are working for you !</p>
                  {isOneUserInputTooShort && (
                    <p className={style.proTip}>
                      Protip to get better results : try adding more words
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
