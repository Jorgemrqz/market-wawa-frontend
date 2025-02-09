// barra-cajero.component.ts
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

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    localStorage.removeItem('usuario');  // Elimina la sesión
    this.router.navigate(['/login']);    // Redirige al login

    // Aquí actualizas el estado del usuario, es importante para reflejar el cambio de inmediato
    window.location.reload();  // Recarga la página para asegurar que la barra desaparezca
  }
}
