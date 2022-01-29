import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipesElementComponent} from './recipes-element.component';
import {PipesModule} from '../pipes/pipes.module';



@NgModule({
  declarations: [RecipesElementComponent],
  exports: [
    RecipesElementComponent
  ],
    imports: [
        CommonModule,
        PipesModule
    ]
})
export class RecipesElementModule { }
