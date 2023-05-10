import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any = this.authService.getUser();
  prestamos: any;
  error: boolean = false;
  errorMessage: string = '';
  hayPrestamos = false;

  public doughnutChartLabels: string[] = [ 'Cuotas Pendientes', 'Cuotaspagadas'];
  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';


  constructor(private authService: AuthService) { 
  }

  ngOnInit(): void {
    this.authService.verResumenPrestamos(this.user.cliente.username, this.user.cliente.password).then(
      (response: any) => {
        if (response.prestamos) {
          console.log('Se encontró prestamos');
          this.hayPrestamos =true;
          this.prestamos=response;
          this.doughnutChartData= {
            labels: this.doughnutChartLabels,
            datasets: [
              { data: [ this.prestamos.prestamos[0].cuotas_pendientes, this.prestamos.prestamos[0].cuotas_pagadas] }
            ]
          };
          console.log(this.prestamos)
        } else {
          console.log('No se encontró registros');
          this.hayPrestamos = false;
        }
      },
      (error: any) => {
        console.error('Error de Prestamos', error);
        console.log(error);
        if (error.status === 404) {
          this.errorMessage = 'No hay prestamos.';
        } else {
          this.errorMessage =
            'No hay prestamos. Por favor inténtelo de nuevo.';
        }
        this.error = true;
      }
    );
    //this.loan = this.authService.getLastLoan();
  }

}
