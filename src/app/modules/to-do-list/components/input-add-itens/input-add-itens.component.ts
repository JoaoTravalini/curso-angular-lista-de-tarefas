import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { IListItems } from '../../interface/IListItems.infercade';

@Component({
  selector: 'app-input-add-itens',
  standalone: true,
  imports: [],
  templateUrl: './input-add-itens.component.html',
  styleUrl: './input-add-itens.component.scss'
})
export class InputAddItensComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild("inputText") public inputText!: ElementRef;
  @Output() public outputListItems = new EventEmitter<IListItems>()
  public focusAndAddItem(value: string){
    if(value){
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const dataAtual = new Date();
      const timestamp = dataAtual.getTime();
      const id = `ID ${timestamp}`

      this.outputListItems.emit({
        id,
        checked: false,
        value,
      });
      
      return this.inputText.nativeElement.focus();
    }
  }
}
