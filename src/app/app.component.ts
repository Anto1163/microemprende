import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showNavBar: boolean = true;
  title = 'webmicroemprende';

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.showNavBar = isLoggedIn;
    });
  }

  logout() {
    // Eliminar información de sesión aquí
          this.authService.changeLoggedIn(false);
  }
}
