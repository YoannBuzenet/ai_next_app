import React from "react";
import Breadcrumb from "../../../components/admin/Breadcrumb";
import styles from "../../../styles/admin/category.module.css";
import { pathlvl2Category } from "../../../definitions/breadcrumb";

const Category = () => {
  return (
    <div className="container">
      <main className={styles.main}>
        <Breadcrumb listOfPath={pathlvl2Category} />
        Category
      </main>
    </div>
  );
};

export default Category;
