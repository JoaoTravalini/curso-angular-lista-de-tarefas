import { Component, signal } from '@angular/core';
import { InputAddItensComponent } from '../../components/input-add-itens/input-add-itens.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItensComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);
}
