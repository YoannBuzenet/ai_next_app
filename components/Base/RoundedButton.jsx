import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../styles/RoundedButton.module.css";

export default function RoundedButton({ isSelected, name, handleClick }) {
  const ColorButton = withStyles((theme) => ({
    root: {
      "&:hover": {},
    },
  }))(Button);

  return (
    <ColorButton
      color={isSelected ? "primary" : "default"}
      className={
        isSelected ? styles.selectedRoundedButton : styles.roundedButton
      }
      onClick={handleClick}
      variant="contained"
    >
      {name}
    </ColorButton>
  );
}
