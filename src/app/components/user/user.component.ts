import { Component } from '@angular/core';
import { CommanServices } from '../../services/commanServices';
import { TableComponent } from '../../shared/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserFormComponent } from '../../shared/userForm/userForm.component';
import { DataService } from '../../services/dataService';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [TableComponent, UserFormComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  title = 'User';
  tableData: any = { header: [], data: [] };
  header = [{ name: 'Name', key: 'name', view: true, sort: true },
  { name: 'Contact No', key: 'contact', view: true, sort: true },
  { name: 'Halqua', key: 'halquaName', view: true, sort: true },
  { name: 'Unit', key: 'unitName', view: true, sort: true },
  { name: 'Circle', key: 'circleName', view: true, sort: true },
  { name: 'Role', key: 'roleName', view: true, sort: true }
  ];
  constructor(private apiServices: CommanServices, private dataService: DataService, private toastr: ToastrService) {
    this.getUser()
  }

  async getUser() {
    let res = await this.apiServices.getUser();
    res.map((item: any) => {
      item['name'] = `${item.firstName} ${item.middleName} ${item.lastName}`
    })
    this.tableData.header = this.header;
    this.tableData.data = res;
  }

  async saveUser(data: any) {
    let res = await this.apiServices.saveUser(data)
    // .subscribe((res: any) => {
    //   this.toastr.success('Data saved Successful!', 'Success')
      $('#frmModal').modal('hide');
      this.getUser();
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // })
  }

  add() {
    this.dataService.updateData(null)
    $('#frmModal').modal('show');
  }

  editHalqua(data: any) {
    this.dataService.updateData(data);
    $('#frmModal').modal('show');
  }

  async deleteHalqua(data: any) {
    let res = await this.apiServices.deleteHalqua({ _id: data._id })
    // .subscribe((res: any) => {
      this.getUser();
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // })
  }
}
