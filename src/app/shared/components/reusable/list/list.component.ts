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
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { GetNestedValuePipe } from '../../../../core/pipes/get-nested-value.pipe';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import { GeneralService } from '../../../../core/services/general.service';
import { format } from 'date-fns';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AgencyState } from '../../../states/selectedAgency/agency.state';
import { SetSelectedAgency } from '../../../states/selectedAgency/agency.action';
import { PolicyService } from '../../../../core/services/policy.service';
import { ToastrService } from 'ngx-toastr';
import { AuthState } from '../../../states/auth/auth.state';
import { AutoContractComponent } from '../../../../modules/policy/documents-printing/auto-contract/auto-contract.component';
import { FireContractComponent } from '../../../../modules/policy/documents-printing/fire-contract/fire-contract.component';
import { TransportContractComponent } from '../../../../modules/policy/documents-printing/transport-contract/transport-contract.component';
import { NgxPrintModule } from 'ngx-print';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface ColumnConfig {
  header: string;
  columnDef: string;
  detail?: {
    link: string;
    field: string;
  };
}

interface ActionConfig {
  label: string;
  tooltip: string;
  actionType: string;
  service?: any;
  successMessage?: string;
  errorMessage?: string;
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
    MatProgressSpinnerModule, MatSelectModule, MatTooltipModule, AutoContractComponent, FireContractComponent, TransportContractComponent,     
    NgxPrintModule,FormsModule, MatCheckboxModule
    
  ],
})
export class ListComponent implements AfterViewInit {
  @Input() columns: ColumnConfig[] = [];
  @Input() enablePagination: boolean = true;
  @Input() showDateFilters: boolean = false;
  @Input() showSearchFilters: boolean = false;
  @Input() showSearchButton : boolean = false
  @Input() showAgencyFilter : boolean = false
  @Input() showActions : boolean = false
  @Input() showGenerateReport : boolean = false

  hasHeader : boolean =false


  @Input() actions: any= [];
  
  isLoading: boolean = false;
  isActionLoading: boolean = false;

  @Input() title: string = '';
  @Input() url: string = '';

  data: any[] = [];
  agencies: any[] = [];
  selectedAgency$: Observable<string | null>;
  selectedAgency: any = '';

  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;
  defaultAgency=1

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterForm: FormGroup;
  selectedAction: any;
  selectedRow: any;
    connectedOperator$!:Observable<any> 

  connectedOperator: any;



  constructor(
    private router: Router,
    private generalService: GeneralService,
    private fb: FormBuilder,
    private store: Store,
    private policyService: PolicyService,
    private toastr : ToastrService

  ) {
    this.selectedAgency$ = this.store.select(AgencyState.selectedAgency);
        const today = new Date();
    const todayISO = today.toISOString().substring(0, 10);

    this.filterForm = this.fb.group({
      searchQuery: [''],
      fromDate: [todayISO],
      toDate: [todayISO],
      agency: [''],
    });
    this.connectedOperator$ = store.select(AuthState.connectedOperator)
    
  }

  ngOnInit() {
    this.getAgencies();
    this.displayedColumns = this.columns.map(c => c.columnDef);



    


        this.connectedOperator$.subscribe((connectedOperator:any)=>{
      this.connectedOperator = connectedOperator 
      console.log('from operatorrr conneccttteedd', this.connectedOperator)

          const shouldShowActions = this.actions.length > 0 && this.connectedOperator?.is_operator_super_admin;

    // if (shouldShowActions) {{}
    // if(this.showActions){
      
    // }
      this.displayedColumns.push('actions');
      // console.log("actions should be there hahhahah")
    // }


      if(!connectedOperator){
    // this.router.navigateByUrl('/login')

      }


      // this.router.events.subscribe(event => {
      //   if (event instanceof NavigationEnd) {
      //     window.scrollTo(0, 0); // Scroll to top of the page

      //     console.log('NavigationEnd event:', event);
      //     // this.vps.scrollToPosition([0,0]);
      //   }
      // });
    })
  }

  ngAfterViewInit() {
    if (this.enablePagination) {
      this.dataSource.paginator = this.paginator;
    }
  }

  selectAction(row : any, action:string){
    this.selectedAction = action
    this.selectedRow = row
  }

  handleAction() {
      // this.isActionLoading = true;
      
      // Handle different action types
          this.policyService.doPolicyAction(this.selectedRow.id, this.selectedAction.action_type, {})
            .subscribe({
              next: (response) => {
                console.log('Action successful:', response);
                if (this.selectedAction.successMessage) {
                this.toastr.success(this.selectedAction.successMessage);

                }

                this.getData(); // Refresh the list
                this.isActionLoading = false;
              },
              error: (error) => {
                console.error('Action failed:', error);

                this.toastr.error(this.selectedAction.errorMessage);

                this.isActionLoading = false;
              }
            });
        // Add more action types as needed
  }

  getData() {
    // this.data = [];
    this.isLoading = true;
    const { searchQuery, fromDate, toDate } = this.filterForm.value;
    const formattedFromDate = fromDate ? format(new Date(fromDate), 'dd/MM/yyyy') : '';
    const formattedToDate = toDate ? format(new Date(toDate), 'dd/MM/yyyy') : '';
    

    this.generalService.GetList(this.url, searchQuery, formattedFromDate, formattedToDate, this.selectedAgency)
      .subscribe({
        next: (data: any) => {
          this.isLoading = false;
          this.data = data;
          this.dataSource = new MatTableDataSource(this.data);
          if (this.enablePagination && this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error fetching data:', error);
        }
      });
  }

  getAgencies() {
    this.generalService.GetAgencies().subscribe((agencies: any) => {
      this.agencies = agencies;

      this.selectedAgency$.subscribe((selectedAgency) => {
      this.selectedAgency = selectedAgency;
      this.filterForm.patchValue({ agency: selectedAgency });
            if(!this.selectedAgency){
              this.selectedAgency=agencies[0].id
    this.store.dispatch(new SetSelectedAgency(this.selectedAgency));
      this.filterForm.patchValue({ agency: this.selectedAgency });


      this.getData();
      }else{
      this.getData();

      }
    });


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

  getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''), obj);
  }

  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
  
    const headers = this.columns.map(col => col.header);
    worksheet.addRow(headers);
  
    this.data.forEach((row: any) => {
      const rowData = this.columns.map(col => this.getNestedValue(row, col.columnDef));
      const excelRow = worksheet.addRow(rowData);
      
      // Check if the row has cancelled status
      const status = this.getNestedValue(row, 'status') || this.getNestedValue(row, 'bill.status');
      if (status === 'cancelled') {
        excelRow.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF0000' } // Red color
          };
        });
      }
    });
  
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, this.title);
    });
  }

  selectAgency(selectedAgency: any) {
    this.store.dispatch(new SetSelectedAgency(selectedAgency));
      this.filterForm.patchValue({ agency: this.selectedAgency });
  }
}