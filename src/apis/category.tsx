import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const categoryList = async () => {
  const res = await httpRequest.get("/categories");
  return res;
};
