import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { removeItemFromFavorites } from "../../features/users/userSlice";

import style from "../../styles/Cart.module.css";

const Favorites = () => {
  const { favorites } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const removeProduct = (item) => {
    dispatch(removeItemFromFavorites(item));
  };
  return (
    <section className={style.cart}>
      <div className={style.header}>Favorites</div>
      <TransitionGroup>
        {favorites.map((item) => {
          const { image, id, title, category, price } = item;
          return (
            <CSSTransition timeout={300} classNames="my-node" key={id}>
              <div className={style.wrapper}>
                <div className={style.info}>
                  <div
                    className={style.image}
                    style={{ background: `url(${image})` }}
                  />
                  <div className={style.itemInfo}>
                    <div className={style.title}>{title}</div>
                    <div className={style.category}>{category}</div>
                  </div>
                </div>
                <div className={style.price}>{price}$</div>
                <div
                  className={style.close}
                  onClick={() => {
                    removeProduct(item);
                  }}
                >
                  <svg className={style.icon_close}>
                    <use
                      xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                    />
                  </svg>
                </div>
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </section>
  );
};

export default Favorites;
