import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/dataService';
import { CommanServices } from '../../services/commanServices';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-userForm',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './userForm.component.html',
  styleUrl: './userForm.component.css',
})
export class UserFormComponent {
  halquaList: any;
  unitList: any
  circleList: any
  roleList: any
  @Input() title: any;
  @Output() frmData = new EventEmitter<any>();
  frm = new FormGroup({
    _id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    halquaId: new FormControl('', [Validators.required]),
    unitId: new FormControl('', [Validators.required]),
    circleId: new FormControl('', [Validators.required]),
    roleId: new FormControl('', [Validators.required]),
  });
  userData: any = JSON.parse(localStorage.getItem('userData') || '{}');
  constructor(private dataService: DataService, private apiServices: CommanServices) {
    this.getHalqua();
    this.getRole();
  }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      if (data != null) {
        this.frm.get('_id')?.setValue(data._id)
        this.frm.get('firstName')?.setValue(data.firstName)
        this.frm.get('middleName')?.setValue(data.middleName)
        this.frm.get('lastName')?.setValue(data.lastName)
        this.frm.get('contact')?.setValue(data.contact)
        this.frm.get('password')?.setValue(data.password)
        this.frm.get('halquaId')?.setValue(data.halquaId)
        this.frm.get('unitId')?.setValue(data.unitId)
        this.frm.get('circleId')?.setValue(data.circleId)
        this.frm.get('roleId')?.setValue(data.roleId)

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
    // this.apiServices.getHalqua().subscribe((res: any) => {
    //   console.log(res);
      this.halquaList = await this.apiServices.getHalqua();
    // }, (error: HttpErrorResponse) => {
    //   alert(error)
    //   return;
    // })
  }
  async getRole() {
    // this.apiServices.getRole().subscribe((res: any) => {
    //   console.log(res);
      this.roleList = await this.apiServices.getRole();
    // }, (error: HttpErrorResponse) => {
    //   alert(error)
    //   return;
    // })
  }

  async getUnit() {
    // this.apiServices.getUnit(this.frm.value.halquaId).subscribe((res: any) => {
    //   console.log(res);
      this.unitList = await this.apiServices.getUnit(this.frm.value.halquaId)
    // }, (error: HttpErrorResponse) => {
    //   alert(error)
    //   return;
    // })
  }

  async getCircle() {
    // this.apiServices.getCircle(this.frm.value.unitId).subscribe((res: any) => {
    //   console.log(res);
      this.circleList = await this.apiServices.getCircle(this.frm.value.unitId)
    // }, (error: HttpErrorResponse) => {
    //   alert(error)
    //   return;
    // })
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
