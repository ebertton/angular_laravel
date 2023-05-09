import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
// @ts-ignore
import anime from 'animejs/lib/anime';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() inputId = '';
  @Input() control = new FormControl();
  @Input() label = '';
  @Input() mask = '';

  @Output() onSearch = new EventEmitter<any>();

  // AQUI É ONDE PODEMOS INSERIR MESAGENS DE ERROS PARA AS VALIDAÇÕES
  errorMessages: Record<string, string> = {
    required: "Campo obrigatório",
    email: "O e-mail é inválido",
    maxlength: "Quantidade de caracteres máxima ultrapassada",
    minlength: "Quantidade de caracteres minima não foi atingida",
  }

  // METODO RESPONSAVEL POR EMITIR EVENTO PARA O COMPONENT PAI, PASSANDO OS DADOS DAS BUSCAS CASO SEJA ESSA A FINALIDADE DO INPUT
  search(item: any){
    this.onSearch.emit(this.control.value);
  }
}
