import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovementService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) { }
}
