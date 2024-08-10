import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private updateSubject = new Subject<void>();

  // Observable al que los componentes pueden suscribirse
  update$ = this.updateSubject.asObservable();

  // Método para emitir eventos de actualización
  triggerUpdate() {
    this.updateSubject.next();
  }
}
