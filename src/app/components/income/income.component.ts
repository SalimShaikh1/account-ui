import { Component } from '@angular/core';
import { CommanServices } from '../../services/commanServices';
import { TableComponent } from '../../shared/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;
import moment from 'moment';
import { DataService } from '../../services/dataService';
import { IncomeFormComponent } from '../../shared/incomeForm/incomeForm.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-income',
  standalone: true,
  imports: [TableComponent, IncomeFormComponent],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css',
})
export class IncomeComponent {
  tableData: any = { header: [], data: [] };
  header = [{ name: 'Name', key: 'name', view: true, sort: true },
     { name: 'Halqua', key: 'halquaName', view: true, sort: true }, 
     { name: 'Unit', key: 'unitName', view: true, sort: true }, 
     { name: 'Halqua Share(%)', key: 'halquaShare', view: true, sort: true }, 
     { name: 'City Share(%)', key: 'cityShare', view: true, sort: true }, 
     { name: 'Unit Share(%)', key: 'unitShare', view: true, sort: true }, 
     {name: 'Created On', key:'createdOn', view:true, sort:true}];
  title = 'Income';
  constructor(private apiServices: CommanServices, private dataService: DataService, private toastr: ToastrService) { 
    this.getIncome()
  }

  async getIncome() {
    let res = await this.apiServices.getIncome()
    // .subscribe((res: any) => {
    //   console.log(res);
      res.map((item:any) => {
        item.createdOn = moment(item.createdOn, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
      })
      this.tableData.header = this.header;
      this.tableData.data = res;
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // });
  }

  async saveIncome(data: any) {
    let res = await this.apiServices.saveIncome(data)
    // .subscribe((res: any) => {
    //   this.toastr.success('Data saved Successful!', 'Success')
      $('#frmModal').modal('hide');
      this.getIncome();
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // })
  }

  add(){
    this.dataService.updateData(null)
    $('#frmModal').modal('show');
  }

  editHalqua(data:any){
    this.dataService.updateData(data);
    $('#frmModal').modal('show');
  }

  async deleteHalqua(data:any){
    let res = await this.apiServices.deleteHalqua({_id:data._id})
    // .subscribe((res: any) => {
      this.getIncome();
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // })
  }
}
