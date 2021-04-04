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
              <Link href={"/"}>
                <div className={styles.navLink}>
                  <a>
                    <p>CURSIFY</p>
                  </a>
                </div>
              </Link>
              {UserCheck.isUserLogged(session?.user?.isLoggedUntil) && (
                <Link href={"/templates"}>
                  <div className={styles.navLink}>
                    <a>
                      <p>Templates</p>
                    </a>
                  </div>
                </Link>
              )}
            </div>
            <div className={styles.rightNavBar}>
              {!UserCheck.isUserLogged(session?.user?.isLoggedUntil) && (
                <Link href="/login">
                  <div className={styles.navLink}>
                    <a>
                      <p>
                        <FormattedMessage
                          id="navbar.menu.signin"
                          defaultMessage="Sign In"
                        />
                      </p>
                    </a>
                  </div>
                </Link>
              )}
              {UserCheck.isUserLogged(session?.user?.isLoggedUntil) && (
                <Link href="/myAccount">
                  <div className={styles.navLink}>
                    <a>
                      <p>
                        <FormattedMessage
                          id="navbar.menu.myAccount"
                          defaultMessage="My Account"
                        />
                      </p>
                    </a>
                  </div>
                </Link>
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
