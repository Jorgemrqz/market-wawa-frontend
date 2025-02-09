import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-factura',
  standalone: true,
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
  imports: [ReactiveFormsModule, CommonModule] 
})
export class FacturaComponent {
  clienteForm = new FormGroup({
    cedula: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    id_cliente: new FormControl('') // Para guardar el ID del cliente si existe
  });

  buscando = false;
  clienteExiste = false;
  mensaje = '';

  constructor(private http: HttpClient) {}

  buscarCliente() {
    const cedula = this.clienteForm.get('cedula')?.value;
    if (!cedula) {
      this.mensaje = 'Por favor, ingrese una cédula válida.';
      return;
    }

    this.buscando = true;
    this.mensaje = 'Buscando cliente...';

    this.http.get(`http://localhost:3000/api/clientes/cedula/${cedula}`).subscribe(
      (cliente: any) => {
        this.buscando = false;
        this.clienteExiste = true;
        this.mensaje = 'Cliente encontrado ✅';

        // Se guarda también el ID del cliente
        this.clienteForm.patchValue(cliente);
      },
      () => {
        this.buscando = false;
        this.clienteExiste = false;
        this.mensaje = 'Cliente no encontrado, puede registrarlo.';
        this.clienteForm.reset({ cedula }); // Mantiene la cédula y limpia los demás campos
      }
    );
  }

  registrarCliente() {
    if (this.clienteForm.valid) {
      this.http.post('http://localhost:3000/api/clientes', this.clienteForm.value).subscribe(
        () => {
          alert('Cliente registrado con éxito');
          this.buscarCliente(); // Busca el cliente recién creado
        },
        () => alert('Error al registrar cliente')
      );
    }
  }

  actualizarCliente() {
    const idCliente = this.clienteForm.get('id_cliente')?.value;
    if (!idCliente) {
      alert('No se puede actualizar un cliente sin ID.');
      return;
    }

    this.http.put(`http://localhost:3000/api/clientes/${idCliente}`, this.clienteForm.value).subscribe(
      () => alert('Cliente actualizado con éxito'),
      () => alert('Error al actualizar cliente')
    );
  }
}
