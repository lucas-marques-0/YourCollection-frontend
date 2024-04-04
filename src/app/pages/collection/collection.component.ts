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
  pageCollectionGames: any = [];

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
    this.getGameInfos(this.pageCollection);
  }

  removeGame(gameID: any) {
    this.pageCollectionGames = this.pageCollectionGames.filter((game: any) => game.id !== gameID);
    this.pageCollection = this.pageCollection.filter((id: any) => id !== gameID.toString());
    const collectionObj = this.allCollections.filter((collection: any) => collection.id == this.collectionID);
    collectionObj[0].collection = this.pageCollection;
    this.updateUserCollections();
  }

  async getGameInfos(collection: any) {
    for(let gameID of collection) {
      const gameObj = await this.collectionService.getGameInfos(gameID);
      this.pageCollectionGames.push(gameObj)
    }
  }

  async updateUserCollections() {
    const addCollection = await this.collectionService.updateUserCollections(this.allCollections);
    if(!addCollection) console.log('Erro!')
  }
}
