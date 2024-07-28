import { IImage } from "../interfaces/image";

export class Image implements IImage {
  _id: string;
  createdAt: string;
  height: number;
  width: number;
  name: string;
  url: string;
  constructor({ _id, createdAt, height, width, name, url }: IImage) {
    this._id = _id;
    this.createdAt = createdAt;
    this.height = height;
    this.width = width;
    this.name = name;
    this.url = url;
  }

  static fromJson(json: IImage) {
    return new Image(json);
  }
}
