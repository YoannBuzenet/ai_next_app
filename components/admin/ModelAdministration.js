import React from "react";
import Link from "next/link";
import styles from "../../styles/admin/modelAdministration.module.css";

const ModelAdministration = ({ name, href }) => {
  return (
    <Link href={href}>
      <div className={styles.moduleAdminContainer}>
        <p>
          <a>{name}</a>
        </p>
      </div>
    </Link>
  );
};

export default ModelAdministration;
