import { FC, useState } from "react";

import Logo from "../../img/CinemaGuide.svg";
import "../AuthForm/AuthForm.css";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterDoneForm } from "../RegisterDoneForm/RegisterDoneForm";

export interface AuthFormProps {
  isActive: boolean;
  onClose(): void;
}

export const AuthForm: FC<AuthFormProps> = ({ isActive, onClose }) => {
  const [authType, setAuthType] = useState("auth");
  const [registerDone, setRegisterDone] = useState(false);

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "register" ? "auth" : "register"
    );
  };

  if (isActive) {
    return (
      <div
        onClick={() => {
          onClose();
          setAuthType("auth");
          setRegisterDone(false);
        }}
        className="auth-form-back"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="auth-form-container"
        >
          <img
            className="logo__image auth-form-logo"
            src={Logo}
            alt="Логотип"
          />
          {authType === "auth" && registerDone === false ? (
            <LoginForm
              onClose={() => {
                onClose();
                setAuthType("register");
              }}
            />
          ) : (
            <RegisterForm
              setRegisterDone={() => setRegisterDone(true)}
              registerDone={registerDone}
            />
          )}
          {registerDone === false && (
            <button className="auth-form-btn" onClick={handleClick}>
              {authType === "auth" ? "Регистрация" : "У меня есть пароль"}
            </button>
          )}
          {registerDone === true && (
            <RegisterDoneForm
              setAuthType={() => setAuthType("auth")}
              setRegisterDone={() => setRegisterDone(false)}
            />
          )}
          <button
            onClick={() => {
              onClose();
              setAuthType("auth");
              setRegisterDone(false);
            }}
            className="auth-form-close"
          >
            <img src="../../src/img/close-icon.png" alt="" />
          </button>
        </div>
      </div>
    );
  }
  return null
};
