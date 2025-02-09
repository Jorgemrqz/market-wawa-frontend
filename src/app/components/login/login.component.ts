import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  nombre_usuario: string = "";
  contrasenia: string = "";

  constructor(private auth:UserAuthService) { }

  
  login() {
    if (!this.nombre_usuario || !this.contrasenia) {
      alert("Por favor, completa todos los campos");
      return;
    }

    this.auth.login(this.nombre_usuario, this.contrasenia)
      .subscribe({
        next: (response) => {
          console.log("Login exitoso:", response);
          
          // Verificar si response contiene nombre_usuario antes de acceder a él
          if (response && response.nombre_usuario) {
            console.log("Usuario autenticado:", response.nombre_usuario);
          } else {
            console.error("Error: La respuesta no contiene el campo nombre_usuario");
          }
        },
        error: (error) => {
          console.error("Error de login:", error);
        },
      });
    }
}
