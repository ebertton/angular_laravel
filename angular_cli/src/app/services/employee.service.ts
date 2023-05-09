import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  url_API = 'http://localhost/api'

  //INJETANDO O CLIENTE HTTP DO ANGLUAR PARA REQUISIÇÕES COM A API
  constructor(private http: HttpClient, private router: Router) { }

  //METODO RESPONSAVEL POR LISTAR TODOS OS CADASTROS
  getEmployees(){
    return this.http.get<any[]>(`${this.url_API}/employees`);
  }

  //METODO RESPONSAVGEL POR BUSCAR UM CADASTRO POR O ID
  getEmployee(id: number){
    return this.http.get<any>(`${this.url_API}/employees/${id}`);
  }

//METODO RESPONSAVEL POR ENVIAR OS DADOS PARA O CADASTRO ATRAVÉS DA API
  setEmployee(formData: FormData){
    return this.http.post(`${this.url_API}/employees`, formData).subscribe(
      response => {
        alert(response);

        this.router.navigate(['/registers']);

      },
      error => {
        if (error.error.errors.cpf){
          alert(error.error.errors.cpf);
        }
        if (error.error.errors.name){
          alert(error.error.errors.name);
        }
        if (error.error.errors.email){
          alert(error.error.errors.email);
        }
      }
    );
  }

  //METODO RESPONSAVEL POR ENVIAR O STATUS DE VALIDAÇÃO DO CADASTRO
  setEmployeeValidate(formData: FormData, id: number){

    const body = { validated: formData.get('validated') };

    return this.http.put<any>(`${this.url_API}/employees/${id}/validate`, body).subscribe(
      response => {
        alert(response);

      },
      error => {

      }
    );
  }


}
