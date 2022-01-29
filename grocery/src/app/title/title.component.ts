import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import {StepsModel} from '../models';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent {
  @Input() step: number;
  @Input() props: boolean;
  @Input() activeTitle;
  @Output() goBack = new EventEmitter();
  @Output() addNewList = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() flag = new EventEmitter();
  @Output() userClick = new EventEmitter();
  @Output() titleChanged = new EventEmitter();
  @Output() deleteList = new EventEmitter();
  stepsTitle = StepsModel;
}
