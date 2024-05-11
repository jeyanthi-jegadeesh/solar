//added by Costanza. Feel free to add your own types too. This makes sense in this project but not in a bigger one, where you would have types in the component FOLDER itself.

export interface NewsContent {
  h1: string;
  h2: string;
  p: string;
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