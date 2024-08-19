import { Component, signal } from '@angular/core';
import { InputAddItensComponent } from '../../components/input-add-itens/input-add-itens.component';
import { IListItems } from '../../interface/IListItems.infercade';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItensComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<IListItems[]>(this.#parserItems());
  public etListItems = this.#setListItems.asReadonly();

  #parserItems(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]');
  }

  public getInputAndAddItem(value: IListItems){
      localStorage.setItem(
     '@my-list', 
      JSON.stringify([...this.#setListItems(), value])
      );

      return this.#setListItems.set(this.#parserItems());
  }

  public listItemsStage(value: 'pending' | 'completed'){
    return this.etListItems().filter((res: IListItems) => {
      if(value === 'pending'){
        return !res.checked;
      }

      if(value === 'completed'){
        return res.checked;
      }

      return res;
    })
  }

  public deleteAllItems(){
    localStorage.removeItem('@my-list');
    return this.#setListItems.set(this.#parserItems());
  }
}
