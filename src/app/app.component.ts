import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showNavBar: boolean = false;
  title = 'webmicroemprende';
  isEspañol = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService,
    private location: Location,
    private modalService:NgbModal,
    
  ) {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.showNavBar = isLoggedIn;
    });
  }

  ngOnInit() {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    history.pushState(null, '', window.location.href);
    this.location.subscribe(() => {
      history.pushState(null, '', window.location.href);
    });
  }

  switchLanguage() {
    if (this.isEspañol === true) {
      this.translate.use('qu');
      this.isEspañol = false;
    } else if (this.isEspañol === false) {
      this.translate.use('es');
      this.isEspañol = true;
    }
  }

  onSalirClick(): void {
    const confirmacion = window.confirm('¿Estás seguro de que deseas salir?');
    if (confirmacion) {
      this.logout()

      this.router.navigate(['/']);
    } else {

    }
  }

  logout() {
    // Eliminar información de sesión aquí
    this.authService.changeLoggedIn(false);
  }
}
