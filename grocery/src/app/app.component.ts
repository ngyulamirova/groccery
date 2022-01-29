import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {CategoriesData, PanelData, RecipesArr, StepsModel} from './models';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggle', [
      state('false', style({
        opacity: 0
      })),
      transition('true => false', animate('500ms linear'))
    ])
  ]
})
export class AppComponent {
  step = 1;
  categories: { id: string, name: string }[] = [...CategoriesData];
  loading = true;
  props = false;
  panels = [...PanelData];
  activePanel = this.panels[0];
  selectedRecipe;
  recipes = [...RecipesArr];
  selectString;
  newList = null;
  deliveryArr = [];
  isVisibleMiddle = false;
  isScrolled = false;
  stepsTitle = StepsModel;
  editTitle;
  showShare = false;

  constructor(private cdr: ChangeDetectorRef) {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  changeLabel(): void {
    if (this.step === 1) {
      this.activePanel['newName'] = this.activePanel && this.activePanel['newName'] ? this.activePanel['newName'] : this.activePanel.name;
      this.editTitle = true;
    }
  }

  addNewList(): void {
    const res = this.panels.filter(el => el['name'].includes('Новый список'))
      .sort((a, b) => +a['name'].split('Новый список')[1]
      < +b['name'].split('Новый список')[1] ? 1 : -1);
    this.newList = 'Новый список' + (res[0] ? ' ' + (+res[0]['name'].split('Новый список')[1] + 1) : '');
    this.addNewListElement();
    this.step = 1;
  }

  changeList(panel): void {
    this.step = 1;
    this.newList = null;
    this.activePanel = panel;
  }

  addNewListElement(): void {
    if (!this.panels.filter(el => el.name === this.newList).length) {
      this.panels = [...this.panels, {
        name: this.newList,
        creationDate: new Date(),
        active: false,
        checked: false,
        elements: [{title: '', checked: false}]
      }];
      this.activePanel = this.panels[this.panels.length - 1];
      this.newList = null;
    }
  }

  panelId = (panel?) => {
    const name = panel ? panel.name : this.activePanel.name;
    return this.panels.findIndex(el => el.name === name);
  };

  sortActivePanel(element): void {
    this.sortPanel(this.panelId(), element);
  }

  sortPanel(id: number, data?): void {
    let panels = [...this.panels[id].elements];
    if (data && data.title) {
      panels = panels.map(el => {
        if (el['groupTitle'] === data.title && el.title) {
          el.checked = data.checked;
        }
        return el;
      });
    }
    const newPanels = panels.filter(el => !el['groupTitle']).sort((a: any, b: any): number => {
      return b.checked ? (a.checked ? 1 : -1) : 1;
    });
    let res = [];
    newPanels.forEach(el => {
      const group = panels.filter(element => element['groupTitle'] === el.title).sort((a: any, b: any): number => {
        return b.checked ? (a.checked ? 1 : -1) : 1;
      });
      if (group.length) {
        el.checked = group[0].checked;
        res = [...res, el, ...group];
      } else {
        res = [...res, el];
      }
    });
    this.panels[id].elements = res;
  }

  goBack(): void {
    if (this.props) {
      this.props = false;
      this.selectedRecipe = null;
      this.selectString = '';
      this.recipes = [...RecipesArr];
      this.cdr.detectChanges();
    } else if (this.step === 1) {
      this.step = 0;
    }
  }

  deleteElement(index): void {
    const id = this.panelId();
    const elements = this.panels[id].elements.filter((el, i) => i !== index && el['groupTitle'] !== this.panels[id].elements[index].title);
    if (!elements.length) {
      this.step = 0;
      this.panels = this.panels.filter((_, i) => i !== id);
    } else {
      this.panels[id].elements = elements;
    }
  }

  openRecipe(recipe): void {
    this.selectedRecipe = recipe;
    this.props = true;
  }

  getActiveRecipeId = () => this.recipes.findIndex(el => el.name === this.selectedRecipe.name);

  sorRecipe(): void {
    const id = this.getActiveRecipeId();
    this.recipes[id].elements = this.recipes[id].elements.sort((a: any, b: any): number => {
      return b.checked ? (a.checked ? 1 : -1) : 1;
    });
  }

  selectAll(): void {
    const id = this.getActiveRecipeId();
    this.recipes[id].elements = this.recipes[id].elements.map(el => {
      return {...el, checked: true};
    });
  }

  addSelectedToList(panel): void {
    this.isVisibleMiddle = false;
    const id = this.panelId(panel);
    const products = this.selectedRecipe.elements.filter(el => el.checked).map(el => {
      return {title: el.title + ' ' + el.weight, checked: false, groupTitle: this.selectedRecipe.name};
    });
    if (id > -1) {
      this.panels[id].elements = [{
        title: this.selectedRecipe.name,
        checked: false
      }, ...products, ...this.panels[id].elements];
    } else {
      this.panels = [{
        active: false,
        checked: false,
        name: this.selectedRecipe.name,
        elements: products,
        creationDate: new Date(),
      }, ...this.panels];
    }
    this.step = 1;
    this.activePanel = panel;
    this.props = false;
    this.selectedRecipe.elements.forEach(element => {
      element.checked = false;
    });
    this.selectString = null;
  }

  select(): void {
    if (this.step === 2) {
      if (!this.selectString) {
        this.recipes = [...RecipesArr];
      } else {
        this.recipes = this.recipes.filter(el =>
          el.name.toLocaleUpperCase().includes(this.selectString.toUpperCase()));
      }
    } else if (this.step === 1) {
      if (!this.selectString) {
        this.categories = [...CategoriesData];
      } else {
        this.categories = this.categories.filter(el =>
          el.name.toLocaleUpperCase().includes(this.selectString.toUpperCase()));
      }
    }
  }

  getSelection(): void {
    this.deliveryArr = [];
    this.panels.forEach(el => {
      if (el.checked) {
        const elements = el.elements.filter(b => b.title && this.deliveryArr.map(a => a.title).indexOf(b.title) < 0);
        this.deliveryArr = [...this.deliveryArr, ...elements];
      }
    });
    this.props = true;
  }

  getIfNonIsSelected = (mode: string) => {
    const arr = mode === 'category' ? this.activePanel?.elements : this.deliveryArr;
    return !arr?.filter(el => el.checked).length;
  }

  createListForRecipes(): void {
    this.isVisibleMiddle = false;
    this.addNewList();
    this.panels[this.panels.length - 1].elements = [];
    this.addSelectedToList(this.panels[this.panels.length - 1]);
  }

  deleteList(): void {
    if (confirm('Удалить список?')) {
      this.step = 0;
      this.panels = this.panels.filter((_, id) => this.panelId() !== id);
    }
  }

  share(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Список покупок',
        text: this.panels.filter((_, id) => this.panelId() === id)[0].elements.map(e => e.title).join('\n'),
        url: 'http://x5-grocerylist.sbdagroup.com'
      }).then(() => {
        console.log('Thanks for sharing!');
      })
        .catch(console.error);
    }
  }

  changeStep(): void {
    this.props = false;
    const id = this.panelId();
    this.panels[id].elements = this.panels[id].elements.filter(el => el.title);
  }

  scroll(): void {
    this.isScrolled = true;
    setTimeout(() => this.isScrolled = false, 0);
  }

  selectAllDelivery(): void {
    this.panels = this.panels.map(el => {
      el.checked = true;
      return el;
    });
  }
}
