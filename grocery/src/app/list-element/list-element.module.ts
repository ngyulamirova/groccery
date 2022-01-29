import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListElementComponent} from './list-element.component';
import {FormsModule} from '@angular/forms';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {PipesModule} from '../pipes/pipes.module';

@NgModule({
  declarations: [
    ListElementComponent,
  ],
  exports: [
    ListElementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzCheckboxModule,
    NzAutocompleteModule,
    NzInputModule,
    NzIconModule,
    NzModalModule,
    NzTypographyModule,
    PipesModule
  ]
})
export class ListElementModule {
}
