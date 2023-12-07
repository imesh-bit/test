import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './service/auth-guard/auth.guard';
import { ChangePassWordComponent } from './components/changePassWord/changePassWord.component';
import { LocaionComponent } from './components/locaion/locaion.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    canActivate:[AuthGuardService],
    canDeactivate:[AuthGuardService],
    loadChildren: () =>
      import('./components/employee/employee.module').then((m) => m.EmployeeModule),
  },
  { path: 'location', component: LocaionComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
