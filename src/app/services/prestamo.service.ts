import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Prestamo } from '../interfaces/Prestamo';
interface FormatoPrestamo {
  id?: number,
  libroId: number,
  usuarioId: number,
  fecha_prestamo: Date,
  fecha_devolucion: Date,
  estado: string

}
@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string ='api/Prestamo/';

  constructor(private http: HttpClient) { }

    getPrestamos(): Observable<Prestamo[]> {
      return this.http.get<Prestamo[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }
  
    getPrestamo(id: number): Observable<Prestamo> {
      return this.http.get<Prestamo>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }

    deletePrestamo(id: number): Observable<void>{
      return this.http.delete<void>(` ${this.myAppUrl}${this.myApiUrl}${id}`)
    }
    addPrestamo(dataPrestamo: FormatoPrestamo): Observable<FormatoPrestamo>{
      return this.http.post<FormatoPrestamo>(`${this.myAppUrl}${this.myApiUrl}`, dataPrestamo);
    }
  
    updatePrestamo(id: number, dataPrestamo: FormatoPrestamo): Observable<void>{
      return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, dataPrestamo);
    }
}
