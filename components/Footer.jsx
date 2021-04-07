import style from "../styles/Footer.module.css";
import { FormattedMessage } from "react-intl";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footerContent}>
          <span>
            <FormattedMessage
              id="footer.copyright"
              defaultMessage="© 2021 EasyFlow, Inc. All rights reserved."
            />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
