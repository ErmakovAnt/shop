import { useSelector } from "react-redux";
import UserSignUp from "./UserSignUp";
import UserLogin from "./UserLogin";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { toggleForm } from "../../features/users/userSlice";

import "../../styles/UserForm.css";

const UserForm = () => {
  const { showForm, formType } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const closeModal = (e) => {
    if (e.target.classList.contains("userForm__wrapper"))
      dispatch(toggleForm(false));
  };

  return formType === "signup" ? (
    <CSSTransition
      in={showForm}
      timeout={300}
      classNames="my-node"
      unmountOnExit
    >
      <div className="userForm__wrapper" onClick={closeModal}>
        <UserSignUp />
      </div>
    </CSSTransition>
  ) : (
    <CSSTransition
      in={showForm}
      timeout={300}
      classNames="my-node"
      unmountOnExit
    >
      <div className="userForm__wrapper" onClick={closeModal}>
        <UserLogin />
      </div>
    </CSSTransition>
  );
};

export default UserForm;
