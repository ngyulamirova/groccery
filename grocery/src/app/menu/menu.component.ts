import {ChangeDetectionStrategy, Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
@Input() step: number;
@Output() stepChange = new EventEmitter<number>();
}
