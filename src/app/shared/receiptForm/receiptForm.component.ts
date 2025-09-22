import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/dataService';
import { CommanServices } from '../../services/commanServices';
import { HttpErrorResponse } from '@angular/common/http';
import moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-receiptForm',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './receiptForm.component.html',
  styleUrl: './receiptForm.component.css',
})
export class ReceiptFormComponent implements AfterViewInit {
  bookList: any;
  incomeList: any
  circleList: any
  roleList: any
  selectedFile: any
  minDate: any;
  maxDate: any;
  start: any;
  end: any;

  @Input() title: any;
  @Output() frmData = new EventEmitter<any>();
  frm = new FormGroup({
    _id: new FormControl(''),
    receiptVoucherDate: new FormControl('', [Validators.required]),
    bookId: new FormControl('', [Validators.required]),
    receiptVoucherNo: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    collected: new FormControl('', [Validators.required]),
    event: new FormControl('', [Validators.required]),
    fromHead: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    paymentMethod: new FormControl('', [Validators.required]),
    bankDate: new FormControl('', [Validators.required]),
    refNo: new FormControl(''),
    status: new FormControl('', [Validators.required]),
  });
  userData: any = JSON.parse(localStorage.getItem('userData') || '{}');
  constructor(private dataService: DataService, private apiServices: CommanServices) {
    this.getBooks();
    this.getIncome();
    this.maxDate = moment().format('YYYY-MM-DD')
    this.minDate = `${moment().format('YYYY')}-04-01`
    console.log(this.maxDate);
    console.log(this.minDate);
    

  }

  ngAfterViewInit() {
    $('#receiptDate').daterangepicker(
      {
        startDate: this.start,
        endDate: this.end,
        maxDate: this.maxDate,
        minDate: this.minDate,
        opens: 'right',
        autoApply: true,
        locale: {
          format: 'YYYY-MM-DD'
        },
        singleDatePicker: true
      },
      (start: any, end: any) => {
        this.frm.get('receiptVoucherDate')?.setValue(start.format('YYYY-MM-DD'));
        this.frm.get('bankDate')?.setValue(start.format('YYYY-MM-DD'));
      }
    );

    $('#receiptBank').daterangepicker(
      {
        startDate: this.start,
        endDate: this.end,
        maxDate: this.maxDate,
        minDate: this.minDate,
        opens: 'right',
        autoApply: true,
        locale: {
          format: 'YYYY-MM-DD'
        },
        singleDatePicker: true
      },
      (start: any, end: any) => {
        this.frm.get('bankDate')?.setValue(start.format('YYYY-MM-DD'));
      }
    );
  }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      if (data != null) {
        this.frm.get('_id')?.setValue(data._id)
        this.frm.get('receiptVoucherDate')?.setValue(data.receiptVoucherDate)
        this.frm.get('bookId')?.setValue(data.bookId)
        this.frm.get('receiptVoucherNo')?.setValue(data.receiptVoucherNo)
        this.frm.get('name')?.setValue(data.name)
        this.frm.get('amount')?.setValue(data.amount)
        this.frm.get('collected')?.setValue(data.collected)
        this.frm.get('event')?.setValue(data.event)
        this.frm.get('fromHead')?.setValue(data.fromHead)
        this.frm.get('description')?.setValue(data.description)
        this.frm.get('paymentMethod')?.setValue(data.paymentMethod)
        this.frm.get('bankDate')?.setValue(data.bankDate)
        this.frm.get('refNo')?.setValue(data.refNo)
        this.frm.get('status')?.setValue(data.status)
        // this.getUnit();
        // this.getCircle();
      }
      else {
        this.frm.reset();
        this.frm.patchValue({ fromHead: '' });
        this.frm.patchValue({ status: '' });
        this.frm.patchValue({ paymentMethod: '' });
      }
    })

  }

  async getBooks() {
    // this.apiServices.getBook().subscribe((res: any) => {
    //   console.log(res);
      this.bookList = await this.apiServices.getBook();
    // }, (error: HttpErrorResponse) => {
    //   alert(error)
    //   return;
    // })
  }
  async getIncome() {
    // this.apiServices.getIncomeWithTr().subscribe((res: any) => {
    //   console.log(res);
      this.incomeList = await this.apiServices.getIncomeWithTr();
    // }, (error: HttpErrorResponse) => {
    //   alert(error)
    //   return;
    // })
  }

  async getNumber() {
    var obj = {
      id: this.frm.value.bookId,
      type: 'Receipt'
    }
    let res = await this.apiServices.getNumber(obj)
    // .subscribe((res: any) => {
      this.frm.get('receiptVoucherNo')?.setValue(res.vocherNumber)
    // }, (error: HttpErrorResponse) => {
    //   alert(error)
    //   return;
    // })
  }

  onFileSelected(event: any) {
    const target = event.target as HTMLInputElement;
    const files: any = target.files;

    const maxSizeMB = 1;
    const allowedTypes = ['image/jpeg', 'image/png'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!allowedTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.name}`);
        target.value = '';
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File too large: ${file.name}`);
        target.value = '';
        return;
      }
    }

    this.selectedFile = files[0];
  }

  updateBankDate() {
    console.log(this.frm.value.receiptVoucherDate);
    let date: any = this.frm.value.receiptVoucherDate;
    this.frm.get('bankDate')?.setValue(date)
  }

  checkPay() {
    if (this.frm.value.paymentMethod == 'Cash') {
      this.frm.get('bankDate')?.disable();
      this.frm.get('refNo')?.disable();
    } else {
      this.frm.get('bankDate')?.enable();
      this.frm.get('refNo')?.enable();
    }
  }

  get f() {
    return this.frm.controls;
  }

  save() {
    console.log(this.frm.getRawValue());

    if (this.frm.invalid) {
      this.frm.markAllAsTouched(); // 🔸 Important
      return;
    }

    var frmData = new FormData();
    frmData.append('_id', this.frm.value._id || '');
    frmData.append('receiptVoucherDate', this.frm.value.receiptVoucherDate || '');
    frmData.append('bookId', this.frm.value.bookId || '');
    frmData.append('receiptVoucherNo', this.frm.value.receiptVoucherNo || '');
    frmData.append('name', this.frm.value.name || '');
    frmData.append('amount', this.frm.value.amount || '');
    frmData.append('collected', this.frm.value.collected || '');
    frmData.append('event', this.frm.value.event || '');
    frmData.append('fromHead', this.frm.value.fromHead || '');
    frmData.append('description', this.frm.value.description || '');
    frmData.append('paymentMethod', this.frm.value.paymentMethod || '');
    frmData.append('bankDate', this.frm.getRawValue().bankDate || '');
    frmData.append('refNo', this.frm.getRawValue().refNo || '');
    frmData.append('status', this.frm.value.status || '');
    frmData.append('type', 'Receipt');
    frmData.append('file', this.selectedFile);

    this.frmData.emit(frmData);
  }
}
