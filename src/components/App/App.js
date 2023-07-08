import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AppRoutes from "../Routes/Routes";
import Sidebar from "../Sidebar/Sidebar";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../features/categories/categoriesSlice";
import { getProducts } from "../../features/products/productSlice";
import UserForm from "../User/UserForm";
import { loginUser } from "../../features/users/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());

    // dispatch(
    //   loginUser({
    //     email: localStorage.getItem("userName"),
    //     password: localStorage.getItem("password"),
    //   })
    // );
  }, [dispatch]);

  return (
    <div className="App">
      <UserForm />
      <Header />
      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
