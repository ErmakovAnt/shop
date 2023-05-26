import { useState } from "react";
import style from "../../styles/UserSignUp.module.css";
import { useDispatch } from "react-redux";
import {
  createUser,
  toggleForm,
  toggleFormType,
} from "../../features/users/userSlice";

const UserSignUp = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    avatar: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const closeModal = () => {
    dispatch(toggleForm(false));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(values));
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
        <div className={style.title}>Register</div>
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
          <input
            type="text"
            name="name"
            placeholder="Username"
            required
            value={values.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar"
            required
            value={values.avatar}
            onChange={handleChange}
          />

          <div
            className={style.link}
            onClick={() => {
              dispatch(toggleFormType("signin"));
            }}
          >
            I already have an account
          </div>

          <button>Create an account</button>
        </form>
      </div>
    </>
  );
};

export default UserSignUp;
