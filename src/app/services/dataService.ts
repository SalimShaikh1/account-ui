import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataService {
  private data = new BehaviorSubject<any>(null);
  data$ = this.data.asObservable();

  updateData(data: any) {
    this.data.next(data);
  }
}