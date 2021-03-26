import React from "react";
import Link from "next/link";
import styles from "../styles/Category.module.css";

const Category = ({ name, categoryID, handleClick, resetUserInputs }) => {
  return (
    <p
      onClick={(e) => {
        handleClick(categoryID);
        resetUserInputs();
      }}
    >
      {name}
    </p>
  );
};

export default Category;
