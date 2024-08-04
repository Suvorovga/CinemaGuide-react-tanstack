import { FC } from "react";

import './RegisterDoneForm.css'

export interface RegisterDoneFormProps {
  setRegisterDone(): void;
  setAuthType(): void;
}

export const RegisterDoneForm: FC<RegisterDoneFormProps> = ({
  setRegisterDone,
  setAuthType,
}) => {
  return (
    <div className="done-form__container">
      <h2 className="done-form__title">Регистрация завершена</h2>
      <span className="done-form__text">
        Используйте вашу электронную почту для входа
      </span>
      <button
        onClick={() => {
          setRegisterDone();
          setAuthType();
        }}
        className="done-form__btn"
      >
        Войти
      </button>
    </div>
  );
};
