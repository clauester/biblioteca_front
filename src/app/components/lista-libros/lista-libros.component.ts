import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Libro } from 'src/app/interfaces/Libro';

import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id', 'nombre', 'autor', 'categoria','stock','acciones'];
  dataSource = new MatTableDataSource<Libro>();
  loading: boolean=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private _snackBar: MatSnackBar, 
    private _libroService: LibroService){}
  

  ngOnInit():void{
    this.obtenerLibro();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
    if (this.dataSource.data.length>0){
      this.paginator._intl.itemsPerPageLabel='Items por Paginas'
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


obtenerLibro(){
  this.loading=true;
this._libroService.getLibros().subscribe(data=>
  {
    this.loading=false;
    console.log('Datos del libro:', data);
    this.dataSource.data=data
  },error=>{
    this.loading=false;
    alert('Hay un error de conexion')
  })

}

  eliminarLibro(id:number){
    this.loading=true;
    this._libroService.deleteLibro(id).subscribe(()=>{
    this.mensajeExito();
    this.loading=false;
    this.obtenerLibro();
});

  }
  mensajeExito(){
    this._snackBar.open('Libro eliminado exitosamente', '',{
      duration:2000,
      horizontalPosition:'right',
    });
   }
}
