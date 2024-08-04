import { z } from "zod";
import { validateResponse } from "./ValidateResponse";
// import axios from "axios";

export const ProfileSchema = z.object({
  favorites: z.array(z.string()),
  surname: z.string(),
  name: z.string(),
  email: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export function fetchProfile(): Promise<Profile> {
  return fetch("https://cinemaguide.skillbox.cc/profile", {
    method: "GET",
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => ProfileSchema.parse(data));
}

export function registerUser(
  email: string,
  password: string,
  name: string,
  surname: string
): Promise<void> {
  return fetch("https://cinemaguide.skillbox.cc/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
    body: new URLSearchParams({
      email,
      password,
      name,
      surname,
    }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function loginUser(email: string, password: string): Promise<void> {
  return fetch("https://cinemaguide.skillbox.cc/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
    body: new URLSearchParams({ email, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function logOutUser(): Promise<void> {
  return fetch("https://cinemaguide.skillbox.cc/auth/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then(validateResponse)
    .then(() => undefined);
}
