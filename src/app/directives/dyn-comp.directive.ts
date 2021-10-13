import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[genreCat]'
})
export class dynGenreDirective{
  constructor(public viewContainerRef: ViewContainerRef){}
}

@Directive({
  selector: '[movie]'
})
export class dynFilmDirective {
  constructor(public viewContainerRef: ViewContainerRef){}
}
