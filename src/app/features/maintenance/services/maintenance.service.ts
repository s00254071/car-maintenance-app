import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance, CreateMaintenanceDto, UpdateMaintenanceDto } from '../models/maintenance';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1/maintenance';

  getMaintenance(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.apiUrl);
  }

  getMaintenanceById(id: string): Observable<Maintenance> {
    return this.http.get<Maintenance>(`${this.apiUrl}/${id}`);
  }

  addMaintenance(record: CreateMaintenanceDto): Observable<Maintenance> {
    return this.http.post<Maintenance>(this.apiUrl, record);
  }

  updateMaintenance(id: string, changes: UpdateMaintenanceDto): Observable<Maintenance> {
    return this.http.put<Maintenance>(`${this.apiUrl}/${id}`, changes);
  }

  deleteMaintenance(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}