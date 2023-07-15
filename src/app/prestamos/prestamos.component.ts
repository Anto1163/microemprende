import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss'],
})
export class PrestamosComponent {
  prestamos: any;
  fechaActual: string;
  user: any = this.authservice.getUser();
  rating: number = 0;

  constructor(
    private authservice: AuthService,
    public activeModal: NgbActiveModal
  ) {
    this.fechaActual = new Date().toISOString().slice(0, 10);
  }

  ngOnInit(): void {
    this.prestamos = this.authservice.getPrestamos();
  }

  mostrarDetalles(prestamo: any): void {
    prestamo.mostrarDetalles = !prestamo.mostrarDetalles;
  }

  submitRating() {
    // Enviar la valoración al servidor
    this.authservice
      .registrarValoracion(
        this.user.cliente.id_cliente.toString(),
        'visualizar prestamos',
        this.fechaActual,
        this.rating.toString()
      )
      .then((response: any) => {
        console.log(response);
        this.activeModal.close();
      })
      .catch((error: any) => {
        console.error('Error al registrar valoración', error);
        // Realizar el manejo del error si es necesario
      });
  }

  setRating(stars: number) {
    this.rating = stars;
  }
}
