import { Link } from "react-router-dom";

import style from "../../styles/Footer.module.css";
import logo from "../../images/logo.png";
import { ROUTES } from "../../utils/routes";

const Footer = () => {
  return (
    <section className={style.footer}>
      <Link to={ROUTES.HOME}>
        <img src={logo} alt="stuff" />
      </Link>
      <div className={style.creater}>
        Created by <span className={style.creater_name}> Anton </span>
      </div>
      <div className={style.socials}>
        <a href="https://www.youtube.com/watch?v=GV2kjdNV0u4&list=RDMM&index=12&ab_channel=Sabaton-Topic">
          <svg className={style.icon_youtube}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
          </svg>
        </a>
        <a href="facebook.com">
          <svg className={style.icon_facebook}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
          </svg>
        </a>
        <a href="http://instagram.com">
          <svg className={style.icon_inst}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Footer;
