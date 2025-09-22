import { Component } from '@angular/core';
import { CommanServices } from '../../services/commanServices';
import { TableComponent } from '../../shared/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
import { HalquaFormComponent } from '../../shared/halquaForm/halquaForm.component';
declare var $: any;
import moment from 'moment';
import { DataService } from '../../services/dataService';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-halqua',
  standalone: true,
  imports: [TableComponent, HalquaFormComponent],
  templateUrl: './halqua.component.html',
  styleUrl: './halqua.component.css',
})
export class HalquaComponent {
  tableData: any = { header: [], data: [] };
//   array = [
//     {
//         "id": "3ac927cf-a0d1-4018-9b54-ec65b267ae20",
//         "name": "A&N Islands",
//         "remark": ""
//     },
//     {
//         "id": "3a1bdc31-e3d3-43ab-8244-45b1782b0af9",
//         "name": "Andhra Pradesh",
//         "remark": null
//     },
//     {
//         "id": "b004beb4-6012-4599-9dde-a9216a786d91",
//         "name": "Assam North",
//         "remark": ""
//     },
//     {
//         "id": "d324c4a1-29a9-45d9-834d-7824b478376a",
//         "name": "Assam South",
//         "remark": null
//     },
//     {
//         "id": "cedb61d8-1c26-4552-a473-51335d8310ff",
//         "name": "Bihar",
//         "remark": null
//     },
//     {
//         "id": "14763930-f7b7-4eed-918d-276a5e023428",
//         "name": "Chattisgarh",
//         "remark": null
//     },
//     {
//         "id": "9fed7e11-dea5-41aa-b941-b7aa3fb6e197",
//         "name": "Delhi",
//         "remark": null
//     },
//     {
//         "id": "ee98ebfd-d3be-459d-ba84-7879a1759a35",
//         "name": "Goa",
//         "remark": null
//     },
//     {
//         "id": "2eb6ea53-9490-4f24-8400-cab42dffd0f9",
//         "name": "Gujarat",
//         "remark": null
//     },
//     {
//         "id": "001ff6dd-f796-4c69-be5e-f4fb0f22086c",
//         "name": "Haryana",
//         "remark": null
//     },
//     {
//         "id": "ad9f1da9-dbe3-4aea-af61-bac0bda97ad5",
//         "name": "Jharkhand",
//         "remark": null
//     },
//     {
//         "id": "ffa76817-3830-483b-bef7-f15098e5b8a5",
//         "name": "Karnataka",
//         "remark": null
//     },
//     {
//         "id": "daf262b3-4e22-4596-8156-e79a0fe1f639",
//         "name": "Kerala",
//         "remark": ""
//     },
//     {
//         "id": "49a17de8-2d96-4d46-9790-aadd2ed14678",
//         "name": "Madhya Pradesh",
//         "remark": null
//     },
//     {
//         "id": "fb90244d-83a3-4a8b-b55b-03486e1f0a83",
//         "name": "Maharashtra",
//         "remark": ""
//     },
//     {
//         "id": "627c5740-09e8-4fee-9363-fb4fb603071a",
//         "name": "Manipur",
//         "remark": null
//     },
//     {
//         "id": "4f6dd825-dd7a-4dbc-a0ed-f79b9d43fdcc",
//         "name": "Markaz",
//         "remark": null
//     },
//     {
//         "id": "fa48fb50-9b62-4f76-adfb-f916d370ddc8",
//         "name": "Odisha",
//         "remark": null
//     },
//     {
//         "id": "2ca22674-7f0c-4e28-bc5b-375fa4fab1e7",
//         "name": "Punjab",
//         "remark": ""
//     },
//     {
//         "id": "4369601e-ff11-475e-a5d7-25862a0ef092",
//         "name": "Rajasthan",
//         "remark": null
//     },
//     {
//         "id": "9d6c936b-693e-48d2-896e-fda166add086",
//         "name": "Tamil Nadu",
//         "remark": ""
//     },
//     {
//         "id": "4e8ee2e3-e2b3-4651-b8fa-8299d3301707",
//         "name": "Telangana",
//         "remark": null
//     },
//     {
//         "id": "05a45d73-373f-4947-973f-7ce90500710c",
//         "name": "U.P. East",
//         "remark": null
//     },
//     {
//         "id": "3b772014-de3a-4f87-8eda-bfc461dbbf73",
//         "name": "U.P. West",
//         "remark": null
//     },
//     {
//         "id": "4ef0f704-eba0-4fdf-ae3d-332e02db99a9",
//         "name": "Uttarakhand",
//         "remark": null
//     },
//     {
//         "id": "dd3f2d4a-287a-4f9e-9c5c-15cfa6d5bee5",
//         "name": "West Bengal",
//         "remark": null
//     }
// ]
  header = [{ name: 'Name', key: 'name', view: true, sort: true }, {name: 'Created On', key:'createdOn', view:true, sort:true}];
  title = 'Halqua';
  constructor(private apiServices: CommanServices, private dataService: DataService, private toastr: ToastrService) { 
    this.getHalqua()

    // this.array.map((item:any) =>{
    //   this.saveHalqua({name:item.name});
    // })


  }

  async getHalqua() {

    let res = await this.apiServices.getHalqua()
    console.log(res);
    
    // this.apiServices.getHalqua().subscribe((res: any) => {
    //   console.log(res);
      res.map((item:any) => {
        item.createdOn = moment(item.createdOn).format('YYYY-MM-DD HH:mm:ss')
      })
      this.tableData.header = this.header;
      this.tableData.data = res;
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error, 'Error')
    //   return;
    // });
  }


  async saveHalqua(data: any) {
    console.log(data);
    let res = await this.apiServices.saveHalqua(data)
    // .subscribe((res: any) => {
    //   console.log(res);
      
    //   this.toastr.success('Data saved Successful!', 'Success')
      $('#frmModal').modal('hide');
      this.getHalqua();
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error, 'Error')
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
      this.getHalqua();
    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // })
  }
}
