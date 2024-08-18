import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { IListItems } from '../../interface/IListItems.infercade';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-itens',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-itens.component.html',
  styleUrl: './input-add-itens.component.scss'
})
export class InputAddItensComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild("inputText") public inputText!: ElementRef;

  @Input({ required: true }) public inputListItems: IListItems[] = [];
  @Output() public outputAddListItem = new EventEmitter<IListItems>()
  public focusAndAddItem(value: string){
    if(value){
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = ' ';

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`

      this.outputAddListItem.emit({
        id,
        checked: false,
        value,
      });
      
      return this.inputText.nativeElement.focus();
    }
  }
}
