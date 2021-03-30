import React from "react";
import Link from "next/link";
import styles from "../styles/CategorySelector.module.css";
import Category from "./Category";
import { useIntl, FormattedMessage } from "react-intl";

const CategorySelector = ({ handleSelectCategory, resetUserInputs }) => {
  const intl = useIntl();

  const translatedCategory1 = intl.formatMessage({
    id: "categories.id1.categorylabel",
    defaultMessage: "Product Description",
  });
  const translatedCategory2 = intl.formatMessage({
    id: "categories.id2.categorylabel",
    defaultMessage: "Value Proposition",
  });
  const translatedCategory3 = intl.formatMessage({
    id: "categories.id3.categorylabel",
    defaultMessage: "Blog Title",
  });
  const translatedCategory4 = intl.formatMessage({
    id: "categories.id4.categorylabel",
    defaultMessage: "Instagram Caption",
  });
  const translatedCategory5 = intl.formatMessage({
    id: "categories.id5.categorylabel",
    defaultMessage: "Blog Intro",
  });

  return (
    <div className={styles.container}>
      <h2>
        <FormattedMessage
          id="compo.CategorySelector.selectCategory"
          defaultMessage="Select your category"
        />
      </h2>
      <h3>
        <FormattedMessage
          id="compo.CategorySelector.mostPopular"
          defaultMessage="Most Popular"
        />
      </h3>
      <div className={styles.categoryPropositionsContainer}>
        <Category
          name={translatedCategory1}
          categoryID={1}
          handleClick={handleSelectCategory}
          resetUserInputs={resetUserInputs}
        />
        <Category
          name={translatedCategory2}
          categoryID={2}
          handleClick={handleSelectCategory}
          resetUserInputs={resetUserInputs}
        />
        <Category
          name={translatedCategory3}
          categoryID={3}
          handleClick={handleSelectCategory}
          resetUserInputs={resetUserInputs}
        />
        <Category
          name={translatedCategory4}
          categoryID={4}
          handleClick={handleSelectCategory}
          resetUserInputs={resetUserInputs}
        />
        <Category
          name={translatedCategory5}
          categoryID={5}
          handleClick={handleSelectCategory}
          resetUserInputs={resetUserInputs}
        />
      </div>
    </div>
  );
};

export default CategorySelector;
