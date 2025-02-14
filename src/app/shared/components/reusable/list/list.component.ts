import { CommonModule } from '@angular/common';
import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { GetNestedValuePipe } from '../../../../core/pipes/get-nested-value.pipe';
import { Router } from '@angular/router';



interface ColumnConfig {
  header: string;
  columnDef: string;
  detail?: {
    link: string;
    field: string;
  };
}

@Component({
  selector: 'app-list',
  styleUrl: 'list.component.scss',
  templateUrl: 'list.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatCardModule, GetNestedValuePipe],
})
export class ListComponent implements AfterViewInit {
  @Input() columns: ColumnConfig[] = [];
  @Input() data: any[] = [];
  @Input() enablePagination: boolean = true;
  @Input() title: string = '';

  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router) {}

  ngOnInit() {
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    if (this.enablePagination) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onRowClick(row: any) {
    // Find the first column with a `detail` property
    const detailColumn :any = this.columns.find(col => col.detail);
    
    if (detailColumn && row[detailColumn.detail.field]) {
      const targetUrl = `${detailColumn.detail.link}${row[detailColumn.detail.field]}`;
      this.router.navigate([targetUrl]);
    }
  }

  isRowClickable(row: any): boolean {
    return this.columns.some(col => col.detail && row[col.detail.field]);
  }
  

}
