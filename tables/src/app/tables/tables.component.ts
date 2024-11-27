// src/app/tables/tables.component.ts
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { CsvService } from '../services/csv.service';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  template: `
    <div *ngIf="isBrowser">
      <input type="file" (change)="onFileSelected($event)" accept=".csv">
      <ag-grid-angular
        style="width: 100%; height: 90dvh;"
        class="ag-theme-quartz"
        [rowData]="rowData"
        [columnDefs]="colDefs"
        [pagination]="pagination"
        [paginationPageSize]="paginationPageSize"
        [paginationPageSizeSelector]="paginationPageSizeSelector">
      </ag-grid-angular>
    </div>
    <div *ngIf="!isBrowser">Loading...</div>
  `
})
export class TablesComponent implements OnInit {
  isBrowser: boolean;
  rowData: any[] = [];
  colDefs: ColDef[] = [];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100, 500];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private csvService: CsvService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // if (this.isBrowser) {
    //   this.initializeGrid();
    // }
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      try {
        const data = await this.csvService.parseCsvFile(file);
        if (data.length > 0) {
          this.colDefs = Object.keys(data[0]).map(key => ({
            field: key,
            headerName: key,
            filter: true 
          }));
        }
        this.rowData = data;
      } catch (error) {
        console.error('Error parsing CSV:', error);
      }
    }
  }
}