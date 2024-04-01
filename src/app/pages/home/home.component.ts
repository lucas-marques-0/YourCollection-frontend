import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import * as uuid from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService, private router: Router) { }

  username: string = '';
  userData: any;
  collections: Array<any> = [];
  editMode: Array<boolean> = [];

  async ngOnInit() {
    const verifySession = await this.homeService.verifySession();
    if(verifySession.session == null) this.router.navigate(['']);
    this.userData = verifySession.session.user;
    this.username = this.userData.user_metadata.display_name;
    this.collections = this.userData.user_metadata.collections;
  }

  async addCollection() {
    this.collections.push(this.createNewCollection());
    this.updateUserCollections();
  }

  createNewCollection() {
    return {
      id: uuid.v4(),
      name: Math.random().toString(36).substr(2, 9),
      collection: []
    }
  }
  
  async updateUserCollections() {
    const addCollection = await this.homeService.updateUserCollections(this.collections);
    if(!addCollection) console.log('Erro!')
  }

  editCollectionName(index: number, newName: string) {
    this.collections[index].name = newName;
    this.toggleEdit(index);
    this.updateUserCollections();
  }

  toggleEdit(index: number) {
    this.editMode[index] = !this.editMode[index];
  }

  removeCollection(id: string) {
    this.collections = this.collections.filter(collection => collection.id !== id);
    this.updateUserCollections();
  }

  async viewCollection(id: string) {
    this.router.navigate([`collection/${id}`]);
  }
}
