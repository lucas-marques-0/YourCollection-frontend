import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) { }

  async registerUser(userObject: object): Promise<any> {
    try {
      return await this.http.post('https://yourcollection-backend.onrender.com/registration', userObject).toPromise();
    } catch {
      return false;
    }
  }
}
