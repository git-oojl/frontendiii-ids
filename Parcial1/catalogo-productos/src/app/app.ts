import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { DisponibilidadPipe } from './disponibilidad.pipe';
import { Producto, ProductosService } from './productos.service';

@Component({
  imports: [CurrencyPipe, UpperCasePipe, DisponibilidadPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly productosService = inject(ProductosService);
  protected readonly productos: Producto[] = this.productosService.getProductos();
  protected readonly busqueda = signal('');
  protected readonly productosFiltrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    return this.productos.filter((producto) => producto.nombre.toLowerCase().includes(texto));
  });

  protected actualizarBusqueda(valor: string): void {
    this.busqueda.set(valor);
  }
}
