import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  editacliente!: FormGroup;
  editing = false;

  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.createForm();
  }

  createForm() {
    this.editacliente = this.formBuilder.group({
      nombre: [this.user.cliente.nombre, Validators.required],
      apellido: [this.user.cliente.apellido, Validators.required],
      direccion: [this.user.cliente.direccion, Validators.required],
      telefono: [this.user.cliente.telefono, Validators.required],
      email: [this.user.cliente.email, Validators.required],
      password: [this.user.cliente.password, Validators.required],
    });
  }

  editarCliente() {
    this.editing = true;
  }

  onSave() {
    if (this.editacliente.valid) {
      const cliente = this.editacliente.value;
      cliente.id_cliente = this.user.cliente.id_cliente; // O utiliza el ID correcto de tu modelo

      this.authService
        .modificarCliente(cliente)
        .then((response: any) => {
          console.log(response);
          this.editing = false;
          // Actualizar los datos del usuario en el servicio AuthService
          this.authService.setUser(cliente);

          // Mostrar un aviso al usuario
          this.router.navigate(['/logout']);
        })
        .catch((error: any) => {
          console.error('Error al modificar cliente', error);
        });
    }
  }

  onCancel() {
    this.editing = false;
  }
}
