import { Component } from '@angular/core';
import { CommanServices } from '../../services/commanServices';
import { TableComponent } from '../../shared/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;
import moment from 'moment';
import { DataService } from '../../services/dataService';
import { SubExpenseFormComponent } from '../../shared/subExpenseForm/subExpenseForm.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-subExpense',
  standalone: true,
  imports: [TableComponent, SubExpenseFormComponent],
  templateUrl: './subExpense.component.html',
  styleUrl: './subExpense.component.css',
})
export class SubExpenseComponent {
  expense :any = JSON.parse(localStorage.getItem('expense') || '');
  tableData: any = { header: [], data: [] };
  header = [{ name: 'Name', key: 'expenseMain', view: true, sort: true },
  { name: 'Sub', key: 'expenseSub', view: true, sort: true },
  // { name: 'Bucket', key: 'fromBucket', view: true, sort: true },
  { name: 'Halqua', key: 'halquaName', view: true, sort: true },
  { name: 'Unit', key: 'unitName', view: true, sort: true },
  { name: 'Created On', key: 'createdOn', view: true, sort: true }];
  title = 'Sub Expense';
  constructor(private apiServices: CommanServices, private dataService: DataService, private toastr: ToastrService) {
    this.getExpense()
  }

  async getExpense() {
    let res = await this.apiServices.getExpense('sub', this.expense._id)
      res.map((item: any) => {
        item.createdOn = moment(item.createdOn, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
      })
      this.tableData.header = this.header;
      this.tableData.data = res;
  }

  async saveExpense(data: any) {
      console.log(data);
      let res = await this.apiServices.saveExpense(data)
        $('#frmModal').modal('hide');
        this.getExpense();
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
      this.getExpense();
  }
}
