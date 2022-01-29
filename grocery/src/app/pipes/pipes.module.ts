import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HashPipe} from './hash.pipe';
import { NonEmptyElementsLengthPipe } from './non-empty-elements-length.pipe';



@NgModule({
  declarations: [HashPipe, NonEmptyElementsLengthPipe],
  exports: [HashPipe, NonEmptyElementsLengthPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
