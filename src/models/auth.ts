import { IAuth } from "../interfaces/auth";
import { IUser } from "../interfaces/user";

export class Auth implements IAuth {
  accessToken: string | null;
  user: IUser | null;

  constructor({ accessToken, user }: IAuth) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
