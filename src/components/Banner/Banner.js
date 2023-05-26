import style from "../../styles/Banner.module.css";
import shoe from "../../images/shoe.png";
import psp from "../../images/psp.png";

const Banner = () => {
  return (
    <section className={style.banner}>
      <div className={style.wrapper}>
        <div className={style.title}>
          NEW YEAR <span>SALE</span>
        </div>
        <div className={style.shoeImg}>
          <img src={shoe} alt="shoe" />
        </div>
        <div className={style.pspImg}>
          <img src={psp} alt="psp" />
        </div>
        <button className={style.button}>See more</button>
      </div>
      <div className={style.bannerImg}>
        <div className={style.sale}>
          save up to <span>50%</span> off
        </div>
      </div>
    </section>
  );
};

export default Banner;
