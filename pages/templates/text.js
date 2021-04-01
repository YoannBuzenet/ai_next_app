import { useContext } from "react";
import SelectedCategoryId from "../../contexts/selectedCategoryContext";

export default function text() {
  const { selectedCategoryID, setSelectedCategoryID } = useContext(
    SelectedCategoryId
  );

  console.log("category selected", selectedCategoryID);
  return <>text</>;
}
