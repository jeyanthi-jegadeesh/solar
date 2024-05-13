//added by Costanza. Feel free to add your own types too

export interface NewsContent {
  h1: string;
  h2: string;
  p: string;
}

export interface ImageContent {
  imageUrl: string;
}

export interface RootState {
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
}
