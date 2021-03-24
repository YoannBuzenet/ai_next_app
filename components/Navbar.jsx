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
                  <span>MTG INTERFACE</span>
                </a>
              </Link>
            </div>
            <ul>
              <li>
                <Link href="/aboutUs">
                  <a>About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/getStarted">
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
