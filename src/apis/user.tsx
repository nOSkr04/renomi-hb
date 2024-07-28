import { User } from "../models/user";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const me = async () => {
  const res = await httpRequest.get("/me");
  return User.fromJson(res);
};
export const authMe = async () => {
  const res = await httpRequest.get("/me");
  return res;
};
export const deleteMe = async () => {
  const res = await httpRequest.post("/users/deleteAccount");
  return res;
};

export const login = async (data: {
  username: string;
  password: string;
  expoPushToken?: string;
}) => {
  const res = await httpRequest.post("/auth/login", data);
  return res;
};

export const logout = async () => {
  const res = await httpRequest.get("/auth/logout");
  return res;
};
