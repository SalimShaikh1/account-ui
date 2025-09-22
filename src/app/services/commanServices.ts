import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './authService';

@Injectable({
  providedIn: 'root',
})
export class CommanServices {
  baseUrl = 'https://account-g5wi.onrender.com/api/';
  constructor(private http: HttpClient, private toastr: ToastrService, private authService: AuthService) { }

  async auth(data: any) {
    return await this.post(`users/auth`, data)
  }

  async getUser() {
    return await this.get(`users`)
  }

  async saveUser(data: any) {
    return await this.post(`users`, data)
  }

  async getHalqua() {
    return await this.get(`halqua`)
  }

  async saveHalqua(data: any) {
    return await this.post(`halqua`, data)
  }

  async deleteHalqua(data: any) {
    return await this.post(`halqua/delete`, data)
  }

  async getUnit(halquaId: any) {
    return await this.get(`units?halquaId=${halquaId}`)
  }

  async saveUnit(data: any) {
    return await this.post(`units`, data)
  }

  async getCircle(unitId: any) {
    return await this.get(`circles?unitId=${unitId}`)
  }

  async saveCircle(data: any) {
    return await this.post(`circles`, data)
  }

  async getBook() {
    return await this.get(`books`)
  }

  async saveBook(data: any) {
    return await this.post(`books`, data)
  }

  async getRole() {
    return await this.get(`roles`)
  }

  async saveRole(data: any) {
    return await this.post(`roles`, data)
  }

  async getIncome() {
    return await this.get(`income`)
  }

  async getIncomeWithTr() {
    return await this.get(`income/withTr`)
  }

  async saveIncome(data: any) {
    return await this.post(`income`, data)
  }

  async getExpense(type: any, expenseId: any) {
    return await this.get(`expenses?type=${type}&expenseId=${expenseId}`)
  }

  async saveExpense(data: any) {
    return await this.post(`expenses`, data)
  }


  async getTransaction(type: any) {
    return await this.get(`transaction?type=${type}`)
  }

  async saveTransaction(data: any) {
    return await this.post(`transaction`, data)
  }

  async getNumber(data: any) {
    return await this.post(`transaction/vocherNumber`, data)
  }

  async report(data: any) {
    return await this.post(`transaction/report`, data)
  }

  async recipetReport(data: any) {
    return await this.post(`transaction/recipetReport`, data)
  }

  async getFaq() {
    return await this.get(`faq`)
  }

  async saveFaq(data: any) {
    return await this.post(`faq`, data)
  }


  get(endPoint: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}${endPoint}`).subscribe({
        next: (res: any) => {
          // this.toastr.success(res.message, 'Success');
          resolve(res.data);
        },
        error: (error: HttpErrorResponse) => {

          if (error.error.error == 'Invalid token.') {
            this.authService.logout();
          }

          this.toastr.error(error.error.message, 'Error');

          reject(error);
        }
      });
    });
  }

  post(endPoint: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}${endPoint}`, data).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'Success');
          resolve(res.data);
        },
        error: (error: HttpErrorResponse) => {
          if (error.error.error == 'Invalid token.') {
            this.authService.logout();
          }
          this.toastr.error(error.error.message, 'Error');
          reject(error);
        }
      });
    });
  }


}