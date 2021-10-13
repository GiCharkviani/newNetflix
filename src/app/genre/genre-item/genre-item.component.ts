import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';

import { dynFilmDirective } from '../../directives/dyn-comp.directive';
import { GeneratorService } from 'src/app/services/generator.service';
import { GenreModel } from '../../common/genre.model';
import { MovieComponent } from './movie/movie.component';

@Component({
  selector: 'app-genre-item',
  templateUrl: './genre-item.component.html',
  styleUrls: ['./genre-item.component.css']
})
export class GenreItemComponent implements OnInit, AfterViewInit {
  genre: GenreModel;

  //tempRef
  @ViewChild(dynFilmDirective) filmCard: dynFilmDirective;
  //factory address of desirable component
  factory = this.CF.resolveComponentFactory(MovieComponent);

  constructor(
    private generatorService: GeneratorService,
    private CF: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}


  //components creation call
  ngAfterViewInit() {
    setTimeout(() => {
      this.generatorService.filmGenerator(
        this.filmCard,
        this.factory,
        this.genre
      ).subscribe();
    }, 0);
  }
}
