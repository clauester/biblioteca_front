import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/Usuario';
import { NavbarService } from 'src/app/services/navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading: boolean = false;
  form: FormGroup;

  operacion: string ='Agregar';
  listaLibros: any[]= [0];
  listaUsuarios: any[]= [0];

  
  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private router: Router, 
    private _navbarService: NavbarService,
    private aRoute: ActivatedRoute){
        
      this.form = this.fb.group({
        email: ['',[ Validators.required, Validators.email]],
        contrasena: ['', Validators.required],
        
      })
     
  
      
    }
  

iniciarSesion() {
  this._usuarioService.getUsuarios().subscribe(data => {
    const encontrado: Usuario | undefined = data.find(dta => 
      dta.correo_electronico === this.form.value.email && 
      dta.contrasena === this.form.value.contrasena
    );

    if (encontrado) {
      // Convertir el objeto Usuario a JSON y almacenarlo en localStorage
      localStorage.setItem('usuario', JSON.stringify(encontrado));
      
      console.log('Usuario encontrado y almacenado en localStorage:', encontrado);
      this._navbarService.triggerUpdate();
      this.router.navigate(['/pagina-principal']);
      

    } else {
      this._snackBar.open('Correo o contraseña incorrectos', '', {
        duration: 3000,
      });
    }
  });
}

    
}
