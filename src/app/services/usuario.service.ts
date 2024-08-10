import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Prestamo } from '../interfaces/Prestamo';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string ='api/Usuario/';

  constructor(private http: HttpClient) { }

    getUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }
  
    getUsuario(id: number): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }

    deleteUsuario(id: number): Observable<void>{
      return this.http.delete<void>(` ${this.myAppUrl}${this.myApiUrl}${id}`)
    }
    addUsuario(dataUsuario: Usuario): Observable<Usuario>{
      return this.http.post<Usuario>(`${this.myAppUrl}${this.myApiUrl}`, dataUsuario);
    }
  
    updateUsuario(id: number, dataUsuario: Usuario): Observable<void>{
      return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, dataUsuario);
    }
}
