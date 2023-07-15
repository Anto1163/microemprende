import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent {
  isLoggedIn: boolean= false;
  
  constructor(private authService: AuthService, private router:Router){}

  ngOnInit(): void {
    // Suscríbete al estado de inicio de sesión del usuario administrador
    this.authService.isAdminLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  adminlogout(){
    this.authService.setAdminLoggedIn(false);
    this.router.navigate(['/']);
  }
}
