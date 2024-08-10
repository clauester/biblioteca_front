import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from 'src/app/interfaces/Libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-agregar-editar-libro',
  templateUrl: './agregar-editar-libro.component.html',
  styleUrls: ['./agregar-editar-libro.component.css']
})
export class AgregarEditarLibroComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id: number;
  operacion: string ='Agregar';

  constructor(
    private fb: FormBuilder,
    private _libroService: LibroService, 
    private _snackBar: MatSnackBar,
    private router: Router, 
    private aRoute: ActivatedRoute){

    this.form = this.fb.group({
      
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      categoria: ['', Validators.required],
      stock: [0, [Validators.required,Validators.pattern("^[0-9]*$")]],
      
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    console.log(this.id)
   
  }


  ngOnInit(): void {
    if(this.id !=0){
      this.operacion = "Editar";
      this.obtenerDatosLibro(this.id);
    }
  }

  obtenerDatosLibro(id: number){
    this.loading = true;
    this._libroService.getLibro(id).subscribe(data => {
      this.form.patchValue({ //setea los datos del form con los obtenidos de la bd
       
        nombre: data.nombre,
        autor: data.autor,
        categoria: data.categoria,
        stock: data.stock,
     
      })

      this.loading = false;
    })

  }

  agregarEditarLibro(){
  
    const dataLibro : Libro = {
      nombre: this.form.value.nombre,
      autor: this.form.value.autor,
      categoria: this.form.value.categoria,
      stock: this.form.value.stock,
      
    }

    if(this.id != 0){
      dataLibro.id = this.id;
      this.editarLibro(this.id, dataLibro);
    } else {
      this.agregarLibro(dataLibro);
    }
  }

  agregarLibro(dataLibro: Libro){
    this.loading = true;
    //enviamos obj al be
    
    this._libroService.addLibro(dataLibro).subscribe(data => {
      
      this.loading = false;
      this.mensajeExito("registrado");
      this.router.navigate(['/lista-libros']);
    })
  }

  editarLibro(id: number, dataLibro: Libro){
    this.loading = true;
    this._libroService.updateLibro(id, dataLibro).subscribe(() => {
      this.loading = false;
      this.mensajeExito("actualizado");
      this.router.navigate(['/lista-libros']);
    })
  }

  mensajeExito(operacion: string){
    this._snackBar.open(`Libro ${operacion} exitosamente`, '',{
      duration: 3500,
      horizontalPosition:'center',
      verticalPosition: 'top',
    });
  }


}
