import { useContext } from "react";
import SelectedCategoryId from "../../contexts/selectedCategoryContext";
import { categoriesDefinition } from "../../definitions/categories";
import styles from "../../styles/Text.module.css";

export default function Text() {
  const { selectedCategoryID, setSelectedCategoryID } = useContext(
    SelectedCategoryId
  );

  console.log("category selected", selectedCategoryID);
  return (
    <div className="genericBackground">
      <div className="container80">
        <div className={styles.textGeneratorContainer}>
          <div className={styles.leftDiv}>g</div>
          <div className={styles.rightDiv}>d</div>
        </div>
      </div>
    </div>
  );
}
