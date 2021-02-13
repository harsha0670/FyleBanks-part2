import { Component, OnInit } from '@angular/core';

import { MatTableDataSource}  from '@angular/material/table';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit {

  displayedColumns = ['name','ifsc', 'address', 'city', 'district'];
  data: any;
  public response: any;

  constructor() { }

  ngOnInit() {
    //Parsing data from localstorage
    this.response = JSON.parse(localStorage.getItem('fav'));
    console.log(this.response);
    this.data = new MatTableDataSource(this.response);

    return this.response;
  }
}
