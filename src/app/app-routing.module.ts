import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AuthControl } from './authControl.guard';
import { AuthService } from './services/auth.service';
import { UsersComponent } from './page/users/users.component';
import { AccountsComponent } from './page/accounts/accounts.component';
import { SettingsComponent } from './page/settings/settings.component';
import { PotentialComponent } from './page/potential/potential.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthControl]},
  { path: 'users', component: UsersComponent,canActivate: [AuthControl]},
  { path: 'accounts', component: AccountsComponent,canActivate: [AuthControl]},
  { path: 'potential', component: PotentialComponent,canActivate: [AuthControl]},
  { path: 'settings', component: SettingsComponent,canActivate: [AuthControl]},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthControl, AuthService]
})
export class AppRoutingModule { }
