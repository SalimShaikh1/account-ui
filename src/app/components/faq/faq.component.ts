import { Component } from '@angular/core';
import { CommanServices } from '../../services/commanServices';
import { TableComponent } from '../../shared/table/table.component';
declare var $: any;
import moment from 'moment';
import { DataService } from '../../services/dataService';
import { FaqFormComponent } from '../../shared/faqForm/faqForm.component';
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [TableComponent, FaqFormComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  tableData: any = { header: [], data: [] };
  header = [
    { name: 'Title', key: 'menu', view: true, sort: true },
    { name: 'Question', key: 'question', view: true, sort: true },
    { name: 'Answer', key: 'answer', view: true, sort: true }];
  title = 'Faq';
  constructor(private apiServices: CommanServices, private dataService: DataService) {
    this.getFaq()
  }

  async getFaq() {
    this.tableData.header = this.header;
    this.tableData.data = await this.apiServices.getFaq();
  }

  async saveFaq(data: any) {
    let res = await this.apiServices.saveFaq(data)
    $('#frmModal').modal('hide');
    this.getFaq();
  }

  add() {
    this.dataService.updateData(null)
    $('#frmModal').modal('show');
  }

  editFaq(data: any) {
    this.dataService.updateData(data);
    $('#frmModal').modal('show');
  }

  async deleteFaq(data: any) {
    let res = await this.apiServices.deleteHalqua({ _id: data._id })
    this.getFaq();
  }

}
