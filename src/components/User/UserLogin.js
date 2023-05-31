import { useDispatch } from "react-redux";
import {
  loginUser,
  toggleForm,
  toggleFormType,
} from "../../features/users/userSlice";
import { useFormik } from "formik";
import * as yup from "yup";

import style from "../../styles/UserSignUp.module.css";

const UserLogin = () => {
  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    dispatch(loginUser(values));
    closeModal();
    actions.resetForm();
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required("Required").email("Invalid email adress"),
    password: yup.string().min(4).required("Required"),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit,
    });

  const closeModal = () => {
    dispatch(toggleForm(false));
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

        <form className={style.userForm} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? style.inputError : ""}
          />
          {errors.email && touched.email && (
            <p className={style.error}>{errors.email}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? style.inputError : ""}
          />
          {errors.password && touched.password && (
            <p className={style.error}>{errors.password}</p>
          )}
          <div
            className={style.link}
            onClick={() => {
              dispatch(toggleFormType("signup"));
            }}
          >
            Create an account
          </div>

          <button type="submit">Log in</button>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
