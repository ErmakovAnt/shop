import { useEffect, useRef, useState } from "react";
import style from "../../styles/Products.module.css";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Products = ({ product = [], title, newStyle, id }) => {
  const [offset, setOffset] = useState(5);
  const prevPropsRef = useRef(null);

  useEffect(() => {
    prevPropsRef.current = id;
  });

  const prevProps = prevPropsRef.current;

  useEffect(() => {
    if (prevProps !== id) {
      setOffset(5);
    }
  }, [id, prevProps]);

  let limitedList = product.filter((_, i) => i < offset);

  return (
    <section className={style.products} style={newStyle}>
      <h2 className={style.title}>{title}</h2>
      <TransitionGroup className={style.goods_wrapper}>
        {limitedList.map(({ id, image, price, title, category, rating }) => (
          <CSSTransition timeout={300} classNames="my-node" key={id}>
            <Link to={`/product/${id}`} className={style.goods}>
              <div
                className={style.image}
                style={{ backgroundImage: `url(${image})` }}
              />
              <div className={style.info}>
                <div>
                  <h2 className={style.head}>
                    {title.split(" ").length >= 7
                      ? title.split(" ").slice(0, 7).join(" ")
                      : title}
                  </h2>
                  <div className={style.category}>{category}</div>
                </div>

                <div className={style.a}>
                  <div className={style.prices}>
                    <div className={style.price}>${price}</div>
                    <div className={style.oldPrice}>
                      ${Math.ceil(price * 1.5)}
                    </div>
                  </div>
                  <div className={style.rate}>Rate: {rating.rate}</div>
                </div>
              </div>
            </Link>
          </CSSTransition>
        ))}
      </TransitionGroup>

      {offset > limitedList.length ? (
        <div style={{ color: "#ffffff", marginTop: 20 }}>
          There is no more goods
        </div>
      ) : (
        <button
          className={style.button}
          onClick={() => {
            setOffset((offset) => offset + 5);
          }}
        >
          See more
        </button>
      )}
    </section>
  );
};
export default Products;
