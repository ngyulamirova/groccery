import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipePropsComponent } from './recipe-props.component';
import {ListElementModule} from '../list-element/list-element.module';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {PipesModule} from '../pipes/pipes.module';

@NgModule({
    declarations: [
        RecipePropsComponent
    ],
    exports: [
        RecipePropsComponent
    ],
    imports: [
        CommonModule,
        ListElementModule,
        NzButtonModule,
        PipesModule,
    ]
})
export class RecipePropsModule { }
