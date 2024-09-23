import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../entities/category.entity';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = '/api/category';  

  constructor(private http: HttpClient) {}

  listCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/`);
  }
}
