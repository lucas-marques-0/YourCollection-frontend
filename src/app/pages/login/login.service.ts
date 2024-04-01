import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  async login(email: string, password: string): Promise<any> {
    try {
      return await this.http.post('http://localhost:3000/login', { email: email, password: password }).toPromise();
    } catch {
      return false;
    }
  }
}
