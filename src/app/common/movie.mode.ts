export interface MovieModel {
  id:number,
  name:string;
  overview: string;
  img:string;
  poster:string;
  date: string;
  genres: {genre: string, id: number}[];
  rate:number;
  similarMovies:string[];
  cast:string[]
}
