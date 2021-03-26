import React from "react";
import Link from "next/link";
import styles from "../styles/Category.module.css";
import Category from "./Category";

const CategorySelector = ({ handleSelectCategory }) => {
  return (
    <div className={styles.container}>
      <h2>Select your category</h2>
      <h3>Most Popular</h3>
      <div className={styles.categoryPropositionsContainer}>
        <Category name="Product Description" categoryID={1} />
        <Category name="Value Proposition" categoryID={2} />
        <Category name="Blog Title" categoryID={3} />
        <Category name="Instagram Caption" categoryID={4} />
        <Category name="Blog Intro" categoryID={5} />
      </div>
    </div>
  );
};

export default CategorySelector;
