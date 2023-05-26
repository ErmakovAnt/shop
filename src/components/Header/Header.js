import style from "../../styles/Header.module.css";
import logo from "../../images/logo.png";
import vector from "../../images/Vector.png";
import search from "../../images/search.svg";

import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../features/users/userSlice";
import { useState } from "react";

const Header = () => {
  const [searchValue, setsearchValue] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    showForm,
    currentUser: { name, avatar },
    cart,
  } = useSelector(({ user }) => user);

  const handleClick = () => {
    if (!name) dispatch(toggleForm(!showForm));
    else {
      navigate(ROUTES.PROFILE);
    }
  };

  const { list, isLoading } = useSelector(({ products }) => products);
  const handleSearch = ({ target: { value } }) => {
    setsearchValue(value);
  };

  const searchedProduct = list.filter((prod) =>
    prod.title.includes(searchValue)
  );

  return (
    <div className={style.header}>
      <Link to={ROUTES.HOME}>
        <img src={logo} alt="stuff" />
      </Link>
      <div className={style.info}>
        <div className={style.user} onClick={handleClick}>
          <img src={avatar ? avatar : vector} alt="user" />
          <div className={style.username}> {name ? name : "Guest"}</div>
        </div>
      </div>
      <form className={style.form}>
        <div className={style.search_logo}>
          <img src={search} alt="search" />
        </div>
        <div className={style.input}>
          <input
            type="search"
            name="search"
            autoComplete="off"
            placeholder="Search for anything..."
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        {searchValue && (
          <div className={style.box}>
            {isLoading
              ? "Loading"
              : !searchedProduct.length
              ? "No results"
              : searchedProduct.map(({ id, title, image }) => {
                  return (
                    <Link
                      to={`/product/${id}`}
                      key={id}
                      className={style.link}
                      onClick={() => setsearchValue("")}
                    >
                      <div
                        className={style.image}
                        style={{ backgroundImage: `url(${image})` }}
                      ></div>
                      <div>{title}</div>
                    </Link>
                  );
                })}
          </div>
        )}
      </form>
      <div className={style.account}>
        <Link to={ROUTES.FAVORITES}>
          <svg className={style.icon_fav}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
          </svg>
        </Link>
        <Link to={ROUTES.CART} className={style.cart}>
          <svg className={style.icon_cart}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
          </svg>
          <span className={style.count}>
            {cart.reduce((acc, { quantity }) => acc + quantity, 0)}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
