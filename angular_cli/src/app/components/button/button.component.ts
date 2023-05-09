import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  //PARA INSERIR CLASSES DE ESTILOS
  @Input() classstyle = '';
  //PARA INSERIR VALOR A SER ENVIADO PARA VALIDAÇÃO, OS VALORES SÃO [VALIDO / NÃO VALIDADO]
  @Input() validated = '';
  // PARA ESCUTAR ENVIAR EVENTO PARA O COMPONENT PAI
  @Output() onValidate = new EventEmitter<any>();
  //PARA HABILITAR OU DESABILITAR O BOTÃO
  @Input() disabled: boolean = false;

  //FUNÇÃO EXECUTADA NO BUTTON.COMPONENT.HTML, ESCUTANDO EVENTOS E EMEITINDO PARA O PAI ESCUTAR
  validate(item: any){
    this.onValidate.emit(item);
  }

}
