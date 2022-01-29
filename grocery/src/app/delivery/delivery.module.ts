import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import {ListModule} from '../list/list.module';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';



@NgModule({
    declarations: [
        DeliveryComponent
    ],
    exports: [
        DeliveryComponent
    ],
  imports: [
    CommonModule,
    ListModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class DeliveryModule { }
