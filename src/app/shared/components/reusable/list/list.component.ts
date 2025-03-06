import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { GetNestedValuePipe } from '../../../../core/pipes/get-nested-value.pipe';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import { GeneralService } from '../../../../core/services/general.service';
import { format } from 'date-fns';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  imports: [
    MatTableModule, MatPaginatorModule, CommonModule, MatButtonModule,
    MatDividerModule, MatIconModule, MatCardModule, GetNestedValuePipe,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule,
    MatProgressSpinnerModule

  ],
})
export class ListComponent implements AfterViewInit {
  @Input() columns: ColumnConfig[] = [];
  @Input() enablePagination: boolean = true;
  @Input() showFilters: boolean = false;

  @Input() title: string = '';
  @Input() url: string = '';

  data: any[]= [];
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterForm: FormGroup;

  constructor(
    private router: Router,
    private generalService: GeneralService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      searchQuery: [''],
      fromDate: [''],
      toDate: ['']
    });
  }

  ngOnInit() {
    this.getData();
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  ngAfterViewInit() {
    if (this.enablePagination) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getData() {
    this.data = []
    const { searchQuery, fromDate, toDate } = this.filterForm.value;
    const formattedFromDate = fromDate ? format(new Date(fromDate), 'dd/MM/yyyy') : '';
    const formattedToDate = toDate ? format(new Date(toDate), 'dd/MM/yyyy') : '';

    this.generalService.GetList(this.url, searchQuery, formattedFromDate, formattedToDate)
      .subscribe((data: any) => {
        this.data = data;
        this.dataSource = new MatTableDataSource(this.data);
        if (this.enablePagination && this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  onRowClick(row: any) {
    const detailColumn: any = this.columns.find(col => col.detail);
    if (detailColumn && row[detailColumn.detail.field]) {
      const targetUrl = `${detailColumn.detail.link}${row[detailColumn.detail.field]}`;
      this.router.navigate([targetUrl]);
    }
  }

  isRowClickable(row: any): boolean {
    return this.columns.some(col => col.detail && row[col.detail.field]);
  }

  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    const headers = this.columns.map(col => col.header);
    worksheet.addRow(headers);

    this.data.forEach((row:any) => {
      const rowData = this.columns.map(col => row[col.columnDef] || '');
      worksheet.addRow(rowData);
    });

    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, this.title);
    });
  }
}
