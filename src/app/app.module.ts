import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListaLibrosComponent } from './components/lista-libros/lista-libros.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ListaPrestamosComponent } from './components/lista-prestamos/lista-prestamos.component';
import { AgregarEditarLibroComponent } from './components/agregar-editar-libro/agregar-editar-libro.component';
import { AgregarEditarPrestamoComponent } from './components/agregar-editar-prestamo/agregar-editar-prestamo.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ListaLibrosComponent,
    ListaPrestamosComponent,
    AgregarEditarLibroComponent,
    AgregarEditarPrestamoComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
