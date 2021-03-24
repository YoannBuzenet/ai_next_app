import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="menu-elements">
            <div className="left-navbar">
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
