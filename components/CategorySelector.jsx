import React from "react";
import Link from "next/link";
import styles from "../styles/CategorySelector.module.css";
import Category from "./Category";

const CategorySelector = ({ handleSelectCategory, resetUserInputs }) => {
  return (
    <div className={styles.container}>
      <h2>Select your category</h2>
      <h3>Most Popular</h3>
      <div className={styles.categoryPropositionsContainer}>
        <Category
          name="Product Description"
          categoryID={1}
          handleClick={handleSelectCategory}
          resetUserInputs={resetUserInputs}
        />
        <Category
          name="Value Proposition"
          categoryID={2}
          handleClick={handleSelectCategory}
          resetUserInputs={resetUserInputs}
        />
        <Category
          name="Blog Title"
          categoryID={3}
          handleClick={handleSelectCategory}
          resetUserInputs={resetUserInputs}
        />
        <Category
          name="Instagram Caption"
          categoryID={4}
          handleClick={handleSelectCategory}
          resetUserInputs={resetUserInputs}
        />
        <Category
          name="Blog Intro"
          categoryID={5}
          handleClick={handleSelectCategory}
          resetUserInputs={resetUserInputs}
        />
      </div>
    </div>
  );
};

export default CategorySelector;
