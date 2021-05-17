import React from "react";
import Breadcrumb from "../../../components/admin/Breadcrumb";
import styles from "../../../styles/admin/snippet.module.css";
import { pathlvl2Snippet } from "../../../definitions/breadcrumb";

const Snippet = () => {
  return (
    <div className="container">
      <main className={styles.main}>
        <Breadcrumb listOfPath={pathlvl2Snippet} />
        Snippet
      </main>
    </div>
  );
};

export default Snippet;
