import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'registers', loadChildren: () => import('./pages/registers/registers.module').then(m => m.RegistersModule) },
  { path: '', redirectTo: "registers", pathMatch: "full"},
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
