import { Component } from '@angular/core';
import { CommanServices } from '../../services/commanServices';
import { TableComponent } from '../../shared/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
import { HalquaFormComponent } from '../../shared/halquaForm/halquaForm.component';
declare var $: any;
import moment from 'moment';
import { DataService } from '../../services/dataService';
import { UnitFormComponent } from '../../shared/unitForm/unitForm.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [TableComponent, UnitFormComponent],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css',
})
export class unitComponent {
  tableData: any = { header: [], data: [] };
  header = [{ name: 'Name', key: 'name', view: true, sort: true }, {name:'Halqua', key: 'halquaName', view:true, sort:true}, {name: 'Created On', key:'createdOn', view:true, sort:true}];
  title = 'Unit';
  constructor(private apiServices: CommanServices, private dataService: DataService, private toastr: ToastrService) { 
    this.getUnit()
  }

  async getUnit() {
    let res = await this.apiServices.getUnit('')
    // .subscribe((res: any) => {
    //   console.log(res);
      res.map((item:any) => {

        console.log(moment(item.createOn).format('YYYY-MM-DD HH:mm:ss'));
        console.log(moment(item.createOn, 'YYYY-MM-DD HH:mm:ss'));
        


        item.createdOn = moment(item.createOn).format('YYYY-MM-DD HH:mm:ss')
      })
      this.tableData.header = this.header;
      this.tableData.data = res;
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // });
  }

  async saveUnit(data: any) {
    console.log(data);
    let res = await this.apiServices.saveUnit(data)
    // .subscribe((res: any) => {
    //   this.toastr.success('Data saved Successful!', 'Success')
      $('#frmModal').modal('hide');
      this.getUnit();
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // })
  }

  add(){
    this.dataService.updateData(null)
    $('#frmModal').modal('show');
  }

  editUnit(data:any){
    this.dataService.updateData(data);
    $('#frmModal').modal('show');
  }

  async deleteUnit(data:any){
    let res = await this.apiServices.deleteHalqua({_id:data._id})
    // .subscribe((res: any) => {
      this.getUnit();
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // })
  }
}
