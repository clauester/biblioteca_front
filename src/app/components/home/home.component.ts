import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
usuario!: Usuario 
fecha = new Date()
constructor(){
  const usuarioData = localStorage.getItem('usuario');

  if (usuarioData) {
     this.usuario = JSON.parse(usuarioData);
    console.log('Usuario recuperado de localStorage:', this.usuario);
  }
}  

  ngOnInit(): void {
    

  }

}
