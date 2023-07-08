import { NavLink } from "react-router-dom";
import style from "../../styles/Sidebar.module.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { list } = useSelector(({ categories }) => categories);

  return (
    <section className={style.sidebar}>
      <div>
        <h2>Categories</h2>
        <ul className={style.list}>
          {list.map((item, _id) => (
            <li key={_id} style={{ marginTop: 12 }}>
              <NavLink
                className={({ isActive }) =>
                  `${style.link} ${isActive ? style.active : ""}`
                }
                to={`/categories/${item.name}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className={style.info}>
        <a href="/help" className={style.link}>
          Help
        </a>
        <a
          href="/help"
          className={style.link}
          style={{ textDecoration: "underline" }}
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
