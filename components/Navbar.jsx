import React from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div>
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.menuElements}>
            <div className={styles.leftNavbar}>
              <Link href="/">
                <a>
                  <span>CURSIFY</span>
                </a>
              </Link>
            </div>
            <ul>
              <li>
                <Link href="/login">
                  <a>Get Started</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
