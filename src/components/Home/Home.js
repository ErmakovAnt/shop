import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";

import { filteredByPrice } from "../../features/products/productSlice";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function Home() {
  const {
    products: { list, filtered },
    categories,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!list) return;
    dispatch(filteredByPrice(100));
  }, [dispatch, list]);

  return (
    <>
      <Poster />
      <Products product={list} title={"Worth seeing"} />
      <Categories categories={categories.list} title={"Trending"} />
      <Banner />
      <Products product={filtered} title={"Less than 100$"} />
    </>
  );
}

export default Home;
