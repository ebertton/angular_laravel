import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent {
  //INPUT RESPONSAVEL POR RECEBER UMA LISTA DE ITENS PARA SEREM RENDERIZADOS
  @Input() items: any[] = [];
}
