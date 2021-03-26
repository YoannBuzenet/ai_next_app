import React from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useSession, getSession } from "next-auth/client";
import UserCheck from "../services/userCheck";

const Navbar = () => {
  const [session, loading] = useSession();

  return (
    <div>
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.menuElements}>
            <div className={styles.leftNavbar}>
              <Link
                href={
                  UserCheck.isUserLogged(session?.user?.isLoggedUntil)
                    ? "/workplace"
                    : "/"
                }
              >
                <a>
                  <span>CURSIFY</span>
                </a>
              </Link>
            </div>
            <ul>
              {!UserCheck.isUserLogged(session?.user?.isLoggedUntil) && (
                <li>
                  <Link href="/login">
                    <a>Get Started</a>
                  </Link>
                </li>
              )}
              {UserCheck.isUserLogged(session?.user?.isLoggedUntil) && (
                <li>
                  <Link href="/myAccount">
                    <a>My Account</a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
