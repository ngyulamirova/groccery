import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-recipe-props',
  templateUrl: './recipe-props.component.html',
  styleUrls: ['./recipe-props.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipePropsComponent {
  @Input() recipe;
  @Output() recipeSelectionChange = new EventEmitter();
  @Output() selectAll = new EventEmitter();
  @Output() addToList = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  checkedChange(): void {
    this.recipeSelectionChange.emit();
    this.cdr.detectChanges();
  }

  getButtonDisabled(value): boolean {
    return !value.filter(el => el.checked).length;
  }
}
