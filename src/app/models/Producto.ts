export class Producto {
  idProducto: number;
  descripcion: string;
  precio: number;
  existencia: number;

  constructor(
    idProducto: number = 0,
    descripcion: string = '',
    precio: number = 0,
    existencia: number = 0
  ) {
    this.idProducto = idProducto;
    this.descripcion = descripcion;
    this.precio = precio;
    this.existencia = existencia;
  }
}