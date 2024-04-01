import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {
  constructor(private http: HttpClient) { }

  private apiKey = 'e098547341a847d89c8b669a72f6f6f3';
  private apiUrl = 'https://api.rawg.io/api/games';

  async getSearchResults(searchText: string): Promise<any> {
    try {
      return await this.http.get(`${this.apiUrl}?search=${searchText}&key=${this.apiKey}`).toPromise();
    } catch (error) {
      console.error('Erro ao adicionar coleção do usuário:', error);
    }
  }

  async getUser(): Promise<any> {
    try {
      return await this.http.get('http://localhost:3000/verifySession').toPromise();
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
