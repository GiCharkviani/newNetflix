import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment'


@Injectable({ providedIn: 'root' })
export class FetchService {
  constructor(private http: HttpClient) {}

  getGenres() {
    return this.http
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${environment.filmsDbAPIKey}&language=en-US`
      )
      .pipe(
        map((genres) => genres['genres']),
        shareReplay()
      );
  }

  getMovies(genre: string) {
    const randomNum = Math.ceil(Math.random() * 300);
    return this.http
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${environment.filmsDbAPIKey}&with_genres=${genre}&page=${randomNum}`
      )
      .pipe(
        map((movies) => movies['results']),
        shareReplay()
      );
  }

  getCast(movieId: string) {
    return this.http
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${environment.filmsDbAPIKey}&language=en-US`
      )
      .pipe(
        map((res) => {
          const thereCast = res['cast'].slice(0, 3);
          let cast = [];
          for (let i in thereCast) {
            cast.push(thereCast[i].name);
          }
          return cast;
        }),
        shareReplay()
      );
  }

  getSimilarMovies(movieId: string) {
    return this.http
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${environment.filmsDbAPIKey}&language=en-US&page=1`
      )
      .pipe(
        map((res) => {
          const thereFilms = res['results'].slice(0, 3);
          let film = [];
          for (let i in thereFilms) {
            film.push(
              `https://image.tmdb.org/t/p/original${thereFilms[i].backdrop_path}`
            );
          }
          return film;
        }),
        shareReplay()
      );
  }
}
