import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Prestamo } from 'src/app/interfaces/Prestamo';
import { PrestamoService } from 'src/app/services/prestamo.service';


@Component({
  selector: 'app-lista-prestamos',
  templateUrl: './lista-prestamos.component.html',
  styleUrls: ['./lista-prestamos.component.css']
})
export class ListaPrestamosComponent  implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id_prestamo', 'id_libro', 
    'nombre_libro', 'cedula_usuario','nombre_usuario',
    'fecha_prestamo','fecha_devolucion','estado','acciones'];
  dataSource = new MatTableDataSource<Prestamo>();
  loading: boolean=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private _snackBar: MatSnackBar, 
    private _prestamoService: PrestamoService){}
  

  ngOnInit():void{
    this.obtenerPrestamos();
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


obtenerPrestamos(){
  this.loading=true;
this._prestamoService.getPrestamos().subscribe(data=>
  {
    this.loading=false;
    console.log('Datos del libro:', data);
    this.dataSource.data=data
  },error=>{
    this.loading=false;
    alert('Hay un error de conexion')
  })

}

  eliminarPrestamo(id:number){
    this.loading=true;
    this._prestamoService.deletePrestamo(id).subscribe(()=>{
    this.mensajeExito();
    this.loading=false;
    this.obtenerPrestamos();
});

  }
  mensajeExito(){
    this._snackBar.open('Libro eliminado exitosamente', '',{
      duration:2000,
      horizontalPosition:'right',
    });
   }
}
