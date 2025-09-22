import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-print',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './print.component.html',
  styleUrl: './print.component.css',
})
export class PrintComponent {
  constructor() {
   
  }
}
