import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';

import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { EvaluacionCrediticiaComponent } from './evaluacion-crediticia/evaluacion-crediticia.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminBIComponent } from './admin-bi/admin-bi.component';
import { VentanaInfoclienteComponent } from './ventana-infocliente/ventana-infocliente.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminComponent } from './admin/admin.component';
import { AdminEvaluacionCrediticiaComponent } from './admin-evaluacion-crediticia/admin-evaluacion-crediticia.component';
import { AdminClientesComponent } from './admin-clientes/admin-clientes.component';
import { AdminPrestamosComponent } from './admin-prestamos/admin-prestamos.component';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/');
}

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
    AdminBIComponent,
    VentanaInfoclienteComponent,
    AdminLoginComponent,
    AdminNavbarComponent,
    AdminComponent,
    AdminEvaluacionCrediticiaComponent,
    AdminClientesComponent,
    AdminPrestamosComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthGuard,
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
