import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarService } from 'src/app/services/navbar.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  private subscription: Subscription | undefined;
  estaLogueado = localStorage.getItem('usuario');
 
  constructor( private router: Router,
    private _navbarService: NavbarService
  ) {
    // const usuarioData = localStorage.getItem('usuario');
    // if(usuarioData){
    //   this.estaLogueado = true
    // }
    // else{
    //   this.estaLogueado = false
    // }
  }
  ngOnInit() {
    // Suscribirse a los eventos de actualización
    this.subscription = this._navbarService.update$.subscribe(() => {
      this.updateNavbar();
    });
  }
  ngOnDestroy() {
    // Limpiar la suscripción para evitar fugas de memoria
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  updateNavbar() {
    this.estaLogueado = localStorage.getItem('usuario');
    // Lógica para actualizar el navbar
    console.log('Navbar actualizada');
  }


  paginaLibros(){
    this.router.navigate(['/lista-libros'])
  }
  // NuevaReserva(){
  //   this.router.navigate(['/NuevaReserva']);
  // }

  paginaPrestamos(){
    this.router.navigate(['/lista-prestamos']);
  }
paginaInicio(){
  this.router.navigate(['/home'])
}
cerrarSesion(){
  localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
    this.estaLogueado = ""
    this.ngOnInit()
}

}
