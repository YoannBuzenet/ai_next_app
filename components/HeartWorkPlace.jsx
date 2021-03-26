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
      <div>
        <h2>{categoryObject?.name}</h2>
        <div className={style.formContainer}>
          {categoryObject.inputs.map((input, index) => (
            <div key={index}>
              <TextField
                label={input.label}
                placeholder={input.placeholder}
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
