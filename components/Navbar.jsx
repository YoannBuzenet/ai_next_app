import React from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useSession, getSession } from "next-auth/client";
import UserCheck from "../services/userCheck";
import AppLangChoice from "./appSetLang/AppLangChoice";
import { FormattedMessage } from "react-intl";

const Navbar = () => {
  const [session, loading] = useSession();

  return (
    <div>
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.menuElements}>
            <div className={styles.leftNavbar}>
              <div className={styles.navLink}>
                <Link href={"/"}>
                  <a>
                    <p>CURSIFY</p>
                  </a>
                </Link>
              </div>
              {UserCheck.isUserLogged(session?.user?.isLoggedUntil) && (
                <div className={styles.navLink}>
                  <Link href={"/templates"}>
                    <a>
                      <p>Templates</p>
                    </a>
                  </Link>
                </div>
              )}
            </div>
            <div className={styles.rightNavBar}>
              {!UserCheck.isUserLogged(session?.user?.isLoggedUntil) && (
                <div className={styles.navLink}>
                  <Link href="/login">
                    <a>
                      <p>
                        <FormattedMessage
                          id="navbar.menu.signin"
                          defaultMessage="Sign In"
                        />
                      </p>
                    </a>
                  </Link>
                </div>
              )}
              {UserCheck.isUserLogged(session?.user?.isLoggedUntil) && (
                <div className={styles.navLink}>
                  <Link href="/myAccount">
                    <a>
                      <p>
                        <FormattedMessage
                          id="navbar.menu.myAccount"
                          defaultMessage="My Account"
                        />
                      </p>
                    </a>
                  </Link>
                </div>
              )}

              <div className={styles.navbarFlags}>
                <AppLangChoice top="13" marginLeft="20" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
