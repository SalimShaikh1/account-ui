import { Component } from '@angular/core';
import { CommanServices } from '../../services/commanServices';
import { TableComponent } from '../../shared/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;
import moment from 'moment';
import { DataService } from '../../services/dataService';
import { ReceiptFormComponent } from '../../shared/receiptForm/receiptForm.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [TableComponent, ReceiptFormComponent],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css',
})
export class ReceiptComponent {
  tableData: any = { header: [], data: [] };
  header = [
    { name: 'Receipt No', key: 'receiptVoucherNo', view: true, sort: true },
    { name: 'Receipt Date', key: 'receiptVoucherDate', view: true, sort: true },
    { name: 'Donor', key: 'name', view: true, sort: true },
    { name: 'Amount', key: 'amount', view: true, sort: true },
    { name: 'Income Head', key: 'fromHeadName', view: true, sort: true },
    { name: 'Collected by', key: 'collected', view: true, sort: true },
    { name: 'Status', key: 'status', view: true, sort: true },
    { name: 'Payment Method', key: 'paymentMethod', view: true, sort: true },
    { name: 'Description', key: 'description', view: true, sort: true }];
  title = 'Receipt';
  constructor(private apiServices: CommanServices, private dataService: DataService, private toastr: ToastrService) {
    this.getVoucher()
  }

  async getVoucher() {
    let res = await this.apiServices.getTransaction('Receipt')
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

  async saveRecipet(data: any) {
    console.log(data);
    let res = await this.apiServices.saveTransaction(data)
    // .subscribe((res: any) => {
    //   this.toastr.success('Data saved Successful!', 'Success')
      $('#frmModal').modal('hide');
      this.getVoucher();
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
      this.getVoucher();
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // })
  }
}
