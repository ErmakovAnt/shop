import Products from "../Products/Products";
import style from "../../styles/Category.module.css";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ products }) => products);
  const [productName, setProductName] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const filteredByName = (list) => {
    let categoryList = list.filter(
      ({ category }) => category.toLowerCase() === id.toLowerCase()
    );
    if (!productName) {
      return categoryList;
    }
    return categoryList.filter(({ title }) =>
      title.toLowerCase().includes(productName.toLowerCase())
    );
  };

  const filteredByNameAndPrice = () => {
    if (!priceFrom && !priceTo) {
      return filteredByName(list);
    }
    return filteredByName(list).filter(({ price }) => {
      if (priceTo) {
        return price < priceTo && price > priceFrom;
      }
      return price > priceFrom;
    });
  };

  return (
    <section>
      <div className={style.title}>
        {id.replace(id[0], id[0].toUpperCase())}
      </div>
      <div className={style.wrapper}>
        <div className={style.categoryInput}>
          <input
            type="text"
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className={style.categoryInput}>
          <input
            type="text"
            value={priceFrom}
            onChange={(e) => {
              setPriceFrom(e.target.value);
            }}
          />
          <span>Price from</span>
        </div>
        <div className={style.categoryInput}>
          <input
            type="text"
            value={priceTo}
            onChange={(e) => {
              setPriceTo(e.target.value);
            }}
          />
          <span>Price to</span>
        </div>
      </div>
      <Products
        product={filteredByNameAndPrice()}
        title={""}
        newStyle={{ paddingTop: 0 }}
        id={id}
      />
    </section>
  );
};

export default Category;
