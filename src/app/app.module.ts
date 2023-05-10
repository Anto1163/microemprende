import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { Router, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { EvaluacionCrediticiaComponent } from './evaluacion-crediticia/evaluacion-crediticia.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { PerfilComponent } from './perfil/perfil.component';

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
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistroClienteComponent,
    EvaluacionCrediticiaComponent,
    PrestamosComponent,
    PerfilComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
