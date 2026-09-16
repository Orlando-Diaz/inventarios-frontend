import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Producto } from '../models/Producto';
import { ProductoService } from '../services/productoService';

@Component({
  selector: 'app-producto-lista',
  imports: [CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './producto-lista.html',
  styleUrl: './producto-lista.css',
})
export class ProductoLista implements OnInit {

  productos = signal<Producto[]>([]);
  terminoBusqueda: string = '';

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerTodos().subscribe({
      next: (data) => {
        this.productos.set(data);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  buscar(): void {
    const termino = this.terminoBusqueda.trim();

    if (!termino) {
      this.cargarProductos();
      return;
    }

    // Si el término es numérico, buscar por id; si no, por descripción
    if (!isNaN(Number(termino))) {
      this.productoService.obtenerPorId(Number(termino)).subscribe({
        next: (producto) => {
          this.productos.set([producto]);
        },
        error: (err) => {
          console.error('Producto no encontrado:', err);
          this.productos.set([]);
        }
      });
    } else {
      this.productoService.buscarPorDescripcion(termino).subscribe({
        next: (data) => {
          this.productos.set(data);
        },
        error: (err) => {
          console.error('Error al buscar productos:', err);
        }
      });
    }
  }

  limpiarBusqueda(): void {
    this.terminoBusqueda = '';
    this.cargarProductos();
  }

  eliminar(id: number): void {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmar) return;

    this.productoService.eliminar(id).subscribe({
      next: () => {
        this.productos.update(lista => lista.filter(p => p.idProducto !== id));
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
      }
    });
  }
}