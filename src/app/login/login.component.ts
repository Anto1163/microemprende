import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  login(): void {
    if (!this.username || !this.password) {
      this.error = true;
      this.translate.get('error_login1').subscribe((translation: string) => {
        this.errorMessage = translation;
      });
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
          this.translate
            .get('error_login2')
            .subscribe((translation: string) => {
              this.errorMessage = translation;
            });
        }
      },
      (error: any) => {
        console.error('Error de inicio de sesión', error);
        console.log(error);
        if (error.status === 404) {
          this.translate
            .get('error_login3')
            .subscribe((translation: string) => {
              this.errorMessage = translation;
            });
        } else {
          this.translate
            .get('error_login4')
            .subscribe((translation: string) => {
              this.errorMessage = translation;
            });
        }
        this.error = true;
      }
    );
  }
}