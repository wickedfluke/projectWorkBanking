import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  private apiUrl = '/api/movements';  

  constructor(private http: HttpClient) {}

  listMovementsWithBalance(userId: string, number: number): Observable<any> {
    const params = new HttpParams().set('number', number.toString());
    return this.http.get<any>(`${this.apiUrl}/${userId}`, { params });
  }

  listMovementsByCategory(userId: string, categoryId: string, number: number): Observable<any> {
    const params = new HttpParams()
      .set('number', number.toString())
      .set('categoryId', categoryId);
    return this.http.get<any>(`${this.apiUrl}/category/${userId}`, { params });
  }

  listMovementsByDateRange(userId: string, number: number, startDate: string, endDate: string): Observable<any> {
    const params = new HttpParams().set('number', number.toString());
    const body = { startDate, endDate };
    return this.http.post<any>(`${this.apiUrl}/date-range/${userId}`, body, { params });
  }

  createPhoneMovement(userId: string, phoneNumber: string, operator: string, rechargeAmount: number): Observable<any> {
    const body = { phoneNumber, operator, rechargeAmount };
    return this.http.post<any>(`${this.apiUrl}/phone/${userId}`, body);
  }

  createTransferMovement(userId: string, receiverIban: string, transferAmount: number, description: string): Observable<any> {
    const body = { receiverIban, transferAmount, description };
    return this.http.post<any>(`${this.apiUrl}/transfer/${userId}`, body);
  }

  exportMovementsToCSV(number: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/export`, { number }, { responseType: 'text' });
  }

  exportMovementsByCategoryToCSV(number: number, categoryId: string): Observable<any> {
    const params = new HttpParams().set('categoryId', categoryId);
    return this.http.post(`${this.apiUrl}/export/category`, { number }, { params, responseType: 'text' });
  }

  exportMovementsByDateRangeToCSV(number: number, startDate: string, endDate: string): Observable<any> {
    const body = { startDate, endDate };
    return this.http.post(`${this.apiUrl}/export/date-range`, { number }, { responseType: 'text' });
  }
}
