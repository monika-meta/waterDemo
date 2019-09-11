import { Directive, Input } from '@angular/core';
import { ElementRef, } from '@angular/core';
import { CARD_COLORS } from '../app.const';
@Directive({
  selector: '[appDynamicColorCard]'
})
export class DynamicColorCardDirective {

  @Input('appDynamicColorCard') colorId: number;
  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = CARD_COLORS.find((data) => {
      return data.key === this.colorId;
    }).value;

  }
}
