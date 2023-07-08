import { useDispatch, useSelector } from "react-redux";

import style from "../../styles/Cart.module.css";
import {
  addItemToCart,
  postCart,
  removeItemFromCart,
  removeAllItemsFromCart,
} from "../../features/users/userSlice";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Cart = () => {
  const { cart } = useSelector(({ user }) => user);
  const dispath = useDispatch();

  const changeQuantity = (item, quantity) => {
    dispath(addItemToCart({ ...item, quantity }));
  };

  const removeProduct = (item) => {
    dispath(removeItemFromCart(item));
  };

  const addProduct = () => {
    const data = {
      date: Date(),
      products: cart.map((item) => {
        return { productId: item.id, quantity: item.quantity };
      }),
    };
    dispath(postCart(data));
    console.log(data);
    dispath(removeAllItemsFromCart());
  };

  return (
    <section className={style.cart}>
      <div className={style.header}>Your cart</div>
      <TransitionGroup>
        {cart.map((item) => {
          const { images = [], id, title, category, price, quantity } = item;
          return (
            <CSSTransition timeout={300} classNames="my-node" key={id}>
              <div className={style.wrapper}>
                <div className={style.info}>
                  <div
                    className={style.image}
                    style={{
                      backgroundImage: `url(${images[0]})`,
                    }}
                  />
                  <div className={style.itemInfo}>
                    <div className={style.title}>{title}</div>
                    <div className={style.category}>{category.name}</div>
                  </div>
                </div>
                <div className={style.price}>{price}$</div>
                <div className={style.counter}>
                  <div
                    className={style.decrement}
                    onClick={() => {
                      changeQuantity(item, Math.max(1, quantity - 1));
                    }}
                  >
                    -
                  </div>
                  <div className={style.count}>{quantity}</div>
                  <div
                    className={style.increment}
                    onClick={() => {
                      changeQuantity(item, quantity + 1);
                    }}
                  >
                    +
                  </div>
                </div>
                <div className={style.endPrice}>{price * quantity}$</div>
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
      <div className={style.footer}>
        <div className={style.totalPrice}>
          TOTAL PRICE :{" "}
          {cart
            .reduce((acc, item) => {
              return acc + item.price * item.quantity;
            }, 0)
            .toFixed(2)}
          $
        </div>
        <button
          onClick={() => {
            addProduct();
          }}
        >
          Proceed to checkout
        </button>
      </div>
    </section>
  );
};

export default Cart;
