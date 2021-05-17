import React from "react";
import Breadcrumb from "../../../components/admin/Breadcrumb";
import styles from "../../../styles/admin/user.module.css";

const User = () => {
  return (
    <div className="container">
      <main className={styles.main}>
        <Breadcrumb />
        User
      </main>
    </div>
  );
};

export default User;
