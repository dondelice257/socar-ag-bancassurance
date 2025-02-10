import { CommonModule } from '@angular/common';
import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-list',
  styleUrl: 'list.component.scss',
  templateUrl: 'list.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatCardModule],
})
export class ListComponent implements AfterViewInit {
  @Input() columns: { columnDef: string; header: string }[] = [];
  @Input() data: any[] = [];
  @Input() enablePagination: boolean = true;
  @Input() title : string= ''

  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    if (this.enablePagination) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
  
 
