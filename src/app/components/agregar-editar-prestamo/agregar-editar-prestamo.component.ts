import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Prestamo } from 'src/app/interfaces/Prestamo';
import { LibroService } from 'src/app/services/libro.service';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Libro } from 'src/app/interfaces/Libro';
interface FormatoPrestamo {
    id?: number,
    libroId: number,
    usuarioId: number,
    fecha_prestamo: Date,
    fecha_devolucion: Date,
    estado: string

  }
@Component({
  selector: 'app-agregar-editar-prestamo',
  templateUrl: './agregar-editar-prestamo.component.html',
  styleUrls: ['./agregar-editar-prestamo.component.css']
})

export class AgregarEditarPrestamoComponent implements OnInit {
  
  loading: boolean = false;
  form: FormGroup;
  id: number;
  operacion: string ='Agregar';
  listaLibros: any[]= [0];
  listaUsuarios: any[]= [0];

 

  constructor(
    private fb: FormBuilder,
    private _prestamoService: PrestamoService, 
    private _libroService: LibroService,
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private router: Router, 
    private aRoute: ActivatedRoute){
        
    this.form = this.fb.group({

      id_libro: ["", Validators.required],
      id_usuario: ["", Validators.required],
      fecha_prestamo: ['', Validators.required],
      fecha_devolucion: ['', Validators.required],
      estado: ['', Validators.required]
      
    })
   

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    
  }


  ngOnInit(): void {
    
    if(this.id !=0){
      this.operacion = "Editar";
      this.obtenerDatosPrestamo(this.id);
    }
    this.obtenerIdsLibros()
    this.obtenerIdsUsuarios()
    
  }

  obtenerDatosPrestamo(id: number){
    this.loading = true;
    this._prestamoService.getPrestamo(id).subscribe(data => {
      this.form.patchValue({ //setea los datos del form con los obtenidos de la bd
        id_libro: data.libro.id,
        id_usuario: data.usuario.id,
        fecha_prestamo: data.fecha_prestamo,
        fecha_devolucion: data.fecha_devolucion,
        estado: data.estado
       
      })

      this.loading = false;
    })

  }
  obtenerIdsLibros(){
   this._libroService.getLibros().subscribe(data => {
          this.listaLibros =  data.map(usuario => usuario.id  )
         console.log(data.map(usuario => usuario.id ))
    })
    

    
  }
  obtenerIdsUsuarios(){
    this._usuarioService.getUsuarios().subscribe(data => {
         this.listaUsuarios = data.map(usuario => ({
      id: usuario.id,
      cedula: usuario.cedula
    }));
          console.log(data.map(usuario => ({
      id: usuario.id,
      cedula: usuario.cedula
    })))
     })
     
 
   }

  agregarEditarPrestamo(){
    
    const dataPrestamo : FormatoPrestamo = {

      libroId: this.form.value.id_libro,
      usuarioId:  this.form.value.id_usuario,
      fecha_prestamo: new Date(this.form.value.fecha_prestamo),
      fecha_devolucion: new Date(this.form.value.fecha_devolucion),
      estado: this.form.value.estado
    }

 

    if(this.id != 0){
        dataPrestamo.id = this.id;
        console.log(dataPrestamo)
      this.editarPrestamo(this.id, dataPrestamo);
    } else {
      this.agregarPrestamo(dataPrestamo);
    }
  }

  agregarPrestamo(dataPrestamo: FormatoPrestamo){
    this.loading = true;
    //enviamos obj al be
    
    this._prestamoService.addPrestamo(dataPrestamo).subscribe(data => {
      
      this.loading = false;
      this.mensajeExito("registrado");
      this.router.navigate(['/lista-prestamos']);
    })
  }

  editarPrestamo(id: number, dataPrestamo: FormatoPrestamo){
    this.loading = true;
    this._prestamoService.updatePrestamo(id, dataPrestamo).subscribe(() => {
      this.loading = false;
      this.mensajeExito("actualizado");
      this.router.navigate(['/lista-prestamos']);
    })
  }

  mensajeExito(operacion: string){
    this._snackBar.open(`Prestamo ${operacion} exitosamente`, '',{
      duration: 3500,
      horizontalPosition:'center',
      verticalPosition: 'top',
    });
  }


}
