import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(private http: HttpClient) { }

  async verifySession(): Promise<any> {
    try {
      return await this.http.get('https://yourcollection-backend.onrender.com/verifySession').toPromise();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async updateUserCollections(updatedCollections: any): Promise<any> {
    try {
      return await this.http.put('https://yourcollection-backend.onrender.com/updateUserCollections', { collections: updatedCollections }).toPromise();
    } catch (error) {
      console.error('Erro ao adicionar coleção do usuário:', error);
    }
  }
}
