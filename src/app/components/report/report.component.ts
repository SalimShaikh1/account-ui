import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommanServices } from '../../services/commanServices';
import { TableComponent } from '../../shared/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;
import moment from 'moment';
import { DataService } from '../../services/dataService';
import { VoucherFormComponent } from '../../shared/voucherForm/voucherForm.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [TableComponent, VoucherFormComponent, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent implements AfterViewInit {
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;
  reportData: any = [];
  bindingData: any = [{ name: 'Receipt', dataArray: [] }, { name: 'Voucher', dataArray: [] }];
  dispalyData: any = [];
  total: any;
  start: any;
  end: any;
  circleId: any;
  unitId: any;
  userData: any = JSON.parse(localStorage.getItem('userData') || '{}');
  circleList: any = [];
  incomeList: any = [];

  receiptTotal: any = {}
  vocherTotal: any = {}

  tableHeader = ['Name']
  tableBody: any = [];
  type: any = 'Goshwara';
  yearCalender: any = [];
  sumObj: any = {};

  selectYear: any;
  selectIncome: any = '';

  showStartDate: any;
  showEndDate: any;
  currentDate = moment().format('DD-MM-YYYY')

  halquaName :any;
  unitName :any;
  circleName :any;

  placeName: any;

  constructor(private apiServices: CommanServices, private dataService: DataService, private toastr: ToastrService) {
    this.start = moment().startOf('M');
    this.end = moment().endOf('M');

    this.halquaName = this.userData.halquaName
    this.unitName = this.userData.unitName
    this.circleName = this.userData.circleName

    this.placeName = this.unitName;
    

    this.showStartDate = moment().startOf('M').format('DD-MM-YYYY')
    this.showEndDate = moment().endOf('M').format('DD-MM-YYYY')
    this.getCircle()
    this.getReport()
    this.getIncome()




  }

  ngAfterViewInit() {
    this.yearCalender = []
    $('#daterange').daterangepicker(
      {
        startDate: this.start,
        endDate: this.end,
        opens: 'right',
        autoApply: true,
        locale: {
          format: 'YYYY-MM-DD'
        }
      },
      (start: any, end: any) => {
        console.log('Selected range:', start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        this.start = start;
        this.end = end;
        this.showStartDate = start.format('DD-MM-YYYY')
        this.showEndDate = end.format('DD-MM-YYYY')
        this.getReport()
      }
    );


    for (let index = 0; index <= 10; index++) {
      this.yearCalender.push(`${moment().subtract(index, 'year').format('YYYY')}-${moment().subtract(index - 1, 'year').format('YYYY')}`);
    }

    this.selectYear = this.yearCalender[0];

  }

  async getCircle() {
    // this.apiServices.getCircle(1).subscribe(data => {
    this.circleList = await this.apiServices.getCircle(1);
    // })
  }

  async getIncome() {
    // this.apiServices.getIncome().subscribe(async data => {
    this.incomeList = await this.apiServices.getIncome();
    // })
  }

  getReportByFilter(event: any) {
    this.circleId = event.target.value

    console.log(this.circleList.find((item:any) => item._id == this.circleId).name);
    

    this.placeName = this.circleList.find((item:any) => item._id == this.circleId).name;

    if (this.type == 'Goshwara') {
      this.getReport();
    } else if (this.type == 'Receipt' || this.type == 'Voucher' || this.type == 'Rukn' || this.type == 'Collected') {
      this.callReport()
    }

  }

  changeYear(event: any, type: any) {
    if (type == 'income') {
      this.selectIncome = event.target.value;
    } else {
      this.selectYear = event.target.value;
    }
    this.callReport()
  }

  reportType(event: any) {
    this.type = event.target.value;
    if (this.type == 'Goshwara') {
      this.getReport();
      setTimeout(() => {
        this.ngAfterViewInit();
      }, 100)
    } else if (this.type == 'Receipt' || this.type == 'Voucher' || this.type == 'Rukn' || this.type == 'Collected') {
      this.callReport()
    }

  }

  callReport() {
    var year = this.selectYear.split("-")
    this.tableHeader = ['Name']
    this.sumObj = {};
    var data = {
      type: this.type,
      startDate: `${year[0]}-04-01`,
      endDate: `${year[1]}-03-31`,
      "circleId": this.circleId,
      "unitId": this.userData.unitId,
      "incomeId": this.selectIncome
    }
    for (let index = 0; index <= moment(data.endDate).diff(moment(data.startDate), 'months'); index++) {
      this.tableHeader.push(moment(data.startDate).add(index, 'M').format('MMM-YYYY'))
    }
    this.getReportdata(data)
  }





  async getReport() {
    this.reportData = [];
    this.receiptTotal = {}
    this.vocherTotal = {}

    let data = {
      "startDate": this.start.format('YYYY-MM-DD'),
      "endDate": this.end.format('YYYY-MM-DD'),
      "circleId": this.circleId,
      "unitId": this.userData.unitId
    }

    let res = await this.apiServices.report(data)
    // .subscribe((res: any) => {
    // console.log(res);
    this.receiptTotal = res.receiptTotal;
    this.vocherTotal = res.vocherTotal;
    this.reportData = res.aCount;

    if (this.reportData.length == 0) {
      this.total = {
        collection: 0,
        totalCollection: 0,
        unitShare: 0,
        totalUnitShare: 0,
        cityShare: 0,
        halquaShare: 0
      }

    }

    this.total = this.reportData.reduce(
      (acc: any, item: any) => {
        acc.collection += item.collection;
        acc.totalCollection += item.totalCollection;
        acc.unitShare += item.unitShare;
        acc.totalUnitShare += item.totalUnitShare;
        acc.cityShare += item.cityShare;
        acc.halquaShare += item.halquaShare;
        return acc;
      },
      {
        collection: 0,
        totalCollection: 0,
        unitShare: 0,
        totalUnitShare: 0,
        cityShare: 0,
        halquaShare: 0
      }
    );



    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // });
  }

  downloadPDF() {
    const DATA = this.pdfTable.nativeElement;

    html2canvas(DATA, {
      scale: 3, // HIGHER scale = better quality
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const padding = 10; // mm

      const imgWidth = pdfWidth - padding * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Center the image vertically (optional)
      const y = padding;
      const x = padding;


      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight, '', 'FAST');
      pdf.save('report.pdf');
    });
  }

  async getReportdata(data: any) {
    let res = await this.apiServices.recipetReport(data)
    // .subscribe((res: any) => {
    // console.log(res);
    this.tableBody = res;
    for (const item of this.tableBody) {
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === 'number') {
          this.sumObj[key] = (this.sumObj[key] || 0) + value;
        }
      }
    }

    console.log(this.sumObj);


    // }, (error: HttpErrorResponse) => {
    //   this.toastr.error(error.error.message, 'Error')
    //   return;
    // });
  }
}
