import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployeeRoutes } from './employee.routing.module';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { NewEmployeeComponent } from './newEmployee/newEmployee.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list'; // Import MatListModule
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { DeductionService } from 'src/app/service/deduction-service/deduction.service';
import { AllowanceService } from 'src/app/service/allowance-service/allowance.service';
import { WadgeBoardComponent } from './wadgeBoard/wadgeBoard/wadgeBoard.component';
import { PositionsComponent } from './positions/positions/positions.component';
import { BankComponent } from './bank/bank.component';
import { AllowancesComponent } from './allowances/allowances.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DeductionsComponent } from './deductions/deductions.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/service/auth-service/auth-service.service';
import { CustomHttpInterceptorService } from 'src/app/utill/custom-http-interceptor';
import { DesignationComponent } from './designation/designation.component';
import { OccupationalGroupComponent } from './occupationalGroup/occupationalGroup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import MatProgressSpinnerModule
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AllownaceRequestComponent } from './allownaceRequest/allownaceRequest.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoanManagerComponent } from '../loanManager/loanManager.component';
import { NewLoanComponent } from '../newLoan/newLoan.component';
import { SalaryAllowanceComponent } from '../salaryAllowance/salaryAllowance.component';
import { PayrollComponent } from '../payroll/payroll.component';
import { SalaryEditComponent } from '../salaryEdit/salaryEdit.component';
import { BonusComponent } from './bonus/bonus.component';
import { PayrollMonthComponent } from '../payrollMonth/payrollMonth.component';
import {MatSliderModule} from '@angular/material/slider';
import {ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';
import { SalarySlipComponent } from '../salarySlip/salarySlip.component';
import { NonecashbenifitComponent } from '../nonecashbenifit/nonecashbenifit.component';
import { UserComponent } from '../user/user.component';
import { LocaionComponent } from '../locaion/locaion.component';
import { TerminationComponent } from '../termination/termination.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NotfoundComponent } from '../notfound/notfound.component';
import { PaySlipUserDashBoardComponent } from '../paySlipUserDashBoard/paySlipUserDashBoard.component';
import { SalarySlipService } from 'src/app/service/salary-slip/salarySlip.service';
import { AttendanceService } from 'src/app/service/attendance-service/attendance.service';
import { InventryComponent } from '../inventry/inventry.component';
@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutes,
    FlexLayoutModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatTooltipModule,
    MatCardModule,
    NgxChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    NgIf,
    MatSliderModule,
    MatProgressBarModule,
    MatTabsModule,
  ],
  declarations: [
    EmployeeComponent,
    ProfileComponent,
    NewEmployeeComponent,
    WadgeBoardComponent,
    PositionsComponent,
    BankComponent,
    AllowancesComponent,
    DeductionsComponent,
    DesignationComponent,
    OccupationalGroupComponent,
    AttendanceComponent,
    AllownaceRequestComponent,
    LoanManagerComponent,
    NewLoanComponent,
    SalaryAllowanceComponent,
    PayrollComponent,
    SalaryEditComponent,
    BonusComponent,
    PayrollMonthComponent,
    SalarySlipComponent,
    NonecashbenifitComponent,
    UserComponent,
    LocaionComponent,
    TerminationComponent,
    NotfoundComponent,
    PaySlipUserDashBoardComponent,
    InventryComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptorService,
      multi: true
    },
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    // AuthService,
    // EmployeeService,
    // DeductionService,
    // AllowanceService,
    // AttendanceService,
    // SalarySlipService
  ],
  bootstrap: [EmployeeComponent]

})
export class EmployeeModule { }
