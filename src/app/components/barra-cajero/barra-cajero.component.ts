import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-cajero',
  standalone: true,
  imports: [],
  templateUrl: './barra-cajero.component.html',
  styleUrls: ['./barra-cajero.component.scss']
})
export class BarraCajeroComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('usuario');  // Elimina la sesión
    this.router.navigate(['/login']);    // Redirige al login sin recargar la página
  }

  navigateTo(path: string) {
    this.router.navigate([path]);  // Redirige a la ruta deseada
  }
}
