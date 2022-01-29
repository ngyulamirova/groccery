import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import {ProductsArr} from '../models';

@Component({
  selector: 'app-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.scss']
})
export class ListElementComponent implements OnChanges {
  @Input() element;
  @Input() scrolled;
  @Input() nonDecorated;
  @Input() editable;
  @Input() id;
  @Output() checkedChange = new EventEmitter();
  @Output() elementChange = new EventEmitter();
  @Output() deleteId = new EventEmitter();
  @Output() firstElementChange = new EventEmitter();
  @Output() titleChange = new EventEmitter();
  products = ProductsArr;
  selectedProducts = [];
  showList = true;
  showPicture;

  @HostListener('keyup', ['$event'])
  onkeyup(event: any): void {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.createNewElement(event, this.element['title'], this.element['url']);
      this.showList = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.scrolled) {
      this.showList = false;
    }
  }

  createNewElement(e, title: string, url: string): void {
    const selectionStart = e.target.selectionStart;
    const firstElement = this.newElement(title).substr(0, selectionStart).trim();
    const secondElement = this.newElement(title).substr(selectionStart).trim();
    const firstUrl = (firstElement === this.newElement(title).trim()) ? url : null;
    const secondUrl = (secondElement === this.newElement(title).trim()) ? url : null;
    this.elementChange.emit([
      {
        title: this.addId(firstElement, 1),
        checked: this.element.checked,
        groupTitle: this.element?.groupTitle,
        url: firstUrl
      },
      {
        title: this.addId(secondElement, 2),
        checked: false,
        groupTitle: this.element?.groupTitle,
        url: secondUrl
      }
    ]);
  }

  check = (element) => setTimeout(() => this.checkedChange.emit(element));

  getProductList = () => {
    this.showList = true;
    this.selectedProducts = this.products.filter(el =>
      el.title.toUpperCase().includes(this.newElement(this.element['title']).toUpperCase())).slice(0, 20);
    if (this.id === 0) {
      this.firstElementChange.emit();
    }
  }

  paste(e): void {
    const checked = this.element?.checked;
    const groupTitle = this.element?.groupTitle;
    setTimeout(() => {
      const res = e.target.value.split(/\r?\n/).map((el, i) => {
        return {title: this.addId(el.trim(), i), checked: (i ? false : checked), groupTitle: groupTitle};
      });
      this.elementChange.emit(res);
    });
  }

  changeTitle(event): void {
    if (!event) {
      this.element.checked = false;
    } else if (event.trim() !== this.newElement(this.element['title']) &&
      event.trim() !== this.element['title']) {
      this.titleChange.emit(this.addId(event));
    }
  }

  selectListElement(event, option): void {
    if (event.target.textContent.trim() !== this.element['title'] ||
      event.trim() !== this.newElement(this.element['title'])) {
      this.titleChange.emit(this.addId(event.target.textContent.trim()));
      this.element.url = option.url;
    }
    this.showList = false;
  }

  newElement = (element) => (element?.split('#') ? element.split('#')[1] : element)?.replace(/(\r\n|\n|\r)/gm, '');

  addId = (element, id = 0) =>
    (element.split('#')[1] ? element : +new Date() + id.toString() + '#' + element).replace(/(\r\n|\n|\r)/gm, '');
}
