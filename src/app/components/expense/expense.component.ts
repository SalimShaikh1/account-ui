import { Component } from '@angular/core';
import { CommanServices } from '../../services/commanServices';
import { TableComponent } from '../../shared/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;
import moment from 'moment';
import { DataService } from '../../services/dataService';
import { ExpenseFormComponent } from '../../shared/expenseForm/expenseForm.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [TableComponent, ExpenseFormComponent],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})
export class ExpenseComponent {
  tableData: any = { header: [], data: [] };
  header = [{ name: 'Name', key: 'expenseMain', view: true, sort: true },
  { name: 'Halqua', key: 'halquaName', view: true, sort: true },
  { name: 'Unit', key: 'unitName', view: true, sort: true },
  { name: 'Created On', key: 'createdOn', view: true, sort: true }];
  title = 'Expense';
  constructor(private apiServices: CommanServices, private dataService: DataService, private toastr: ToastrService) {
    this.getExpense()
  }

  async getExpense() {
    let res = await this.apiServices.getExpense('main', '')
    // .subscribe((res: any) => {
    //   console.log(res);
      res.map((item: any) => {
        item.createdOn = moment(item.createdOn, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
      })
      this.tableData.header = this.header;
      this.tableData.data = res;
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // });
  }

  async saveExpense(data: any) {
    console.log(data);
    let res = await this.apiServices.saveExpense(data)
    // .subscribe((res: any) => {
    //   this.toastr.success('Data saved Successful!', 'Success')
      $('#frmModal').modal('hide');
      this.getExpense();
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
      this.getExpense();
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // })
  }
}
