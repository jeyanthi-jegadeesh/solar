import { Vector3 } from "three"; // needed for Planet Type
export interface NewsContent {
  id: number,
  title: string,
  url: string,
  summary: string
}

export interface ImageContent {
  imageUrl: string;
}

export interface RootState {
  fullNews: any;
  carouselSlice: any;
  images: ImageContent[];
  news: NewsContent[];
}
export interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
  _id: string
  imageUrl: string;
}

export interface IArticle  {
  authorId: number | string,
  isPrivate: boolean,
  title: string,
  titleImage?: string,
  subtitle?: string,
  articleBody: string,
  associatedPlanets?: string[],
  _id?: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export interface PlanetType {
    name: string;
    color: string;
    position: Vector3;
    velocity: number;
    distance: number;
    size: number;
    textureURL?: string;
    orbitCenter: Vector3;
    description: string;
}
