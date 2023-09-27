import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  @ViewChild(MatPaginator, {static: true}) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  @Output() changeView= new EventEmitter();
  input = new FormControl('');
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = ['no', 'fileName', 'uploadedBy', 'uploadedDate','from','to'];

  constructor(private api: ApiService){}
  ngOnInit(): void {
    this.get()
  }

  get(){
    this.api.getmails('/getMails').subscribe((res: any) => {
      res.data.mails.map((ele: any,index: number) => {
       return ele.no = index+1;
      })
      this.dataSource = new MatTableDataSource(res.data.mails);
      this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    })
  }
  search(){
    this.dataSource.filter = this.input.value?.trim().toLowerCase();
    
  }

  send(){
    this.changeView.emit();
  }
}
