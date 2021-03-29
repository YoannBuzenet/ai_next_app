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
                    <a>
                      <FormattedMessage
                        id="navbar.menu.signin"
                        defaultMessage="Sign In"
                      />
                    </a>
                  </Link>
                </li>
              )}
              {UserCheck.isUserLogged(session?.user?.isLoggedUntil) && (
                <li>
                  <Link href="/myAccount">
                    <a>
                      <FormattedMessage
                        id="navbar.menu.myAccount"
                        defaultMessage="My Account"
                      />
                    </a>
                  </Link>
                </li>
              )}
              <li>
                <AppLangChoice />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
