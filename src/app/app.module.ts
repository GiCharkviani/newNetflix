import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { dynGenreDirective, dynFilmDirective } from './directives/dyn-comp.directive';
import { GenreComponent } from './genre/genre.component';
import { MovieComponent } from './genre/genre-item/movie/movie.component';
import { HttpClientModule } from '@angular/common/http';
import { GenreItemComponent } from './genre/genre-item/genre-item.component'
import { ScrollDirective } from './directives/scroll.directive';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    GenreComponent,
    MovieComponent,
    dynGenreDirective,
    dynFilmDirective,
    GenreItemComponent,
    ScrollDirective,
    HeaderComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
