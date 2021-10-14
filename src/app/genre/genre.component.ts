import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { dynGenreDirective } from '../directives/dyn-comp.directive';
import { GeneratorService } from '../services/generator.service';
import { GenreItemComponent } from './genre-item/genre-item.component';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css'],
})
export class GenreComponent implements AfterViewInit {
  //tempRef
  @ViewChild(dynGenreDirective) genreComp: dynGenreDirective;
  //factory address of desirable component
  genreItem = GenreItemComponent;

  constructor(private generatorService: GeneratorService) {}

  //components creation call
  ngAfterViewInit() {
    setTimeout(() => {
      this.generatorService
        .genresGenerator(this.genreComp, this.genreItem)
        .subscribe();
    }, 0);
  }
}
