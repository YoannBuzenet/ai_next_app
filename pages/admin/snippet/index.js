import React from "react";
import Breadcrumb from "../../../components/admin/Breadcrumb";
import styles from "../../../styles/admin/snippet.module.css";

const Snippet = () => {
  return (
    <div className="container">
      <main className={styles.main}>
        <Breadcrumb />
        Snippet
      </main>
    </div>
  );
};

export default Snippet;
