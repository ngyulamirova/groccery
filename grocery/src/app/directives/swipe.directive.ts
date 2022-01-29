import {ChangeDetectorRef, Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appSwipe]'
})
export class SwipeDirective {
  @Input() panel;
  defaultTouch = { x: 0, y: 0, time: 0 };

  constructor(private cdr: ChangeDetectorRef) {
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  handleTouch(event): void {
    const touch = event.touches[0] || event.changedTouches[0];
    if (event.type === 'touchstart') {
      this.defaultTouch.x = touch.pageX;
      this.defaultTouch.y = touch.pageY;
      this.defaultTouch.time = event.timeStamp;
    } else if (event.type === 'touchend') {
      const deltaX = touch.pageX - this.defaultTouch.x;
      const deltaY = touch.pageY - this.defaultTouch.y;
      const deltaTime = event.timeStamp - this.defaultTouch.time;
      if (deltaTime < 500) {
        if (Math.abs(deltaX) > 60) {
          deltaX > 0 ? this.doSwipeRight() : this.doSwipeLeft();
          this.cdr.detectChanges();
        }
      }
    }
  }

  doSwipeLeft = () => this.panel.left = true;

  doSwipeRight = () => this.panel.left = false;
}
