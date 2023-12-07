import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EmployeeComponent } from './employee.component';
import { NewEmployeeComponent } from './newEmployee/newEmployee.component';
import { WadgeBoardComponent } from './wadgeBoard/wadgeBoard/wadgeBoard.component';
import { PositionsComponent } from './positions/positions/positions.component';
import { BankComponent } from './bank/bank.component';
import { AllowancesComponent } from './allowances/allowances.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { DeductionsComponent } from './deductions/deductions.component';
import { DesignationComponent } from './designation/designation.component';
import { OccupationalGroupComponent } from './occupationalGroup/occupationalGroup.component';
import { DashBoardComponent } from '../dashBoard/dashBoard.component';
import { ChangePassWordComponent } from '../changePassWord/changePassWord.component';
import { AllownaceRequestComponent } from './allownaceRequest/allownaceRequest.component';
import { UserGroupComponent } from '../userGroup/userGroup.component';
import { LoanManagerComponent } from '../loanManager/loanManager.component';
import { NewLoanComponent } from '../newLoan/newLoan.component';
import { SalaryAllowanceComponent } from '../salaryAllowance/salaryAllowance.component';
import { PayrollComponent } from '../payroll/payroll.component';
import { SalaryEditComponent } from '../salaryEdit/salaryEdit.component';
import { BonusComponent } from './bonus/bonus.component';
import { PayrollMonthComponent } from '../payrollMonth/payrollMonth.component';
import { SalarySlipComponent } from '../salarySlip/salarySlip.component';
import { NonecashbenifitComponent } from '../nonecashbenifit/nonecashbenifit.component';
import { UserComponent } from '../user/user.component';
import { LocaionComponent } from '../locaion/locaion.component';
import { TerminationComponent } from '../termination/termination.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { PaySlipUserDashBoardComponent } from '../paySlipUserDashBoard/paySlipUserDashBoard.component';
import { InventryComponent } from '../inventry/inventry.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      { path: 'dashBoard', component: DashBoardComponent },
      { path: '', redirectTo: 'dashBoard', pathMatch: 'full' },
      { path: 'employee', component: ProfileComponent },
      { path: 'register', component: NewEmployeeComponent },
      { path: 'wageBoard', component: WadgeBoardComponent },
      { path: 'positions', component: PositionsComponent },
      { path: 'bank', component: BankComponent },
      { path: 'allowance', component: AllowancesComponent },
      { path: 'attendence', component: AttendanceComponent },
      { path: 'deduction', component: DeductionsComponent },
      { path: 'department', component: DesignationComponent },
      { path: 'occupational', component: OccupationalGroupComponent },
      { path: 'changePassWord', component: ChangePassWordComponent },
      { path: 'allownceRequest', component: AllownaceRequestComponent },
      { path: 'userGroup', component: UserGroupComponent },
      { path: 'loanManager', component: LoanManagerComponent },
      { path: 'newLoan', component: NewLoanComponent },
      { path: 'salaryAllowance', component: SalaryAllowanceComponent },
      { path: 'payroll', component: PayrollComponent },
      { path: 'editSalary', component: SalaryEditComponent },
      { path: 'bonus', component: BonusComponent },
      { path: 'payrollmonth', component: PayrollMonthComponent },
      { path: 'salaryslip', component: SalarySlipComponent },
      { path: 'nonecash', component: NonecashbenifitComponent },
      { path: 'user', component: UserComponent },
      { path: 'termination', component: TerminationComponent },
      { path: 'notFound', component: NotfoundComponent },
      { path: 'slipUser', component: PaySlipUserDashBoardComponent },
      { path: 'inventry', component: InventryComponent },


    ],
  },
];

export const EmployeeRoutes = RouterModule.forChild(routes);
