import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const video = async (data: FormData) => {
  const res = await httpRequest.upload(
    "/video",
    data as unknown as { file: Blob }
  );
  return res;
};
