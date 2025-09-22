import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ExcelExportService {
  exportAsExcelFile(data: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Sheet1': worksheet },
      SheetNames: ['Sheet1']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    FileSaver.saveAs(blob, `${fileName}.xlsx`);
  }
}