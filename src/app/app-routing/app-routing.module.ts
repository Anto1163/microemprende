import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RegistroClienteComponent } from '../registro-cliente/registro-cliente.component';import { EvaluacionCrediticiaComponent } from '../evaluacion-crediticia/evaluacion-crediticia.component';
import { PrestamosComponent } from '../prestamos/prestamos.component';
import { AdminBIComponent } from '../admin-bi/admin-bi.component';
import { PerfilComponent } from '../perfil/perfil.component';

import { AuthGuard } from '../auth.guard';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminComponent } from '../admin/admin.component';
import { AdminEvaluacionCrediticiaComponent } from '../admin-evaluacion-crediticia/admin-evaluacion-crediticia.component';
import { AdminClientesComponent } from '../admin-clientes/admin-clientes.component';
import { AdminPrestamosComponent } from '../admin-prestamos/admin-prestamos.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: AdminLoginComponent },
      { path: 'dashboard', component: AdminBIComponent },
      { path: 'evaluacion-credito', component: AdminEvaluacionCrediticiaComponent},
      { path: 'clientes', component: AdminClientesComponent},
      { path: 'prestamos', component: AdminPrestamosComponent}
    ],
  },
  { path: 'registro', component: RegistroClienteComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'prestamos', component: PrestamosComponent, canActivate: [AuthGuard], },
  { path: 'evaluacion-crediticia', component: EvaluacionCrediticiaComponent, canActivate: [AuthGuard], },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
  { path: 'logout', redirectTo: '', canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
