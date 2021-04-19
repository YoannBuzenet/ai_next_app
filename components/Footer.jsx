import style from "../styles/Footer.module.css";
import { FormattedMessage } from "react-intl";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footerContent}>
          <div>
            <p>
              <Link href="/termsAndConditions">
                <a>
                  <FormattedMessage
                    id="footer.termsAndConditions"
                    defaultMessage="Terms and Conditions"
                  />
                </a>
              </Link>
            </p>
            <p>
              <Link href="/privacyPolicy">
                <a>
                  <FormattedMessage
                    id="footer.privacyPolicy"
                    defaultMessage="Privacy Policy"
                  />
                </a>
              </Link>
            </p>
          </div>
          <div>
            <p>
              <FormattedMessage
                id="footer.copyright"
                defaultMessage="© 2021 EasyFlow, Inc. All rights reserved."
              />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
