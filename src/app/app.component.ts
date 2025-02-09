import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { BarraAdministradorComponent } from './components/barra-administrador/barra-administrador.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarraAdministradorComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'market-wawa-frontend';
  usuario: any = null;
  isLoggedIn: boolean = false; 

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkUserStatus(); // 🔥 Forzar recarga del usuario después de navegar
      }
    });
  }

  ngOnInit() {
    this.checkUserStatus();
  }

  checkUserStatus() {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      this.usuario = JSON.parse(userData);
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
