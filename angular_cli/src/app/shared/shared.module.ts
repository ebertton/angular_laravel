import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "../components/input/input.component";
import {PageTitleComponent} from "../components/page-title/page-title.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import {ButtonComponent} from "../components/button/button.component";
import {CardComponent} from "../components/card/card.component";
import {SelectComponent} from "../components/select/select.component";
import {ListGroupComponent} from "../components/list-group/list-group.component";

// MODULO RESPONSAVEL POR TORNAR OS COMPONENTES REUTILIZAVEIS E COMPARTILHADOS COM OUTROS MODULOS

@NgModule({
  declarations: [
    InputComponent,
    PageTitleComponent,
    ButtonComponent,
    CardComponent,
    SelectComponent,
    ListGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  exports: [
    InputComponent,
    PageTitleComponent,
    ButtonComponent,
    CardComponent,
    SelectComponent,
    ListGroupComponent,
  ],
  providers: [provideNgxMask()]
})
export class SharedModule { }
