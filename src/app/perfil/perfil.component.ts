import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  editacliente!: FormGroup;
  editing = false;

  user: any = this.authService.getUser();

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {}

  editarCliente() {
    this.editing = true;
  }

  onSave() {
    // Aquí deberías guardar los cambios en el servidor
    this.editing = false;
  }

  onCancel() {
    this.editing = false;
  }
}
