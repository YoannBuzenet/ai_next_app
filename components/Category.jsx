import React from "react";
import Link from "next/link";
import styles from "../styles/Category.module.css";

const Category = ({ name, categoryID, handleClick }) => {
  return <p onClick={(e) => handleClick(categoryID)}>{name}</p>;
};

export default Category;
