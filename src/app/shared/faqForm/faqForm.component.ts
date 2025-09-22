import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/dataService';
import { CommanServices } from '../../services/commanServices';

@Component({
  selector: 'app-faqForm',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './faqForm.component.html',
  styleUrl: './faqForm.component.css',
})
export class FaqFormComponent {
  halquaList: any;
  unitList: any
  circleList: any
  @Input() title: any;
  @Output() frmData = new EventEmitter<any>();
  frm = new FormGroup({
    _id: new FormControl(''),
    question: new FormControl('', [Validators.required]),
    answer: new FormControl(1, [Validators.required])
  });
  userData: any = JSON.parse(localStorage.getItem('userData') || '{}');

  constructor(private dataService: DataService, private apiServices: CommanServices) {
  }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      if (data != null) {
        this.frm.get('_id')?.setValue(data._id)
        this.frm.get('question')?.setValue(data.question)
        this.frm.get('answer')?.setValue(data.answer)

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
    if (this.frm.invalid) {
      this.frm.markAllAsTouched(); // 🔸 Important
      return;
    }
    this.frmData.emit(this.frm.value);
  }
}
