import {Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickOutsideChange = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  clickOutside(): void {
    if (this.element.nativeElement.contains(event.target)) {
      return;
    }
    this.clickOutsideChange.emit();
  }

  @HostListener('focusout', ['$event.target'])
  focusout(): void {
    this.clickOutsideChange.emit();
  }

  constructor(private element: ElementRef) { }
}
