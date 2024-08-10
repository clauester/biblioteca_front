import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListaLibrosComponent } from './components/lista-libros/lista-libros.component';
import { HomeComponent } from './components/home/home.component';
import { ListaPrestamosComponent } from './components/lista-prestamos/lista-prestamos.component';
import { AgregarEditarLibroComponent } from './components/agregar-editar-libro/agregar-editar-libro.component';
import { AgregarEditarPrestamoComponent } from './components/agregar-editar-prestamo/agregar-editar-prestamo.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'lista-libros', component: ListaLibrosComponent },
  { path: 'lista-prestamos', component: ListaPrestamosComponent },
  { path: 'agregarlibro', component: AgregarEditarLibroComponent },
  { path: 'editarlibro/:id', component: AgregarEditarLibroComponent },
  { path: 'agregarprestamo', component: AgregarEditarPrestamoComponent },
  { path: 'editarprestamo/:id', component: AgregarEditarPrestamoComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
