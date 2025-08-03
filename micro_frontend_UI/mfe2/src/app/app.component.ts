import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import {DomainBlockService, BlockedDomain} from './domain.service';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput} from '@angular/material/input';
export interface BlockedDomainTable {
  index: number;
  id: string;
  domainName: string;
  appliedAt: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatPaginator, MatCell, MatCellDef, MatHeaderRow, MatRow, MatHeaderRowDef, MatRowDef, MatSortHeader, MatSort, CdkDropListGroup, CdkDropList, CdkDrag, MatCheckboxModule, MatButton, MatMenuTrigger, MatIcon, MatMenu, MatFormField, MatInput],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  domainForm: FormGroup = new FormGroup({domain: new FormControl("")});
  title = 'mfe2';
  displayedColumns: string[] = []
  previousIndex !: number;
  message: string = '';
  dataSource = new MatTableDataSource<BlockedDomainTable>([]);
  selection =new SelectionModel<BlockedDomainTable>(true,[]);
  constructor(private domainService: DomainBlockService,  private fb: FormBuilder,) {}
  public domain_table: BlockedDomainTable[] = [];
  columns = ['index', 'domainName', 'appliedAt'];
  columnVisible =[
    {field:"index", visible:true},
    {field:"domainName", visible:true},
    {field:"appliedAt", visible:true}
  ]



  // sütun hareketı kontrolu için
  tableDrop(event: CdkDragDrop<string[]>) {
    const visibleCols = this.getDisplayedColumns(); // görünür sütunları aldık
    moveItemInArray(visibleCols, event.previousIndex, event.currentIndex); // sürükleme sırasını uyg

    let i = 0;
    this.columns = this.columns.map(col =>
    {
      const isVisible = this.columnVisible.find(column => column.field === col)?.visible; // this.columnsta sadece görünürlerin yerını değiştirdik
      if (isVisible) { return visibleCols[i++]; }
      return col;
    });
  }

  //html e visible true sütun list gonderıo
  getDisplayedColumns(): string[] {
    return this.columns.filter(col => {
      const colVis = this.columnVisible.find(c => c.field === col);
      return colVis ? colVis.visible : false;
    });
  }

  updateDisplayedColumns() {
    this.displayedColumns = this.columns; // Sadece diziyi kopyalıyoruz
  }

  ngOnInit(): void {
    this.updateDisplayedColumns();
    this.loadBlockedDomains();
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:4200') return;
      const newDomain: BlockedDomain = event.data.domain;
      console.log("mfe2 ye ulasıldı : " + newDomain);
      this.loadBlockedDomains();
    });
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  searchDomain(): void {
    const domainName = this.domainForm.value.domain;
    console.log(domainName);
    this.domainService.searchBlockedDomains(domainName).subscribe({
      next: (data: BlockedDomain[]) => {
        this.domain_table = data.map((item, index) => ({
          index: index + 1,
          id: item.id,
          domainName: item.domainName,
          appliedAt: item.appliedAt
        }));
        console.log(data);
        this.dataSource.data = this.domain_table;
      },
      error: (err: any) => {
        this.message = 'Yükleme hatası: ' + err.message;
      }
    });
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

      this.dataSource.data = this.domain_table;
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle(){
    this.isAllSelected()
      ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  domainSelection() {
    this.selection.selected.forEach(s => {
      this.removeDomain(s);
      console.log("[*] Remove tetiklendi: " + s.domainName);
    });
  }
}





