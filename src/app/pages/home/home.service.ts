import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  async verifySession(): Promise<any> {
    try {
      return await this.http.get('http://localhost:3000/verifySession').toPromise();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async getUser(): Promise<any> {
    try {
      return await this.http.get('http://localhost:3000/getUser').toPromise();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async updateUserCollections(updatedCollections: any): Promise<any> {
    try {
      return await this.http.put('http://localhost:3000/updateUserCollections', { collections: updatedCollections }).toPromise();
    } catch (error) {
      console.error('Erro ao adicionar coleção do usuário:', error);
    }
  }
}
