import { Component, OnInit, ViewChild, ElementRef }  from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BankHttpService } from '../get-bank.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  displayedColumns = ['name','ifsc', 'address', 'city', 'district','favorite'];
  public City = [{'name':'BANGALORE'},{'name':'HYDERABAD'},{'name':'MUMBAI'},{'name':'CHENNAI'},{'name':'DELHI'}]
  
  dataSource: any;
  selection = new SelectionModel<Branch>(true, []);

  @ViewChild('button') button: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  val: string = 'BANGALORE';

  public value = [];
  public row;
  public element;

  isLoading: boolean = true;



  constructor(private _bankHttpService: BankHttpService, public dialog: MatDialog) {

    if (localStorage.getItem('fav') === '' || localStorage.getItem('fav') === null) { }
     else {
      this.value = JSON.parse(localStorage.getItem('fav'));
      console.log('from localStorage', this.value)
    }
    
  }
  

  cityDropdown(val) {
      this._bankHttpService.getBankBranches(this.val).subscribe((branches) => {
      this.isLoading = false;

      this.dataSource = new MatTableDataSource(branches);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
      this._bankHttpService.getBankBranches(this.val).subscribe((branches) => {
      this.isLoading = false;

      this.dataSource = new MatTableDataSource(branches);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  //Favourites
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Branch): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ifsc + 1}`;
  }


active(element: any) {
  let checkExists: boolean = false;
  console.log(this.value)
  console.log(this.value.length)
  console.log(element.ifsc)

  for (let i = 0; i < this.value.length; i++) {
    if (element.ifsc === this.value[i].ifsc) {
      checkExists = true;
      console.log(checkExists)
    }
  }

  if (checkExists === false) {
    console.log(checkExists)
    this.value.push(element);
  }
  // Storing the data selected inside the local storage of the browser
  localStorage.setItem('fav', JSON.stringify(this.value));

  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action, {
  //     duration: 2000,
  //   });

}

}


export interface Branch {
  address: string;
  bank_id: number;
  bank_name: string;
  branch: string;
  city: string;
  district: string;
  ifsc: string;
  state: string;
}