import style from "../styles/HeartWorkPlace.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
}) => {
  const classes = useStyles();

  console.log("categoryObject", categoryObject);
  if (categoryObject === null) {
    return (
      <div className={style.noCategoryDiv}>
        <p>Welcome on Cursify !</p>
        <p>Please choose a category.</p>
      </div>
    );
  } else {
    return (
      <div className={style.rightDivContainer}>
        <div className={style.categoryTitle}>
          <h2>{categoryObject?.name}</h2>
        </div>
        <div className={style.formContainer}>
          {categoryObject.inputs.map((input, index) => (
            <div key={index} className={style.oneInput}>
              <p>{input.label}</p>
              <TextField
                InputProps={{ style: { fontSize: 20 } }}
                placeholder={input.placeholder}
                value={userInputs?.[input.name] || ""}
                onChange={(e) =>
                  setUserInputs({ ...userInputs, [input.name]: e.target.value })
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
      </div>
    );
  }
};

export default HeartWorkPlace;
