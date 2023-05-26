import { Link } from "react-router-dom";
import style from "../../styles/Categories.module.css";
import { categoryImg } from "../../utils/categoryImg";
const Categories = ({ categories = [], title }) => {
  return (
    <section className={style.categories}>
      <h2 className={style.header}>{title}</h2>
      <div className={style.wrapper}>
        {categories.map((cat, i) => (
          <Link to={`/categories/${cat}`} key={i} className={style.link}>
            <div
              className={style.image}
              style={{ backgroundImage: `url(${categoryImg[i]})` }}
            />
            <div className={style.name}>{cat}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
