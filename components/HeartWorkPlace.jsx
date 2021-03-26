import style from "../styles/HeartWorkPlace.module.css";
import TextField from "@material-ui/core/TextField";

const HeartWorkPlace = ({
  categoryObject,
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
      <div>
        Workplace
        <div className={style.formContainer}>
          {categoryObject.inputs.map((input, index) => (
            <div key={index}>
              <TextField
                value={userInputs?.[input.name] || ""}
                onChange={(e) =>
                  setUserInputs({ ...userInputs, [input.name]: e.target.value })
                }
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
