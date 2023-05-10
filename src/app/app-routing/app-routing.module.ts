import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RegistroClienteComponent } from '../registro-cliente/registro-cliente.component';import { EvaluacionCrediticiaComponent } from '../evaluacion-crediticia/evaluacion-crediticia.component';
import { PrestamosComponent } from '../prestamos/prestamos.component';
import { PerfilComponent } from '../perfil/perfil.component';

import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'registro', component: RegistroClienteComponent},
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  { path: 'prestamos', component: PrestamosComponent, canActivate: [AuthGuard]},
  { path: 'evaluacion-crediticia', component: EvaluacionCrediticiaComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'logout', redirectTo: '', canActivate: [AuthGuard]},
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
