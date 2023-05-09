import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NgxBootstrapMultiselectModule} from "ngx-bootstrap-multiselect";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RegisterRoutingModule,
        MatInputModule,
        MatSelectModule,
        NgxBootstrapMultiselectModule,
        HttpClientModule,
        SharedModule
    ],
})
export class RegisterModule { }
