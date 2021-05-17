import React from "react";
import styles from "../../styles/admin/breadcrumb.module.css";
import Link from "next/link";

const Breadcrumb = ({ listOfPath = [] }) => {
  return (
    <div>
      <div className={styles.breadcrumbContainer}>
        <ul>
          {listOfPath.map((path, index) => {
            return (
              <>
                <li>
                  <Link href={path.href}>
                    <a>{path.name}</a>
                  </Link>
                </li>
                {index !== listOfPath.length - 1 && <p>&gt;</p>}
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;
