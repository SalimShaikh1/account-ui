import { Component, EventEmitter, Inject, Input, makeStateKey, Output, PLATFORM_ID, StateKey } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/dataService';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-halquaForm',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './halquaForm.component.html',
  styleUrl: './halquaForm.component.css',
})
export class HalquaFormComponent {
  @Input() title: any;
  @Output() frmData = new EventEmitter<any>();
  frm = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
  });
  private isBrowser: boolean;

  constructor(private dataService: DataService, @Inject(PLATFORM_ID) platformId: Object) {
    console.log(isPlatformBrowser(platformId));
    console.log(platformId);

    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      if (data != null) {
        this.frm.get('name')?.setValue(data.name)
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
    if (this.frm.invalid) {
      this.frm.markAllAsTouched(); // 🔸 Important
      return;
    }
    this.frmData.emit(this.frm.value);
  }
}
