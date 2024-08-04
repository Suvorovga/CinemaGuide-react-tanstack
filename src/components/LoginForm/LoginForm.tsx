import "../LoginForm/LoginForm.css";
import { FormField } from "../FormField/FormField";
import { loginUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";

import { z } from "zod";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const LoginSchema = z.object({
  email: z.string().email("Введите корректный Email"),
  password: z.string().min(8, "Введите более 7 символов"),
});

export type LoginData = z.infer<typeof LoginSchema>;

export interface LoginFormProps {
  onClose(): void;
}

export const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation(
    {
      mutationFn: (data: { email: string; password: string }) =>
        loginUser(data.email, data.password),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["user","me"] });
      },
    },
    queryClient
  );

  return (
    <form
      onSubmit={handleSubmit(({ email, password }) => {
        loginMutation.mutate({ email, password });
        reset();
        onClose();
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

      <button className="login-form__enter" type="submit">
        Войти
      </button>
    </form>
  );
};
