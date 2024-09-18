import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EyeStateService {
  private isOpenSubject = new BehaviorSubject<boolean>(true); // Stato iniziale
  isOpen$ = this.isOpenSubject.asObservable();

  setOpenState(isOpen: boolean): void {
    this.isOpenSubject.next(isOpen);
  }
}
