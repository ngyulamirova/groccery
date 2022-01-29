import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit, HostListener} from '@angular/core';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        position: 'absolute',
        left: '-60px',
        right: '60px'
      })),
      state('closed', style({
        position: 'absolute',
        left: '0',
        right: '0'
      })),
      state('visible', style({
        width: '60px'
      })),
      state('hide', style({
        width: 0
      })),
      transition('open => closed', [
        animate('0.25s')
      ]),
      transition('closed => open', [
        animate('0.25s')
      ]),
      transition('visible => hide', [
        animate('0.25s')
      ]),
      transition('hide => visible', [
        animate('0.5s')
      ])
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input() panels;
  @Input() notClickable;
  @Input() selectable;
  @Output() titleChange = new EventEmitter();
  @Output() panelChange = new EventEmitter();
  @Output() selectionChange = new EventEmitter();
  @Output() selectAddingList = new EventEmitter();

  isDragged = false;

  ngOnInit(): void {
    for (const element of this.panels) {
      element.active = false;
      element.left = false;
    }
  }

  openList(event, i): void {
    event.stopPropagation();
    if (!this.notClickable) {
      this.panels[i].active = !this.panels[i].active;
    }
  }

  clickOnTitle(panel): void {
    if (this.notClickable) {
      this.selectAddingList.emit(panel);
    } else if (!this.selectable) {
      this.titleChange.emit(panel);
    }
  }

  drop(event): void {
    moveItemInArray(this.panels, event.previousIndex, event.currentIndex);
  }

  deletePanel({name, creationDate}): void {
    const index = this.panels.findIndex((el) => el.name === name && el.creationDate === creationDate);
    this.panels.splice(index, 1);
  }
}
