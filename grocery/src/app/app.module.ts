import {NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {ru_RU} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import ru from '@angular/common/locales/ru';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TitleModule} from './title/title.module';
import {FooterModule} from './footer/footer.module';
import {ListModule} from './list/list.module';
import {RecipesModule} from './recipes/recipes.module';
import {RecipePropsModule} from './recipe-props/recipe-props.module';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {DeliveryModule} from './delivery/delivery.module';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {ProductsListModule} from './products-list/products-list.module';
import {DirectivesModule} from './directives/directives.module';
import { CategoryComponent } from './category/category.component';
import {MenuModule} from "./menu/menu.module";
import {PipesModule} from './pipes/pipes.module';
registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TitleModule,
        FooterModule,
        ListModule,
        ProductsListModule,
        RecipesModule,
        RecipePropsModule,
        NzInputModule,
        NzIconModule,
        DeliveryModule,
        NzButtonModule,
        NzModalModule,
        ProductsListModule,
        ProductsListModule,
        DirectivesModule,
        MenuModule,
        PipesModule,
    ],
  providers: [
    {provide: NZ_I18N, useValue: ru_RU},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
