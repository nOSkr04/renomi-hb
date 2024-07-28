import { ICategory } from "../interfaces/category";
import { IContent } from "../interfaces/content";
import { IImage } from "../interfaces/image";

export class Content implements IContent {
  _id: string;
  category: ICategory;
  createdAt: string;
  description: string;
  image: IImage;
  video: any;
  title: string;
  type: string;
  constructor({
    _id,
    createdAt,
    description,
    title,
    type,
    video,
    image,
    category,
  }: IContent) {
    this._id = _id;
    this.createdAt = createdAt;
    this.description = description;
    this.title = title;
    this.type = type;
    this.video = video;
    this.image = image;
    this.category = category;
  }

  static fromJson(json: IContent) {
    return new Content(json);
  }
}
