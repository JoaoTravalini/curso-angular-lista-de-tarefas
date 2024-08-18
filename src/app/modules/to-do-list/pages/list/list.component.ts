import { Component, signal } from '@angular/core';
import { InputAddItensComponent } from '../../components/input-add-itens/input-add-itens.component';
import { IListItems } from '../../interface/IListItems.infercade';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItensComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<IListItems[]>([this.#parserItems()]);
  getListItems = this.#setListItems.asReadonly();

  #parserItems(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]');
  }
  public getInputAndAddItem(value: IListItems){
    localStorage.setItem('@my-list', JSON.stringify([value]));
  }
}
