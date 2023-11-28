import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetectingService {

  constructor(private http: HttpClient) { }

  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    return this.http.post<any>('http://127.0.0.1:8000/imageApi/api/upload-image/', formData);
  }

  getData(): any {
    return this.http.get('http://127.0.0.1:8000/api/welcome/')
  }

  generateData(data: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('http://127.0.0.1:8000/chat/api/get-data/', {data}, {headers})
  }
  translate(data: any, language: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('http://127.0.0.1:8000/translate/api/translate-data/', [{language}, {data}], {headers})
  }
  readText(data: any, language: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('http://127.0.0.1:8000/readText/api/read-text/', [{language}, {data}], {headers})
  }
}
