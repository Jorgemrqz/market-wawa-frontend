import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-administrador',
  standalone: true,
  imports: [],
  templateUrl: './barra-administrador.component.html',
  styleUrls: ['./barra-administrador.component.scss']
})
export class BarraAdministradorComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
