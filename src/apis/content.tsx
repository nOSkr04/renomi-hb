import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const contentList = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const res = await httpRequest.get("/content", { page, limit });
  return res;
};
