import {Component, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IMultiSelectOption, IMultiSelectSettings} from 'ngx-bootstrap-multiselect';
import 'bootstrap';
import 'bootstrap-select';
import {EmployeeService} from "../../services/employee.service";
import {KnowledgeService} from "../../services/knowledge.service";
declare var $: any;

import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  //AQUI NO CONTRITURO ESTAMOS INJETANDO O SERVIÇOS RESPONSAVEL POR PROVER OS DADOS RECEBIDOS DA API
  constructor(
    private employeeService: EmployeeService,
    private knowledgeService: KnowledgeService,
    private router: Router
  ) {
  }
  optionsModel: number[] = [];
  myOptions: IMultiSelectOption[] = [];
  // FORMEGROUP UTILIZADO PARA REATIVIDADE DOS INPUTS E SUA VALIDAÇÕES
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required,  Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    cpf: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    phone: new FormControl('',  ),
    knowledge: new FormControl([], [Validators.required]),
  });
  selectedValues: string[] = [];


  // CONFIGURAÇÕES DO COMPONENTE NGX BOOTSTRAP SELECT AQUI ESMOS LIMITANDO O MAXI DE ELEMENTOS SELECIONADOS PARA 3 E O MINIMO PARA 1 COMO SOLICITADO NOS REQUISITOS
  mySettings: IMultiSelectSettings = {
    selectionLimit: 3,
    minSelectionLimit: 1,
    buttonClasses: 'form-control mt-2 d-flex justify-content-between  align-items-center multpleselect'
  };

  // AQUI É UTILIZADO O JQUARY PARA MANIPULAÇÃO DOS ELEMENTOS ATRAVÉS DO JS. ALGUMAS CONFIGURAÇÕES QUE NÃO É POSSIVEL PERSONALIZAR SÃO INSERIDAS ATRAVES DE METODOS DO JQUARY.
  // OS ELEMENTOS ESTÃO SENDO MANITUPLADO NO ngAfterViewInit, POIS ELE É EXUTADO APÓS A CRIAÇÃO DO COMPONENT
  ngAfterViewInit() {
    $(document).ready(function() {
      $('.dropdown').css("width", "100%");
      $('.multpleselect').css("width", "100%")
        .css("border", "1px solid #4d2e55")
        .css('color', '#888888')
        .css('font-size', '12px')
        .css('height', '40px').focus(function() {
        $('.multpleselect').css("box-shadow", "0 0 0 0.10rem #6af0b5");
      });
      $('.multpleselect').on( "focusout", function() {
        $('.multpleselect').css("box-shadow", "none");
      });


    });
  }


  ngOnInit() {
    //AQUI ESTAMOS OBTENDO OS CONHECIMENTOS CADASTRADOS NO BANCO DE DADOS VIA API
    this.knowledgeService.getKnowledge().subscribe((result) => {
      this.myOptions = result;
    });
  }

//AQUI É UTILIZADO O FORMDATA PARA REALIZARMOS O CADASTRO ATRAVÉS DA API E DO SERVICE EMPLOYESERVICE
  formData: any = {};
  submitForm(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    const knowledges = this.formGroup.get('knowledge')?.value;
    if (knowledges) {
      for (let i = 0; i < knowledges.length; i++) {
        const knowledge = knowledges[i];
        formData.append('knowledges[]', JSON.stringify(knowledge));
      }
    }
    formData.append('name', this.formGroup.get('name')?.value ? this.formGroup.get('name').value : 'Tonho');
    formData.append('email', this.formGroup.get('email')?.value ? this.formGroup.get('email').value : 'tonho@email.com');
    formData.append('cpf', this.formGroup.get('cpf')?.value ? this.formGroup.get('cpf').value : '090.249.714-62');
    formData.append('phone', this.formGroup.get('phone')?.value ? this.formGroup.get('phone').value : '');
    this.employeeService.setEmployee(formData);

  }
}
