import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProjetoRegistroPonto';

  toggler = ''
  recebeInformacao(toggler: string){
    if (this.toggler === 'sidebar-wrapper__sb-sidenav-toggled'){
      this.toggler = ''
    }else{
      this.toggler = toggler;
    }
  }


  ngOnInit() {

  }
  editUser(item: any) {
    debugger;
  }
  deleteUser(item: any) {
    debugger;
  }
}
