import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  error: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    if (!this.username || !this.password) {
      this.error = true;
      this.errorMessage = 'Por favor ingrese su usuario y contraseña.';
      return;
    }
    this.authService.login(this.username, this.password).then(
      (response: any) => {
        if (response.cliente) {
          console.log('Inicio de sesión exitoso');
          this.authService.setUser(response);
          this.authService.changeLoggedIn(true);
          this.router.navigate(['/dashboard']);
        } else {
          console.log('Inicio de sesión fallido');
          this.error = true;
          this.errorMessage =
            'Usuario o contraseña incorrectos. Por favor inténtelo de nuevo.';
        }
      },
      (error: any) => {
        console.error('Error de inicio de sesión', error);
        console.log(error);
        if (error.status === 404) {
          this.errorMessage = 'El usuario no existe.';
        } else {
          this.errorMessage =
            'Error de inicio de sesión. Por favor inténtelo de nuevo.';
        }
        this.error = true;
      }
    );
  }
}
