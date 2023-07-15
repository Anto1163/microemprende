import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  isAuthenticated: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  public idClienteBusqueda: number | undefined;
  public fechaBusqueda: Date | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    // Verifica las credenciales del administrador utilizando el AuthService
    this.isAuthenticated = this.authService.loginAdmin(this.username, this.password);

    if (this.isAuthenticated) {
      // Redirige al dashboard del administrador si las credenciales son válidas
      this.router.navigate(['/admin/dashboard']);
      this.authService.setAdminLoggedIn(true);
    } else {
      // Muestra un mensaje de error o realiza alguna acción si las credenciales son incorrectas
      this.error=true;
      this.errorMessage='Revise sus credenciales'
    }
  }

  public buscarPrestamos() {
    // Realizar la lógica de búsqueda utilizando los valores de idClienteBusqueda y fechaBusqueda
    // Actualizar la lista de prestamos con los resultados de la búsqueda
  }
}
