import { Component, signal } from '@angular/core';
import { InputAddItensComponent } from '../../components/input-add-itens/input-add-itens.component';
import { IListItems } from '../../interface/IListItems.infercade';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { ElocalStorage } from '../../enum/ELocalStorage.enum';
import Swal from 'sweetalert2';

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
    return JSON.parse(localStorage.getItem(ElocalStorage.MY_LIST) || '[]');
  }

  #updateLocalStorage(){
    return localStorage.setItem(
      ElocalStorage.MY_LIST,
      JSON.stringify(this.#setListItems())
    );
  }

  public getInputAndAddItem(value: IListItems){
      localStorage.setItem(
      ElocalStorage.MY_LIST, 
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

  public updateItemCheckbox(newItem: { id: string; checked: boolean }){
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter( res => {
        if(res.id === newItem.id){
          res.checked = newItem.checked;
          return res;
        }
        return res;
      })
      return oldValue;
    });

    return this.#updateLocalStorage();
  }

  public updateItemText(newItem: { id: string, value: string}){
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter( res => {
        if(res.id === newItem.id){
          res.value = newItem.value;
          return res;
        }
        return res;
      })
      return oldValue;
    });

    return this.#updateLocalStorage();
  }

  public deleteItem(id: string){

    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      iconColor: "#FF6B00",
      showCancelButton: true,
      confirmButtonText: "Sim, delete este item!",
      confirmButtonColor: "#FF6B00",
      cancelButtonColor: "#FF1D1D"
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: IListItems[]) => {
          return oldValue.filter((res) => res.id !== id);
        });
      }
    });
  }

  public deleteAllItems(){

    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      iconColor: "#FF6B00",
      showCancelButton: true,
      confirmButtonText: "Sim, delete tudo!",
      confirmButtonColor: "#FF6B00",
      cancelButtonColor: "#FF1D1D"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ElocalStorage.MY_LIST);
        return this.#setListItems.set(this.#parserItems());
      }
    });
  }
}
