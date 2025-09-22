import { Component } from '@angular/core';
import { CommanServices } from '../../services/commanServices';
import { TableComponent } from '../../shared/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
import { HalquaFormComponent } from '../../shared/halquaForm/halquaForm.component';
declare var $: any;
import moment from 'moment';
import { DataService } from '../../services/dataService';
import { CircleFormComponent } from '../../shared/circleForm/circleForm.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-circle',
  standalone: true,
  imports: [TableComponent, CircleFormComponent],
  templateUrl: './circle.component.html',
  styleUrl: './circle.component.css',
})
export class CircleComponent {
  tableData: any = { header: [], data: [] };
  header = [{ name: 'Name', key: 'name', view: true, sort: true }, { name: 'Halqua', key: 'halquaName', view: true, sort: true }, { name: 'Unit', key: 'unitName', view: true, sort: true }, {name: 'Created On', key:'createdOn', view:true, sort:true}];
  title = 'Circle';
  constructor(private apiServices: CommanServices, private dataService: DataService, private toastr: ToastrService) { 
    this.getUser()
  }

  async getUser() {
    let res = await this.apiServices.getCircle('')
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

  async saveHalqua(data: any) {
    console.log(data);
    let res = await this.apiServices.saveCircle(data)
    // .subscribe((res: any) => {
    //   console.log(res);
    //   this.toastr.success('Data saved Successful!', 'Success')
      $('#frmModal').modal('hide');
      this.getUser();
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
      this.getUser();
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // })
  }
}
