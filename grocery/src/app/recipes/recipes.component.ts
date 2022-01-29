import {ChangeDetectionStrategy, Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent {
  @Input() recipes;
  @Output() recipeSelectionChange = new EventEmitter();
}
