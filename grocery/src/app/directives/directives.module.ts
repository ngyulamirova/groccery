import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClickOutsideDirective} from './click-outside.directive';
import { SwipeDirective } from './swipe.directive';


@NgModule({
  declarations: [
    ClickOutsideDirective,
    SwipeDirective
  ],
    exports: [
        ClickOutsideDirective,
        SwipeDirective
    ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule {
}
