import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import {NzRadioModule} from "ng-zorro-antd/radio";
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        MenuComponent
    ],
    exports: [
        MenuComponent
    ],
  imports: [
    CommonModule,
    NzRadioModule,
    FormsModule
  ]
})
export class MenuModule { }
