import style from "../../styles/Poster.module.css";

import computer from "../../images/computer.png";

const Poster = () => (
  <section className={style.poster}>
    <div className={style.title}>BIG SALE 20%</div>
    <div className={style.wrapper}>
      <div className={style.text}>
        <span className={style.subtitle}>the bestseller of 2022 </span>
        <h1 className={style.head}>LENNON r2d2 with NVIDIA 5090 TI</h1>
        <button className={style.button}>Shop Now</button>
      </div>
      <div className={style.computer}>
        <img src={computer} alt="computer" />
      </div>
    </div>
  </section>
);
export default Poster;
