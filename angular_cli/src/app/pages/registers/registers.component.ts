import {Component, OnInit} from '@angular/core';
import {IEmployee} from "../../interfaces/IEmployee";
import {EmployeeService} from "../../services/employee.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, Subject} from "rxjs";
declare var $: any;

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})
export class RegistersComponent implements OnInit{

  //AQUI ESTAMOS INJETANDO O EMPLOYE SERVICE PARA UTILIZARMOS SEUS SEVIÇOES PARA ENVIAR E RECEBER INFORMAÇÕES DA API
  constructor(
    private employeeService: EmployeeService
  ) {
  }

  //FORMGROUP RESPONSAVEL POR O USO REATIVO DO MODAL RESPONSAVEL POR FAZER AS VALIDAÇÕES DOS DADOS CADASTRADOS
  formGroup = new FormGroup({
    name: new FormControl('', ),
    email: new FormControl('', ),
    cpf: new FormControl('', ),
    phone: new FormControl('',  ),
    validated: new FormControl('',  ),
  });

  //AQUIE TEMOS O FORGRUPO RESPONSAVEL POR A REATIVIDADE DA BUSCA
  formGroupSearch = new FormGroup({
    field: new FormControl('', ),
    validated: new FormControl('',  ),
  });

  //AQUI É INICIALIZADO DUS LISTASTA VAZIAS, UMA PARA FICAR GUARTADO TODOS OS DADOS RERONADOS DA API COMO FONTE DE RECUPERAÇÃO E A OUTRA PARA BUSCAS.
  employeesList: IEmployee [] = [];
  allRegisters: IEmployee [] = [];
  validated = '';
  employeesId: number;
  myItems: string [] = [];
  search$: Subject<string> = new Subject<string>();

  //AQUI UTILIZAMOS O DEBOUNCE PARA CONTROLARMOS O TEMOPO DE REATIVIDADE DA BUSCA, EVITANDO ASSIM QUE OCORRA UM ESTOURO DE PILHA DIANTE DAS MUITAS ALTERAÇÕES RECEBIDAS NO CAMPO DE BUSCA
  ngOnInit() {
    this.employeeService.getEmployees().subscribe((result) => {
      this.employeesList = result;
      this.allRegisters = result
    });
    this.search$
      .pipe(debounceTime(500)) // espera 500ms de inatividade do usuário
      .subscribe(value => {
        this.formGroupSearch.controls.field.setValue(value);
        if (value.length > 0) {
          this.employeesList = this.employeesList
            .filter(employee => employee.name.toLowerCase().includes(value.toLowerCase()));
        } else {
          this.employeesList = this.allRegisters;
        }
      });

  }

  //AQUI ESTAMOS DESABILITANDO OS INPUTS DO MODAL PARA SEREM UTILIZADOS APENAS PARA VISUALIZAÇÃO
  ngAfterViewInit() {
    $(document).ready(function() {
      $('#name').attr('disabled', '')
      $('#email').attr('disabled', '')
      $('#cpf').attr('disabled', '')
      $('#phone').attr('disabled', '')
    });
  }
  headArray = [
    {'Head': 'Nome', 'FieldName': 'name'},
    {'Head': 'Email', 'FieldName': 'email'},
    {'Head': 'Status', 'FieldName': 'validated'},
    {'Head': 'id', 'FieldName': 'id'},
  ];

  //AQUI É DEFINIDO OS PARAMETROS DE FILTROS
  validatedOptions = ['Validado', 'Não validado', 'Todos']

  //AOCLICAR NO BOTÃO PARA ABIRIR O MODAL ESSE METODO É EXECUTADO E COM ELE O EMPLOYEE SERVICE PARA TRAZER AS INFORMAÇÕES DOS USUARIOS SELECIONADOS;
  getEmployee(id: number){
    this.employeeService.getEmployee(id).subscribe((result) => {
      this.formGroup.controls.name.setValue(result.name) ;
      this.formGroup.controls.email.setValue(result.email) ;
      this.formGroup.controls.phone.setValue(result.phone) ;
      this.formGroup.controls.cpf.setValue(result.cpf) ;
      this.employeesId = result.id;
      this.myItems = result.knowledges;
      console.log(this.myItems)
    });
  }

  //ESSE METODO É UTILIZADO PARA SUBMETER A VALIDAÇÃO DO CADASTROS VIA API
  submitForm(event: Event){
    event.preventDefault();
    const formData = new FormData();
    formData.append('validated', this.validated === 'Validado' ? this.validated  : 'Não validado');
    this.employeeService.setEmployeeValidate(formData, this.employeesId);
  }

  // METODO UTILIZADO PARA RECUPERAR AS INFORMAÇÕES RECEBIDA DO COMPONETE BUTTON FILHO PARA SER ENVIADO VIA API PARA VALIDAÇÃO
  setValidate(validated: string){
    this.validated = validated;
  }

  // METODO RESPONSAVEL POR RECEBER OS DADOS ATRAVÉS DE ENVENT NGONCHANGE
  search(value: string) {
    this.search$.next(value); // envia o valor para o observable
  }

  // METODO RESPONSAVEL POR RECEBER INFORMAÇÕES PARA O FILTRO DE STATUS
  filterSearch(value: string){
    this.employeesList = this.allRegisters

    if (value === 'Todos'){
      return
    }

    if (value){
      this.employeesList = this.employeesList
        .filter(employee => employee.validated.includes(value));
    }

  }
}
