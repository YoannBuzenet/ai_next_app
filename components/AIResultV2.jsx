import styles from "../styles/AIResultV2.module.css";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";

const AIResultV2 = ({ currentText, timeSinceGeneration, category }) => {
  let finalText;

  // the ugliest code ever
  // refactor with prop on DB if there is traction
  // change and follow text with a state
  if (category === 20) {
    let arrayOfBulletPoints = currentText.split("*");
    console.log("arrayOfBulletPoints"), arrayOfBulletPoints;

    // This is the most horrible code I've ever written
    const transformIntoLi = (array) =>
      array.map((element) =>
        element.length > 0 ? (
          <li className={styles.mainText}>{element}</li>
        ) : null
      );

    let bulletPoints = [];

    if (Array.isArray(arrayOfBulletPoints)) {
      bulletPoints = transformIntoLi(arrayOfBulletPoints);
    }

    finalText = <ul className={styles.list}>{bulletPoints}</ul>;
  } else {
    finalText = <p className={styles.mainText}>{currentText}</p>;
  }
  return (
    <div className={styles.oneResult}>
      <div className={styles.firstLine}>
        <div>
          <p>{timeSinceGeneration.toRelative()}</p>
        </div>
        <div className={styles.iconContainer}>
          <IconButton
            onClick={(e) => navigator.clipboard.writeText(currentText)}
          >
            <FileCopyIcon className={styles.icons} />
          </IconButton>
        </div>
      </div>
      {finalText}
    </div>
  );
};

export default AIResultV2;
