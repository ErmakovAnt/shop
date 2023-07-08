import { Link } from "react-router-dom";
import style from "../../styles/Categories.module.css";

const Categories = ({ categories, title }) => {
  return (
    <section className={style.categories}>
      <h2 className={style.header}>{title}</h2>
      <div className={style.wrapper}>
        {categories.map((cat) => (
          <Link
            to={`/categories/${cat.name}`}
            key={cat._id}
            className={style.link}
          >
            <div
              className={style.image}
              style={{ backgroundImage: `url(${cat.image})` }}
            />
            <div className={style.name}>{cat.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
