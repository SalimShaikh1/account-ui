import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/dataService';
import { CommanServices } from '../../services/commanServices';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bookForm',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bookForm.component.html',
  styleUrl: './bookForm.component.css',
})
export class BookFormComponent {
  halquaList:any;
  unitList:any
  circleList:any
  @Input() title: any;
  @Output() frmData = new EventEmitter<any>();
  frm = new FormGroup({
    _id: new FormControl(''),
    bookNumber: new FormControl('', [Validators.required]),
    startNumber: new FormControl(1, [Validators.required]),
    endNumber: new FormControl(50, [Validators.required]),
    halquaId: new FormControl('', [Validators.required]),
    unitId: new FormControl('', [Validators.required]),
    circleId: new FormControl('', [Validators.required]),
  });
  userData: any = JSON.parse(localStorage.getItem('userData') || '{}');

  constructor(private dataService: DataService, private apiServices: CommanServices) {
    this.getHalqua();
  }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      if (data != null) {
        this.frm.get('_id')?.setValue(data._id)
        this.frm.get('bookNumber')?.setValue(data.bookNumber)
        this.frm.get('startNumber')?.setValue(data.startNumber)
        this.frm.get('endNumber')?.setValue(data.endNumber)
        this.frm.get('halquaId')?.setValue(data.halquaId)
        this.frm.get('unitId')?.setValue(data.unitId)
        this.frm.get('circleId')?.setValue(data.circleId)
        
      }
      else {
        this.frm.reset();
        this.frm.get('halquaId')?.setValue(this.userData.halquaId)
        this.frm.get('unitId')?.setValue(this.userData.unitId)
        this.frm.get('circleId')?.setValue(this.userData.circleId)
      }
      this.getUnit();
        this.getCircle();
    })
    
  }

  async getHalqua() {
    // .subscribe((res: any) => {
      // console.log(res);
      this.halquaList = await this.apiServices.getHalqua();
    // }, (error: HttpErrorResponse) => {
    //   alert(error)
    //   return;
    // })
  }

  async getUnit() {
    // this.apiServices.getUnit(this.frm.value.halquaId).subscribe((res: any) => {
      // console.log(res);
      this.unitList = await this.apiServices.getUnit(this.frm.value.halquaId)
    // }, (error: HttpErrorResponse) => {
    //   alert(error)
    //   return;
    // })
  }
 
  async getCircle() {
    // this.apiServices.getCircle(this.frm.value.unitId).subscribe((res: any) => {
      // console.log(res);
      this.circleList = await this.apiServices.getCircle(this.frm.value.unitId)
    // }, (error: HttpErrorResponse) => {
    //   alert(error)
    //   return;
    // })
  }

  setNumber(){
    this.frm.get('_id')?.value
    console.log(this.frm.get('bookNumber')?.value);

    let s = (parseInt(this.frm.get('bookNumber')?.value ?? '0') - 1) * 50 + 1
    this.frm.get('startNumber')?.setValue(s)
    this.frm.get('endNumber')?.setValue(s+49)
    
  }

   get f() {
    return this.frm.controls;
  }

  save() {
    if (this.frm.invalid) {
      this.frm.markAllAsTouched(); // 🔸 Important
      return;
    }
    this.frmData.emit(this.frm.value);
  }
}
