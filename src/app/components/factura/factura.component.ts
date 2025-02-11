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
    id_cliente: new FormControl(''),
    productoSeleccionado: new FormControl(''),
    cantidad: new FormControl(1)
  });

  facturaForm = new FormGroup({
    id_cliente: new FormControl(''),
    productoSeleccionado: new FormControl(''),
    cantidad: new FormControl(1)
  });

  buscando = false;
  clienteExiste = false;
  mensaje = '';
  productos: any[] = [];
  productoSeleccionado: any;
  cantidad: number = 1;
  detallesFactura: any[] = [];
  totalFactura: number = 0;
  idFactura: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarProductos();
    console.log('Productos disponibles:', this.productos);
    this.clienteForm.get('id_cliente')?.disable();
  }  

  cargarProductos() {
    this.http.get('http://localhost:3000/api/productos').subscribe(
      (data: any) => {
        this.productos = data;
        console.log('Productos cargados:', this.productos); // Verificar los productos cargados
      },
      () => console.error('Error al cargar productos')
    );
  }

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
        console.log('Cliente encontrado:', cliente);  // Verifica la respuesta del servidor
        this.buscando = false;
        this.clienteExiste = true;
        this.mensaje = 'Cliente encontrado ✅';
        this.clienteForm.patchValue(cliente);
      },
      () => {
        this.buscando = false;
        this.clienteExiste = false;
        this.mensaje = 'Cliente no encontrado, puede registrarlo.';
        this.clienteForm.reset({ cedula });
      }
    );
  }  

  registrarCliente() {
    if (this.clienteForm.valid) {
      this.http.post('http://localhost:3000/api/clientes', this.clienteForm.value).subscribe(
        () => {
          alert('Cliente registrado con éxito');
          this.buscarCliente();
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

  seleccionarProducto() {
    // Obtener el id del producto seleccionado desde el formulario
    const productoId = Number(this.facturaForm.get('productoSeleccionado')?.value);
    console.log('Producto seleccionado con ID:', productoId);
  
    // Verificar si el productoId es válido
    if (isNaN(productoId) || productoId <= 0) {
      alert('Por favor, seleccione un producto válido.');
      return;
    }
  
    // Buscar el producto con el id seleccionado en el listado de productos
    this.productoSeleccionado = this.productos.find(p => p.id_producto === productoId);
  
    // Verificación adicional para asegurarse de que el producto sea válido
    if (this.productoSeleccionado) {
      console.log('Producto encontrado:', this.productoSeleccionado);
      console.log('Precio del producto:', this.productoSeleccionado.precio_venta);  // Asegúrate de usar el precio correcto
    } else {
      // Si no se encuentra el producto, mostrar un mensaje de error
      alert('Producto no encontrado. Asegúrese de que el producto esté en la lista.');
    }
  }  

  agregarProducto() {
    // Obtener el valor de cantidad desde el formulario y asegurarse de que no sea nulo o indefinido
    let cantidad = this.facturaForm.get('cantidad')?.value;
    
    // Asegurarse de que cantidad sea un número válido
    cantidad = Number(cantidad);
    
    // Verificar que la cantidad es un número válido
    if (isNaN(cantidad) || cantidad < 1) {
      alert('Por favor, ingrese una cantidad válida mayor a 0.');
      return;
    }
  
    // Verificar si el producto seleccionado es válido
    if (!this.productoSeleccionado) {
      alert('Por favor, seleccione un producto válido.');
      return;
    }
  
    // Asegurarse de que el precio sea un número y no sea NaN
    const precio = Number(this.productoSeleccionado.precio_venta);
  
    if (isNaN(precio) || precio <= 0) {
      alert('El precio del producto no es válido.');
      return;
    }
  
    const subtotal = cantidad * precio;
  
    // Verificar si el producto ya está en la lista de detalles
    const productoExistente = this.detallesFactura.find(detalle => detalle.id_producto === this.productoSeleccionado.id_producto);
  
    if (productoExistente) {
      // Si el producto ya está en la lista, solo actualizamos la cantidad y el subtotal
      productoExistente.cantidad += cantidad;
      productoExistente.subtotal = productoExistente.cantidad * productoExistente.precio_unitario;
    } else {
      // Si el producto no está en la lista, lo agregamos
      this.detallesFactura.push({
        id_producto: this.productoSeleccionado.id_producto,
        nombre: this.productoSeleccionado.nombre,
        cantidad: cantidad,
        precio_unitario: precio,
        subtotal: subtotal
      });
    }
  
    // Actualizar el total de la factura
    this.totalFactura += subtotal;
  
    // Resetear el campo cantidad después de agregar el producto
    this.facturaForm.get('cantidad')?.reset(1);
  }  

// En tu componente Angular, al crear la factura:

crearFactura() {
  const idCliente = this.clienteForm.get('id_cliente')?.value;
  const idUsuario = localStorage.getItem('id_usuario');
  const email = this.clienteForm.get('email')?.value;
  console.log('id_cliente:', idCliente);  // Verifica el id_cliente
  console.log('id_usuario desde localStorage:', idUsuario);  // Verifica el id_usuario
  
  if (!idCliente || !idUsuario || this.detallesFactura.length === 0) {
    alert('Debe seleccionar un cliente, estar logueado y agregar productos.');
    return;
  }
  const facturaData = {
    id_cliente: idCliente,
    id_usuario: idUsuario,  // Usar el id_usuario obtenido del almacenamiento local
    total: this.totalFactura,
    detallesFactura: this.detallesFactura,  // Los detalles de la factura
    email:email
  };

  this.http.post('http://localhost:3000/api/facturas/crear-completa', facturaData).subscribe(
    (response: any) => {
      console.log('Factura creada exitosamente:', response);
      this.idFactura = response.id_factura;
      alert('Factura creada exitosamente');
      
      // Resetear los detalles de la factura
      this.detallesFactura = [];
      this.totalFactura = 0;
      this.clienteForm.reset();
      
      console.log('Estado después de la creación de factura:');
      console.log('detallesFactura:', this.detallesFactura);
      console.log('totalFactura:', this.totalFactura);
      console.log('clienteForm:', this.clienteForm.value);
    },
    (error) => {
      console.error('Error al crear la factura:', error);
      alert('Error al crear la factura');
    }
  );
}


  guardarDetallesFactura() {
    if (!this.idFactura) return;

    const requests = this.detallesFactura.map(detalle => {
      const detalleData = {
        id_factura: this.idFactura,
        id_producto: detalle.id_producto,
        cantidad: detalle.cantidad,
        precio_unitario: detalle.precio_unitario,
        subtotal: detalle.subtotal
      };
      return this.http.post('http://localhost:3000/api/detalle_factura', detalleData);
    });

    Promise.all(requests).then(
      () => {
        alert('Factura creada exitosamente');
        this.detallesFactura = [];
        this.totalFactura = 0;
        this.clienteForm.reset();
      },
      () => alert('Error al guardar detalles de factura')
    );
  }
}
