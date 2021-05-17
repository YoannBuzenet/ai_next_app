import React from "react";
import Breadcrumb from "../../../components/admin/Breadcrumb";
import styles from "../../../styles/admin/category.module.css";

const Category = () => {
  return (
    <div className="container">
      <main className={styles.main}>
        <Breadcrumb />
        Category
      </main>
    </div>
  );
};

export default Category;
