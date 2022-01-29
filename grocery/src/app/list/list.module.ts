import {LOCALE_ID, NgModule} from '@angular/core';
import {ListComponent} from './list.component';
import {CommonModule} from '@angular/common';
import {ListElementModule} from '../list-element/list-element.module';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {FormsModule} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import {PipesModule} from '../pipes/pipes.module';
import {DirectivesModule} from '../directives/directives.module';


export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    swipe: {direction: Hammer.DIRECTION_ALL},
  };
}


@NgModule({
  declarations: [ListComponent],
  exports: [
    ListComponent
  ],
  imports: [
    CommonModule,
    NzCollapseModule,
    ListElementModule,
    NzIconModule,
    NzCheckboxModule,
    FormsModule,
    NzTableModule,
    DragDropModule,
    PipesModule,
    DirectivesModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru-RU'},
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ]
})
export class ListModule {
}
