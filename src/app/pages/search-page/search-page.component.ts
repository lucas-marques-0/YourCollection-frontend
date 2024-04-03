import { Component, OnInit } from '@angular/core';
import { SearchPageService } from './search-page.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {
  constructor(private searchPageService: SearchPageService) {}

  searchText: any;
  searchResults: any;
  searchPageContainer: boolean = false;
  collectionList: any;
  gameID: any;
  selectedCollection: any;

  async ngOnInit(): Promise<any> {
    const userInfos = await this.searchPageService.getUser();
    this.collectionList = userInfos.session.user.user_metadata.collections;
  }

  async getSearchResults() {
    const getResults = await this.searchPageService.getSearchResults(this.searchText)
    this.searchResults = getResults.results;
  }

  openAddPage(gameID:any) {
    this.searchPageContainer = true;
    this.gameID = gameID;
  }

  addGame() {
    if (!this.selectedCollection) this.showAlert('Please, choose a collection.', 'error')
    else {
      const collectionObj = this.collectionList.filter((collection: any) => collection.id === this.selectedCollection);
      collectionObj[0].collection.push((this.gameID).toString());
      this.updateUserCollections();
      this.searchPageContainer = false;
    }
  }

  async updateUserCollections() {
    const updateCollection = await this.searchPageService.updateUserCollections(this.collectionList);
    if(!updateCollection) console.log('Erro!')
  }

  showAlert(message: any, type: any) {
    Swal.fire({
      title: message,
      icon: type,
      confirmButtonText: 'Got it!'
    });
  }
}