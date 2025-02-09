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

  logout() {
    localStorage.removeItem('usuario'); // Elimina la sesión
    this.router.navigate(['/login']); // Redirige al login
  }
}
