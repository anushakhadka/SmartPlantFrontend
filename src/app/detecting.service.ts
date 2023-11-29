import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

// Example in an Angular service
export const BASE_API_URL = 'http://18.219.12.79:8000';

@Injectable({
  providedIn: 'root'
})
export class DetectingService {

  constructor(private http: HttpClient) { }

  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    return this.http.post<any>(`${BASE_API_URL}/imageApi/api/upload-image/`, formData);
  }



  generateData(data: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${BASE_API_URL}/chat/api/get-data/`, {data}, {headers})
  }
  translate(data: any, language: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${BASE_API_URL}/translate/api/translate-data/`, [{language}, {data}], {headers})
  }
  readText(data: any, language: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${BASE_API_URL}/readText/api/read-text/`, [{language}, {data}], {headers})
  }
}
