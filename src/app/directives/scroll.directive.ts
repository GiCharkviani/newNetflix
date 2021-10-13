import { Directive, ElementRef, HostListener } from '@angular/core';
import { GenreItemComponent } from '../genre/genre-item/genre-item.component';
import { GeneratorService } from '../services/generator.service';

@Directive({
  selector: '[scrollDirective]',
})
export class ScrollDirective {
  // listening to click
  @HostListener('click', ['$event']) onCLick(click) {
    const attribute = click.target.attributes.getNamedItem('scrollTowards');
    attribute?.value === 'east'
      ? this.scrollAndCreate(true)
      : attribute?.value === 'west'
      ? this.scrollAndCreate(false)
      : false;
  }

  constructor(
    private genreItemComponent: GenreItemComponent,
    private elRef: ElementRef,
    private genService: GeneratorService
  ) {}

  // elements creation and scroll call
  scrollAndCreate(right: boolean): void {
    const elementsToAdd = Math.ceil(
      this.elRef.nativeElement.clientWidth /
        this.elRef.nativeElement.lastElementChild.offsetWidth
    );
    right
      ? this.genService.detachAndInsert(
          this.genreItemComponent.filmCard,
          elementsToAdd,
          true
        )
      : this.genService.detachAndInsert(
          this.genreItemComponent.filmCard,
          elementsToAdd,
          false
        );
    right ? this.nativeScroll(true) : this.nativeScroll(false);
  }

  // scroll call
  nativeScroll(right: boolean) {
    const clientWidth = this.elRef.nativeElement.clientWidth;
    const scrollWidth = this.elRef.nativeElement.scrollWidth;
    const edge = Math.ceil(this.elRef.nativeElement.scrollLeft + clientWidth);

    if (edge !== scrollWidth && edge !== clientWidth) {
      return right
        ? (this.elRef.nativeElement.scrollLeft += clientWidth)
        : (this.elRef.nativeElement.scrollLeft -= clientWidth);
    }

    return false;
  }
}
