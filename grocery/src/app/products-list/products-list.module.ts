import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { ListElementModule } from '../list-element/list-element.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NzTableModule} from 'ng-zorro-antd/table';


@NgModule({
    declarations: [
        ProductsListComponent
    ],
    exports: [
        ProductsListComponent
    ],
  imports: [
    CommonModule,
    ListElementModule,
    DragDropModule,
    NzTableModule
  ]
})
export class ProductsListModule { }
