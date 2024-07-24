import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const advices = async ({ page, limit }: { page: number, limit: number }) => {
  const res = await httpRequest.get("/advices", {
    page, limit
  });
  return res;
};
export const advice = async ({ id, }: { id: string }) => {
  const res = await httpRequest.get(`/advices/${id}`);
  return res.data;
};



