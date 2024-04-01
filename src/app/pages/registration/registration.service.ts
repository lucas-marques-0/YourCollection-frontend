import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) { }

  async registerUser(userObject: object): Promise<any> {
    try {
      return await this.http.post('http://localhost:3000/registration', userObject).toPromise();
    } catch {
      return false;
    }
  }
}
