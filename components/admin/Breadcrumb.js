import React from "react";
import styles from "../../styles/admin/breadcrumb.module.css";
import Link from "next/link";

const Breadcrumb = () => {
  return (
    <div>
      <div className={styles.breadcrumbContainer}>
        <ul>
          <li>
            <Link href={"/"}>
              <a>Something</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;
