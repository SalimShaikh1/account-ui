import { Component } from '@angular/core';
import { CommanServices } from '../../services/commanServices';
import { TableComponent } from '../../shared/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tableData: any = { header: [], data: [] };
  header = [{ name: 'Name', key: 'name', view: true, sort: true },
    { name: 'Contact No', key:'contact', view: true, sort: true },
    { name: 'Halqua', key:'halquaName', view: true, sort: true },
    { name: 'Unit', key:'unitName', view: true, sort: true },
    { name: 'Circle', key:'circleName', view: true, sort: true },
    { name: 'Role', key:'roleName', view: true, sort: true }
     ];
  constructor(private apiServices: CommanServices) {
  }

  
}
