import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import {RecipesElementModule} from '../recipes-element/recipes-element.module';
import {NzEmptyModule} from 'ng-zorro-antd/empty';



@NgModule({
  declarations: [
    RecipesComponent
  ],
  exports: [
    RecipesComponent
  ],
  imports: [
    CommonModule,
    RecipesElementModule,
    NzEmptyModule
  ]
})
export class RecipesModule { }
