import style from "../../styles/UserSignUp.module.css";
import { useDispatch } from "react-redux";
import {
  createUser,
  toggleForm,
  toggleFormType,
} from "../../features/users/userSlice";
import { useFormik } from "formik";
import * as yup from "yup";

const UserSignUp = () => {
  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    dispatch(createUser(values));
    closeModal();
    actions.resetForm();
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required("Required").email("Invalid email adress"),
    password: yup.string().min(4).required("Required"),
    avatar: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Need correct url adress of image!"
      )
      .required("Please enter website"),
    name: yup.string().required("Required"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        name: "",
        password: "",
        avatar: "",
      },
      validationSchema,
      onSubmit,
    });
  const closeModal = () => {
    dispatch(toggleForm(false));
  };

  return (
    <div className={style.section}>
      <div className={style.close} onClick={closeModal}>
        <svg className={style.icon_close}>
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>
      <div className={style.title}>Register</div>
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
          className={
            errors.password && touched.password ? style.inputError : ""
          }
        />
        {errors.password && touched.password && (
          <p className={style.error}>{errors.password}</p>
        )}
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.name && touched.name ? style.inputError : ""}
        />

        <input
          type="text"
          name="avatar"
          placeholder="Avatar"
          value={values.avatar}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.avatar && touched.avatar ? style.inputError : ""}
        />
        {errors.avatar && touched.avatar && (
          <p className={style.error}>{errors.avatar}</p>
        )}
        <div
          className={style.link}
          onClick={() => {
            dispatch(toggleFormType("signin"));
          }}
        >
          I already have an account
        </div>

        <button type="submit">Create an account</button>
      </form>
    </div>
  );
};

export default UserSignUp;
