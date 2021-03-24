import style from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footerContent}>
          <span>© 2021 Cursify, Inc. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
