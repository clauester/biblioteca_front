import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Libro } from 'src/app/interfaces/Libro';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string ='api/Libro/';

  constructor(private http: HttpClient) { }

    getLibros(): Observable<Libro[]> {
      return this.http.get<Libro[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }
  
    getLibro(id: number): Observable<Libro> {
      return this.http.get<Libro>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }

    deleteLibro(id: number): Observable<void>{
      return this.http.delete<void>(` ${this.myAppUrl}${this.myApiUrl}${id}`)
    }
    addLibro(dataLibro: Libro): Observable<Libro>{
      return this.http.post<Libro>(`${this.myAppUrl}${this.myApiUrl}`, dataLibro);
    }
  
    updateLibro(id: number, dataLibro: Libro): Observable<void>{
      return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, dataLibro);
    }
}
