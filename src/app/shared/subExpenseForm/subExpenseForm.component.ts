import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/dataService';
import { CommanServices } from '../../services/commanServices';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-subExpenseForm',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subExpenseForm.component.html',
  styleUrl: './subExpenseForm.component.css',
})
export class SubExpenseFormComponent {
  expense: any = JSON.parse(localStorage.getItem('expense') || '');
  halquaList: any;
  unitList: any
  @Input() title: any;
  @Output() frmData = new EventEmitter<any>();
  frm = new FormGroup({
    _id: new FormControl(''),
    expenseMain: new FormControl('', [Validators.required]),
    expenseId: new FormControl('', [Validators.required]),
    expenseSub: new FormControl('', [Validators.required]),
    // fromBucket: new FormControl('', [Validators.required]),
    halquaId: new FormControl('', [Validators.required]),
    unitId: new FormControl('', [Validators.required]),
  });

  constructor(private dataService: DataService, private apiServices: CommanServices) {
  }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      if (data != null) {
        this.frm.get('expenseSub')?.setValue(data.expenseSub)
        // this.frm.get('fromBucket')?.setValue(data.fromBucket)
        this.frm.get('_id')?.setValue(data._id)
      }
      else {
        this.frm.reset();
      }
    })

  }

  get f() {
    return this.frm.controls;
  }



  save() {

    this.frm.get('expenseMain')?.setValue(this.expense.expenseMain)
    this.frm.get('expenseId')?.setValue(this.expense._id)
    this.frm.get('halquaId')?.setValue(this.expense.halquaId)
    this.frm.get('unitId')?.setValue(this.expense.unitId)

    if (this.frm.invalid) {
      this.frm.markAllAsTouched(); // 🔸 Important
      return;
    }
    if (this.frm.invalid) {
      this.frm.markAllAsTouched(); // 🔸 Important
      return;
    }
    this.frmData.emit(this.frm.value);
  }
}
