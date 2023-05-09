import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent {


  toppings = new FormControl('');
  // OUTPUT RESPONSAVEL POR EMITIR EVENTO PARA O COMPONENT PAI, PASSANDO POR PARAMENTO UM CLASSE CSS PARA ABIR OU FECHAR O MENU RESPONSIVO
  @Output() evento = new EventEmitter<string>()
  togglerMenu(){
    this.evento.emit('sidebar-wrapper__sb-sidenav-toggled');
  }
}
