import styles from "../styles/AIResultV2.module.css";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import { DateTime } from "luxon";

const AIResultV2 = ({ currentText, timeSinceGeneration }) => {
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
      <p className={styles.mainText}>API result</p>
    </div>
  );
};

export default AIResultV2;
