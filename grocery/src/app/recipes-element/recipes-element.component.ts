import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-recipes-element',
  templateUrl: './recipes-element.component.html',
  styleUrls: ['./recipes-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesElementComponent {
  @Input() recipe;
}
