import { zodResolver } from "@hookform/resolvers/zod";
import "../RegisterForm/RegisterForm.css";
import { FormField } from "../FormField/FormField";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { FC } from "react";

export const RegisterSchema = z
  .object({
    email: z.string().email("Введите корректный Email"),
    password: z.string().min(8, "Введите более 7 символов"),
    name: z.string().min(1, "Введите более 1 символа"),
    surname: z.string().min(2, "Введите более 2 символов"),
    repeatPassword: z.string().min(8, "Повторите пароль"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Введенные пароли не совпадают",
  });

export type RegisterData = z.infer<typeof RegisterSchema>;

export interface RegisterFormProps {
  setRegisterDone(): void;
  registerDone: boolean;
}

export const RegisterForm: FC<RegisterFormProps> = ({
  setRegisterDone,
  registerDone,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
  });

  const registerMutation = useMutation(
    {
      mutationFn: (data: {
        email: string;
        password: string;
        name: string;
        surname: string;
      }) => registerUser(data.email, data.password, data.name, data.surname),
      onSuccess() {
        setRegisterDone();
      },
    },
    queryClient
  );
  if (!registerDone) {
    return (
      <>
        <h2 className="register-title">Регистрация</h2>
        <form
          onSubmit={handleSubmit(({ email, password, name, surname }) => {
            registerMutation.mutate({ email, password, name, surname });
            reset();
          })}
          className="login-form"
        >
          <FormField errorMesage={errors.email?.message}>
            <div className="login-form__input-container login-form__mail-container">
              <input
                {...register("email")}
                placeholder="Электронная почта"
                className="login-form__input login-form__mail"
                type="text"
                autoComplete="name"
              />
            </div>
          </FormField>

          <FormField errorMesage={errors.name?.message}>
            <div className="login-form__input-container register-name-container">
              <input
                {...register("name")}
                placeholder="Имя"
                className="login-form__input login-name"
                type="text"
                autoComplete="name"
              />
            </div>
          </FormField>

          <FormField errorMesage={errors.surname?.message}>
            <div className="login-form__input-container register-surname-container">
              <input
                {...register("surname")}
                placeholder="Фамилия"
                className="login-form__input login-surname"
                type="text"
                autoComplete="name"
              />
            </div>
          </FormField>

          <FormField errorMesage={errors.password?.message}>
            <div className="login-form__input-container login-form__password-container">
              <input
                {...register("password")}
                placeholder="Пароль"
                className="login-form__input login-form__password"
                type="password"
                autoComplete="new-password"
              />
            </div>
          </FormField>

          <FormField errorMesage={errors.repeatPassword?.message}>
            <div className="login-form__input-container login-form__password-container">
              <input
                {...register("repeatPassword")}
                placeholder="Подтвердите пароль"
                className="login-form__input login-form__password"
                type="password"
                autoComplete="new-password"
              />
            </div>
          </FormField>

          <button className="login-form__enter" type="submit">
            Создать аккаунт
          </button>
        </form>
      </>
    );
  }
};
