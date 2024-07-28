import { ICategory } from "../interfaces/category";

export class Category implements ICategory {
  _id: string;
  createdAt: string;
  name: string;
  sort: number;
  constructor({ _id, createdAt, sort, name }: ICategory) {
    this._id = _id;
    this.createdAt = createdAt;
    this.name = name;
    this.sort = sort;
  }

  static fromJson(json: ICategory) {
    return new Category(json);
  }
}
