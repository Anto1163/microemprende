import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoCliente } from '../info-cliente';
import { AuthService } from '../auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-evaluacion-crediticia',
  templateUrl: './evaluacion-crediticia.component.html',
  styleUrls: ['./evaluacion-crediticia.component.scss'],
})
export class EvaluacionCrediticiaComponent {
  fechaActual: string;
  user: any = this.authservice.getUser();
  rating: number = 0;
  infoClienteForm!: FormGroup;

  sectorTrabajoOptions = [
    'Agricultura',
    'Pesca',
    'Minería',
    'Manufactura',
    'Construcción',
    'Energía y servicios públicos',
    'Turismo',
    'Tecnología',
    'Servicios empresariales',
    'Transporte y logística',
    'Comercio',
    'Educación',
    'Salud',
    'Servicios financieros y banca',
    'Seguros',
    'Inmobiliario',
    'Medios de comunicación y entretenimiento',
    'Servicios públicos y gubernamentales',
  ];
  tipoPeriodoOptions = ['Mensual', 'Semanal'];

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    public activeModal: NgbActiveModal
  ) {
    this.createForm();
    this.fechaActual = new Date().toISOString().slice(0, 10);
  }

  createForm() {
    this.infoClienteForm = this.formBuilder.group({
      sector_trabajo: ['', Validators.required],
      tipo_periodo: ['', Validators.required],
      pago_disponible: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      ingresos: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      monto_prestamo: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
    });
  }

  onSubmit() {
    console.log(this.user);
    const newInfoCliente = new InfoCliente(
      this.user.cliente.id_cliente,
      this.infoClienteForm.get('sector_trabajo')?.value,
      this.infoClienteForm.get('monto_prestamo')?.value,
      this.infoClienteForm.get('tipo_periodo')?.value,
      this.infoClienteForm.get('pago_disponible')?.value,
      this.infoClienteForm.get('ingresos')?.value
    );
    this.authservice.modificarInfoCliente(newInfoCliente).then(
      (response: any) => {
        console.log(response);
        this.submitRating();
      },
      (error: any) => {
        console.error('Error al modificar información del cliente', error);
      }
    );
  }

  submitRating() {
    // Enviar la valoración al servidor
    this.authservice
      .registrarValoracion(
        this.user.cliente.id_cliente.toString(),
        'evaluacion crediticia',
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