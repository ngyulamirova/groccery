import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryComponent{
  @Input() panels;
  @Output() panelChange = new EventEmitter();
  @Output() selectList = new EventEmitter();

  getIfDisabled = () => !this.panels.filter(el => el.checked).length;
}
