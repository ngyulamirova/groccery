import {ChangeDetectionStrategy, Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  @Input() step: number;
  @Output() stepChange = new EventEmitter<number>();
}
