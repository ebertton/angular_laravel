import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  //INPUT RESPONSAVEL POR RECEBER UM ARRAY COM INFORMAÇÕES PARA O HEAD
  @Input() HeadArray :any[] = [];
  //INPUT RESPONSAVEL POR O GRID DA TABELA
  @Input() GridArray :any[] = [];

  //INPUT RESPONSAVEL POR RECEBER UMA INSTNCIA ^DO EVENT EMITTER PARA EMITIR EVENTOS PARA O PAI
  @Output() onEdit = new EventEmitter<any>();


  @Output() onDelete = new EventEmitter<any>();

  @Output() onValidate = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  edit(item: any) {
    debugger;
    this.onEdit.emit(item);
  }
  delete(item: any) {
    debugger;
    this.onDelete.emit(item);
  }

  validate(item: any){
    this.onValidate.emit(item);
  }
}
