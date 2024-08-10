import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor( private router: Router) {}
  estaLogueado: boolean = false;


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

}
