import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../services/FilterPipe';
import { Router } from '@angular/router';
import { ExcelExportService } from '../../services/excel-export.service';
import { CommonModule } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, FilterPipe, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  search: any = ''
  img: any;
  @Input() tableData: any;
  @Input() title: any;
  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  constructor(private router: Router, private excelService: ExcelExportService) {

  }

  ngOnInit() {
    console.log(this.tableData);
  }

  edit(data: any) {
    this.editEvent.emit(data);
  }

  delete(data: any) {
    this.deleteEvent.emit(data);
  }

  nextPage(data: any) {
    this.router.navigate(['/subExpense']);
    localStorage.setItem('expense', JSON.stringify(data))
  }

  viewImage(item: any) {

    this.img = 'http://localhost:5000/uploads/' + item.imagesPath;

    console.log(this.img);

    $('#modal').modal('show');
  }

  downloadExcel() {


    this.tableData.data.map((item: any) => {
      delete item["_id"]
      delete item["_v"]
      delete item["createdBy"]
      delete item["expenseId"]
      delete item["halquaId"]
      delete item["isDeleted"]
      delete item["unitId"]
      delete item["circleId"]
      delete item["bookId"]
      delete item["fromHead"]
      delete item["head"]
      delete item["subHead"]
      delete item["__v"]
      delete item["imagesPath"]
    })

    this.excelService.exportAsExcelFile(this.tableData.data, this.title);
  }

  sort(column: any) {
    column.sortDirection = column.sortDirection === 'asc' ? 'desc' : 'asc';
    this.tableData.data.sort((a: any, b: any) => {
      let valA = a[column.key];
      let valB = b[column.key];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return column.sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      // For numbers/dates → normal comparison
      if (column.sortDirection === 'asc') {
        return valA > valB ? 1 : valA < valB ? -1 : 0;
      } else {
        return valA < valB ? 1 : valA > valB ? -1 : 0;
      }

    })

  }

}
