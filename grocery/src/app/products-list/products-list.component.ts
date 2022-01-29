import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit {
  @Input() list;
  @Input() scrolled;
  @Input() editable;
  @Input() nonDecorated;
  @Output() panelChange = new EventEmitter();
  @Output() deleteElement = new EventEmitter<number>();
  rightSpace = 50;
  right;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.addFirstElement();
  }

  addFirstElement(): void {
    if (this.editable && this.list[0].title.length) {
      this.list.unshift({title: '', checked: false});
    }
  }

  addElements(newData, index): void {
    const lastTitle = this.list[index].title;
    if (this.list.filter(el => el.groupTitle === lastTitle).length) {
      newData.forEach(el => el.groupTitle = newData[0].title);
      newData[0].groupTitle = null;
    }
    const res = [...this.list.slice(0, index), ...newData, ...this.list.slice(index + 1, this.list.length)];
    res.forEach((el, i) => {
      if (el.groupTitle === lastTitle) {
        el.groupTitle = newData[0].title;
      }
      this.list[i] = el;
    });
    if (this.editable && this.list[0].title.length) {
      this.list.unshift({title: '', checked: false});
    }
  }

  changeTitle(title, i): void {
    this.list[i].url = null;
    if (!this.list[i].title) {
      this.list[i].checked = false;
    }
    this.list.forEach((el) => {
      if (el.groupTitle === this.list[i].title) {
        el.groupTitle = title;
      }
    });
    this.list[i].title = title;
  }

  drop(event): void {
    if (event.currentIndex > 0 && event.previousIndex !== 0) {
      moveItemInArray(this.list, event.previousIndex, event.currentIndex);
      const element = this.list[event.currentIndex];
      if (this.list.filter(el => el.groupTitle === element.title).length) {
        const prev = event.currentIndex > 0 ? this.list[event.currentIndex - 1] : null;
        const next = this.list[event.currentIndex + 1];
        const pevGroupTitle = this.list.filter(el => el.groupTitle === prev.title).length ? prev.title : prev.groupTitle;
        if (pevGroupTitle && next?.groupTitle && (pevGroupTitle === next?.groupTitle)) {
          moveItemInArray(this.list, event.currentIndex, event.previousIndex);
        } else {
          this.moveSubItems(element.title);
        }
      } else {
        this.moveItem(event.currentIndex, element, event.distance.x > this.rightSpace);
      }
    }
  }

  moveItem(currentIndex, element, subitem): void {
    const prev = this.list[currentIndex - 1];
    const next = this.list[currentIndex + 1];
    const pevGroupTitle = this.list.filter(el => el.groupTitle === prev.title).length ? prev.title : prev.groupTitle;
    if (subitem || (pevGroupTitle && next?.groupTitle && (pevGroupTitle === next?.groupTitle))) {
      element.groupTitle = prev.groupTitle ? prev.groupTitle : prev.title;
    } else {
      element.groupTitle = null;
    }
  }

  moveSubItems(title): void {
    const elements = this.list.filter(el =>
      el.groupTitle === title);
    const newList = [...this.list.filter(el => el.groupTitle !== title)];
    const newId = newList.findIndex(el => el.title === title);
    const res = [...newList.slice(0, newId + 1), ...elements, ...newList.slice(newId + 1, newList.length)];
    res.forEach((el, i) => this.list[i] = el);
  }

  trackByFn = i => this.list.length - 1 - i;

  moveRow(event): void {
    this.right = (event.distance.x > this.rightSpace);
    this.cdr.detectChanges();
  }
}
