import { ChangeDetectionStrategy, Component, HostListener, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { concat } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FetchService } from 'src/app/services/fetch.service';
import { MovieModel } from '../../../common/movie.mode';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movie: MovieModel;

  @ViewChild('moreInfo', {read: TemplateRef}) moreInfo: TemplateRef<any>;

  constructor(private contRef: ViewContainerRef, private fetchService: FetchService) {}
  ngOnInit(): void {}

  showMore(){
    const movieId = this.movie.id.toString()
    const cast = this.fetchService.getCast(movieId).pipe(tap(res => this.movie.cast = res))
    const similarMovies = this.fetchService.getSimilarMovies(movieId).pipe(tap(res => this.movie.similarMovies = res))
    const concatting = concat(cast, similarMovies).subscribe()
    this.contRef.createEmbeddedView(this.moreInfo)
  }
  close(){
    this.contRef.clear()
  }


}
