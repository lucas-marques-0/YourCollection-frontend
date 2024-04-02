import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(private http: HttpClient) { }

  private apiKey = 'e098547341a847d89c8b669a72f6f6f3';
  private apiUrl = 'https://api.rawg.io/api/games';

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

  async getGameInfos(id: any): Promise<any> {
    try {
      return await this.http.get(`${this.apiUrl}/${id}?key=${this.apiKey}`).toPromise();
    } catch(error) {
      console.error('Erro ao buscar informações do game:', error);
    }
  }
}
