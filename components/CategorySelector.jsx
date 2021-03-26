import React from "react";
import Link from "next/link";
import styles from "../styles/Category.module.css";

const CategorySelector = ({ handleSelectCategory }) => {
  return (
    <div className={styles.container}>
      <h2>Select your category</h2>
      <h3>Most Popular</h3>
      <div className={styles.categoryPropositionsContainer}>
        <p>Product Description</p>
        <p>Value Proposition</p>
        <p>Blog Title</p>
        <p>Instagram Caption</p>
        <p>Blog Intro</p>
      </div>
    </div>
  );
};

export default CategorySelector;
