import React from "react";
import Breadcrumb from "../../../components/admin/Breadcrumb";
import styles from "../../../styles/admin/user.module.css";
import { pathlvl2User } from "../../../definitions/breadcrumb";

const User = () => {
  return (
    <div className="container">
      <main className={styles.main}>
        <Breadcrumb listOfPath={pathlvl2User} />
        User
      </main>
    </div>
  );
};

export default User;
