import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProduct } from "../../features/product/singleProductSlice";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { getRelatedProducts } from "../../features/products/productSlice";
import {
  addItemToCart,
  addItemToFavorites,
  toggleForm,
} from "../../features/users/userSlice";

import Products from "../Products/Products";

import style from "../../styles/SingleProduct.module.css";

const SIZES = [4.5, 5, 5.5];

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    products: { related },
    product: { good },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getRelatedProducts(good.category));
    dispatch(getProduct(id));
  }, [dispatch, id, good.category]);

  return (
    <>
      <App good={good} />
      <Products product={related} title={"Related product"} />
    </>
  );
};

const App = ({ good }) => {
  const { image, title, price, description } = good;
  const { currentUser } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [currentSize, setCurrentSize] = useState("");

  const addToCart = () => {
    if (!currentUser.name) dispatch(toggleForm(true));
    dispatch(addItemToCart(good));
  };

  const addToFavorites = () => {
    dispatch(addItemToFavorites(good));
  };

  return (
    <section className={style.singleProduct}>
      <div className={style.leftPart}>
        <div
          className={style.picture}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className={style.columnPictures}>
          <div
            className={style.singlePicture}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            className={style.singlePicture}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            className={style.singlePicture}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            className={style.singlePicture}
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      </div>
      <div className={style.rightPart}>
        <h2 className={style.header}>{title}</h2>
        <div className={style.price}>{price}$</div>
        <div className={style.productColor}>
          Color: <span>Blanc</span>
        </div>
        <div className={style.productSize}>
          Sizes:
          {SIZES.map((size) => (
            <div
              onClick={() => {
                setCurrentSize(size);
              }}
              className={currentSize === size ? style.activeSize : style.size}
              key={size}
            >
              {size}
            </div>
          ))}
        </div>
        <div className={style.description}>{description}</div>
        <div className={style.btns}>
          <button onClick={addToCart}>Add to cart</button>
          <button className={style.toFavorites} onClick={addToFavorites}>
            Add to favorites
          </button>
        </div>
        <div className={style.info}>
          <Link to={ROUTES.HOME} className={style.link}>
            19 people purchased
          </Link>
          <Link
            to={ROUTES.HOME}
            className={style.link}
            style={{ textDecoration: "underline" }}
          >
            Find in a store
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
