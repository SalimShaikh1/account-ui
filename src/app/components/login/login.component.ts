import { Component, Inject, makeStateKey, OnInit, PLATFORM_ID, StateKey } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommanServices } from '../../services/commanServices';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/authService';
import { ToastrService } from 'ngx-toastr';
// import * as lang from 'assets/mr.json';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  lan: any = {};
  userObj: any = {
    contact: '',
    password: '',
  };

  constructor(
    private router: Router,
    private apiServices: CommanServices,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {

  }

  async login() {
    let res = await this.apiServices.auth(this.userObj);
    console.log(res);
    
    // this.apiServices.auth(this.userObj).subscribe((res: any) => {
      this.authService.setToken(res)
      const decoded = jwtDecode(res);
      localStorage.setItem('userData', JSON.stringify(decoded))
    //   this.toastr.success('Login Successful!', 'Success');
      this.router.navigate(['/report']);
    // }, (error: HttpErrorResponse) => {
    //   alert(error)
    //   return;
    // });
  }
}
