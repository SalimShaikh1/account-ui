import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './common/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { HalquaComponent } from './components/halqua/halqua.component';
import { unitComponent } from './components/unit/unit.component';
import { CircleComponent } from './components/circle/circle.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { SubExpenseComponent } from './components/subExpense/subExpense.component';
import { BookComponent } from './components/book/book.component';
import { UserComponent } from './components/user/user.component';
import { VoucherComponent } from './components/voucher/voucher.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ReportComponent } from './components/report/report.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './services/auth.guard';
import { FaqComponent } from './components/faq/faq.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'halqua', component: HalquaComponent },
            { path: 'unit', component: unitComponent },
            { path: 'circle', component: CircleComponent },
            { path: 'income', component: IncomeComponent },
            { path: 'expense', component: ExpenseComponent },
            { path: 'subExpense', component: SubExpenseComponent },
            { path: 'book', component: BookComponent },
            { path: 'user', component: UserComponent },
            { path: 'voucher', component: VoucherComponent },
            { path: 'receipt', component: ReceiptComponent },
            { path: 'report', component: ReportComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'faq', component: FaqComponent },
        ],
    },
];
