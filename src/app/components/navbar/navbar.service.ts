import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  constructor(private http: HttpClient) { }

  async signOut(): Promise<any> {
    try {
      return await this.http.post('http://localhost:3000/signout', {}).toPromise();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }
  
}
