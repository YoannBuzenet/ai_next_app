import style from "../styles/HeartWorkPlace.module.css";
import TextField from "@material-ui/core/TextField";

const HeartWorkPlace = ({
  categoryObject,
  selectedCategory,
  sendDataToBackEnd,
  userInputs,
  setUserInputs,
}) => {
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
                InputProps={{ style: { fontSize: 20 } }} // font size of input text
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
        </div>
        <button type="button" onClick={sendDataToBackEnd}>
          Create
        </button>
      </div>
    );
  }
};

export default HeartWorkPlace;
