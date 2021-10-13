import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { genresArray } from '../common/genres';
import { MovieModel } from '../common/movie.mode';
import { FetchService } from './fetch.service';

@Injectable({ providedIn: 'root' })
export class GeneratorService {
  constructor(private fetchService: FetchService) {}

  subsic: Subscription;
  //genres func
  genresGenerator(contRef: any, CF: any) {
    return this.fetchService.getGenres().pipe(
      tap((genresGot) => {
        const genres = genresGot;
        let genresToshow = genres.slice(0, 1);
        this.creator(genresToshow, contRef, CF);
        let counter = genresToshow.length;
        //activating scroll
        this.subsic = fromEvent(document, 'scroll')
          .pipe(
            tap(() => {
              //reaching element
              const disarableElement =
                contRef.viewContainerRef.element.nativeElement
                  .previousElementSibling.children[0];
              //calculating its height
              const calculatedElement =
                disarableElement.offsetTop + disarableElement.offsetHeight;
              //calculating its bottom point
              const comparable = calculatedElement - window.innerHeight;
              //checking creation condition
              if (Math.ceil(window.scrollY) >= comparable) {
                genresToshow = genres.slice(counter + 1, counter + 2);
                this.creator(genresToshow, contRef, CF);
                counter++;

                // console.log(contRef.viewContainerRef.length)
                // console.log(genres.length, 'genre')
              }else if(contRef.viewContainerRef.length+1 === genres.length){
                this.subsic.unsubscribe()
              }
            })
          ).subscribe();
      })
    );
  }

  //films func
  filmGenerator(contRef: any, CF: any, genre: any) {
    return this.fetchService.getMovies(genre.id).pipe(
      tap((filmsGot) => {
        const films = filmsGot;

        for (let i in films) {
          let film: MovieModel = {
            id: films[i].id,
            name: films[i].title,
            overview: films[i].overview,
            img: `https://image.tmdb.org/t/p/original${
              films[i].backdrop_path
                ? films[i].backdrop_path
                : films[i].poster_path
            }`,
            poster: `https://image.tmdb.org/t/p/original${films[i].poster_path}`,
            date: films[i].release_date,
            genres: genresArray.filter(genre => genre.id === films[i].genre_ids.find(res => res === genre.id)),
            rate: films[i].vote_average,
            similarMovies: [''],
            cast: [''],
          };
          const newComp = contRef.viewContainerRef.createComponent(CF);
          newComp.instance.movie = film;
        }
      })
    );
  }

  //Universal creator func
  private creator(array: any[], contRef: any, CF: any) {
    for (let i in array) {
      const newComp = contRef.viewContainerRef.createComponent(CF);
      newComp.instance.genre = array[i];
    }
  }

  //detaching & inserting components
  detachAndInsert(contRef: any, elToAdd: number, right: boolean) {
    right
      ? this.helperToDetachOrAttach(contRef, elToAdd, 0, null)
      : this.helperToDetachOrAttach(contRef, elToAdd, null, 0);
  }

  //helper for above
  private helperToDetachOrAttach(
    contRef: any,
    elToAdd: number,
    right_zero: number,
    left_zero: number
  ) {
    for (let i = 0; i <= elToAdd; i++) {
      const detachedEl = contRef.viewContainerRef.detach(right_zero);
      contRef.viewContainerRef.insert(detachedEl, left_zero);
    }
  }
}
