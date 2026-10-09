import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface DatosRegistro {
  nombreCompleto: string;
  correo: string;
  telefono: string;
  edad: number | null;
  contrasena: string;
  confirmacionContrasena: string;
}

@Component({
  imports: [FormsModule],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html'
})
export class Registro {
  // datos enlazados con los campos del formulario.
  datos: DatosRegistro = {
    nombreCompleto: '',
    correo: '',
    telefono: '',
    edad: null,
    contrasena: '',
    confirmacionContrasena: ''
  };

  datosEnviados: DatosRegistro | null = null;
  mensajeError = '';

  registrar(formulario: NgForm): void {
    // quitamos espacios innecesarios antes de validar los datos.
    this.datos.nombreCompleto = this.datos.nombreCompleto.trim();
    this.datos.correo = this.datos.correo.trim();
    this.datos.telefono = this.datos.telefono.trim();

    // evitamos enviar el formulario si falta un campo obligatorio.
    if (formulario.invalid || this.datos.nombreCompleto === '') {
      this.mensajeError = 'Revisa los campos marcados del formulario.';
      this.datosEnviados = null;
      return;
    }

    // aceptamos teléfonos escritos con espacios, guiones o paréntesis.
    const telefonoLimpio = this.datos.telefono.replace(/\D/g, '');
    if (telefonoLimpio.length !== 10) {
      this.mensajeError = 'El teléfono debe tener 10 dígitos.';
      this.datosEnviados = null;
      return;
    }

    // la edad debe ser un número entero entre 1 y 120.
    if (
      this.datos.edad === null ||
      !Number.isInteger(this.datos.edad) ||
      this.datos.edad < 1 ||
      this.datos.edad > 120
    ) {
      this.mensajeError = 'La edad debe estar entre 1 y 120 años.';
      this.datosEnviados = null;
      return;
    }

    // confirmamos que las dos contraseñas sean iguales.
    if (this.datos.contrasena !== this.datos.confirmacionContrasena) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      this.datosEnviados = null;
      return;
    }

    this.mensajeError = '';
    this.datosEnviados = { ...this.datos };
  }
}
