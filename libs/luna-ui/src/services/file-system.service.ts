
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  private static readonly STATIC_API_URL: string = "http://localhost:4200";

  constructor(private http: HttpClient) { }

  public ls(path: string) {
    path = encodeURIComponent(path);
    return this.http.get(`${FileSystemService.STATIC_API_URL}/ls?path=${path}`);
  }
}
