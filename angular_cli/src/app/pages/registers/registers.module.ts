import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistersRoutingModule } from './registers-routing.module';
import { RegistersComponent } from './registers.component';
import { TableComponent } from '../../components/table/table.component';
import {ModalComponent} from "../../components/modal/modal.component";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        RegistersComponent,
        TableComponent,
        ModalComponent

    ],
  imports: [
    CommonModule,
    RegistersRoutingModule,
    SharedModule,
    ReactiveFormsModule,

  ]
})
export class RegistersModule { }
