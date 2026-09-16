import { Routes } from '@angular/router';
import { ProductoLista } from './producto-lista/producto-lista';
import { ProductoForm } from './producto-form/producto-form';

export const routes: Routes = [
  { path: '', component: ProductoLista },
  { path: 'agregar-producto', component: ProductoForm },
];