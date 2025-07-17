import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DomainBlockService, BlockedDomain} from './domain.service';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragStart,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort, MatSortHeader} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface BlockedDomainTable {
  index: number;
  id: string;
  domainName: string;
  appliedAt: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatPaginator, MatCell, MatCellDef, MatHeaderRow, MatRow, MatHeaderRowDef, MatRowDef, MatSortHeader, MatSort, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'mfe2';
  public domain_table: BlockedDomainTable[] = [];
  columns: any[] = [
    {field: "index", header1: "No"},
    {field: "domainName", header1: "Domain"},
    {field: "appliedAt", header1: "Applied At"},
  ];
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.updateDisplayedColumns();
  }

  updateDisplayedColumns() {
    this.displayedColumns = this.columns.map(col => col.field);
  }

  displayedColumns: string[] = []
  previousIndex !: number;
  message: string = '';
  dataSource = new MatTableDataSource<BlockedDomainTable>([]);

  constructor(private domainService: DomainBlockService) {}

  ngOnInit(): void {
    this.updateDisplayedColumns();
    this.loadBlockedDomains();
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:4200') return;
      const newDomain: BlockedDomain = event.data.domain;
      console.log("mfe2 ye ulasıldı : " + newDomain);
      if (newDomain && !this.domain_table.some(d => d.domainName === newDomain.domainName)) {
        this.loadBlockedDomains();
      }
    });
  }

  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadBlockedDomains() {
    this.domainService.getBlockedDomains().subscribe({
      next: (data: BlockedDomain[]) => {
        this.domain_table = data.map((item, index) => {
          return {
            index: index + 1,
            id: item.id,
            domainName: item.domainName,
            appliedAt: item.appliedAt
          };
        });
        const expandedData: any[] = [];
        this.domain_table.forEach(item => {
          expandedData.push(item);
          expandedData.push({ detailRow: true, element: item }); // Detay satırı
        });
      this.dataSource.data = expandedData;


        console.log('Parsed domains:', this.domain_table);
      },
      error: (err: any) => {
        this.message = 'Yükleme hatası: ' + err.message;
      }
    });
  }

  removeDomain(domain: BlockedDomainTable) {
    this.domainService.deleteDomain(domain).subscribe({
      next: () => {
        this.domain_table = this.domain_table.filter(d => d.id !== domain.id);
        this.loadBlockedDomains();
      },
      error: (err: any) => {
        this.message = 'Silme hatası: ' + err.message;
      }
    });
  }
}





