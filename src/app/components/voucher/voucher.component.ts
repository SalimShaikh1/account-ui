import { Component } from '@angular/core';
import { CommanServices } from '../../services/commanServices';
import { TableComponent } from '../../shared/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;
import moment from 'moment';
import { DataService } from '../../services/dataService';
import { VoucherFormComponent } from '../../shared/voucherForm/voucherForm.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [TableComponent, VoucherFormComponent],
  templateUrl: './voucher.component.html',
  styleUrl: './voucher.component.css',
})
export class VoucherComponent {
  tableData: any = { header: [], data: [] };
  header = [{ name: 'Voucher No', key: 'receiptVoucherNo', view: true, sort: true },
  { name: 'Voucher Date', key: 'receiptVoucherDate', view: true, sort: true },
  { name: 'Payee', key: 'name', view: true, sort: true },
  { name: 'Amount', key: 'amount', view: true, sort: true },
  { name: 'Main Head', key: 'headName', view: true, sort: true },
  { name: 'Sub Head', key: 'subHeadName', view: true, sort: true },
  { name: 'From Bucket', key: 'fromHeadName', view: true, sort: true },
  { name: 'Spent by', key: 'collected', view: true, sort: true },
  { name: 'Payment Method', key: 'paymentMethod', view: true, sort: true },
  { name: 'Status', key: 'status', view: true, sort: true },
  { name: 'Description', key: 'description', view: true, sort: true },
];
  title = 'Voucher';
  constructor(private apiServices: CommanServices, private dataService: DataService, private toastr: ToastrService
  ) {
    this.getVoucher()
  }

  async getVoucher() {
    let res = await this.apiServices.getTransaction('Voucher')
    // .subscribe((res: any) => {
      // console.log(res);
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

  async saveVoucher(data: any) {
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
