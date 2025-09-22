import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/dataService';
import { CommanServices } from '../../services/commanServices';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-unitForm',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './unitForm.component.html',
  styleUrl: './unitForm.component.css',
})
export class UnitFormComponent {
  halquaList:any;
  @Input() title: any;
  @Output() frmData = new EventEmitter<any>();
  frm = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    halquaId: new FormControl('0', [Validators.required]),
  });
userData: any = JSON.parse(localStorage.getItem('userData') || '{}');
  constructor(private dataService: DataService, private apiServices: CommanServices) {
    this.getHalqua();
  }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      if (data != null) {
        this.frm.get('name')?.setValue(data.name)
        this.frm.get('_id')?.setValue(data._id)
        this.frm.get('halquaId')?.setValue(data.halquaId)
      }
      else {
        this.frm.reset()
        this.frm.get('halquaId')?.setValue(this.userData.halquaId)
      }
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
