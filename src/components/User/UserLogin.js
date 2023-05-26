import { useState } from "react";
import style from "../../styles/UserSignUp.module.css";
import { useDispatch } from "react-redux";
import {
  loginUser,
  toggleForm,
  toggleFormType,
} from "../../features/users/userSlice";

const UserLogin = () => {
  const dispatch = useDispatch();
  console.log(localStorage.getItem("user"));
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const closeModal = () => {
    dispatch(toggleForm(false));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(values));
    closeModal();
  };

  return (
    <>
      <div className={style.section}>
        <div className={style.close} onClick={closeModal}>
          <svg className={style.icon_close}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
          </svg>
        </div>

        <div className={style.title}>Log in</div>

        <form className={style.userForm} onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />

          <div
            className={style.link}
            onClick={() => {
              dispatch(toggleFormType("signup"));
            }}
          >
            Create an account
          </div>

          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
