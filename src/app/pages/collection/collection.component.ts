import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from './collection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  constructor(private collectionService: CollectionService, private route: ActivatedRoute, private router: Router) { }

  collectionID: any;
  collectionName: any;
  allCollections: any;
  pageCollection: any;

  ngOnInit(): void {
    this.collectionID = this.route.snapshot.paramMap.get('id');
    this.getCollectionData(this.collectionID);
  }

  async getCollectionData(id: string) {
    const verifySession = await this.collectionService.verifySession();
    if(verifySession.session == null) this.router.navigate(['']);

    this.allCollections = verifySession.session.user.user_metadata.collections;
    const collectionObj = this.allCollections.filter((collection: any) => collection.id == id);
    this.pageCollection = collectionObj[0].collection;
    this.collectionName = collectionObj[0].name;
  }

  removeGame(gameID: any) {
    this.pageCollection = this.pageCollection.filter((collection: any) => collection.id !== gameID);
    const updatedCollections = this.allCollections.map((collection: any) => {
      if (collection.id === this.collectionID) {
        return { ...collection, collection: this.pageCollection };
      }
      return collection;
    });
    this.allCollections = updatedCollections;
    this.updateUserCollections();
  }

  async getGameImage(gameID: any) {
    const gameObj = await this.collectionService.getGameInfos(gameID);
    return gameObj.background_image;
  }

  async getGameName(gameID: any) {
    const gameObj = await this.collectionService.getGameInfos(gameID);
    return gameObj.name;
  }

  async updateUserCollections() {
    const addCollection = await this.collectionService.updateUserCollections(this.allCollections);
    if(!addCollection) console.log('Erro!')
  }
}