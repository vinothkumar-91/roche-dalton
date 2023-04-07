import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe,CommonModule } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { provideOAuthClient } from 'angular-oauth2-oidc';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';

import { HeaderComponent } from './components/header/header.component';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { CommonalertComponent } from './components/commonalert/commonalert.component';
import { ApiInterceptor } from "./apiInterceptor";
// import { httpInterceptorProviders } from './http-interceptors/index';
import { WindowRef } from './WindowRef';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSelectModule } from 'ngx-select-ex';
import { SortablejsModule } from 'ngx-sortablejs';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AppMaterialModules } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaincontainerComponent } from './page/maincontainer/maincontainer.component';


import { UsersComponent } from './page/users/users.component';
import { AccountsComponent } from './page/accounts/accounts.component';
import { SettingsComponent } from './page/settings/settings.component';
import { PotentialComponent } from './page/potential/potential.component';
import { BarchartComponent } from './charts/barchart/barchart.component';
import { BarverticalComponent } from './charts/barvertical/barvertical.component';
import { PiedonutComponent } from './charts/piedonut/piedonut.component';
import { PotentialformComponent } from './page/potentialform/potentialform.component';
import { PotentialdetailComponent } from './page/potentialdetail/potentialdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeftNavComponent,CommonalertComponent,
    HeaderComponent,
    DashboardComponent,
    MaincontainerComponent,
    UsersComponent,
    AccountsComponent,
    SettingsComponent,
    PotentialComponent,
    BarchartComponent,
    BarverticalComponent,
    PiedonutComponent,
    PotentialformComponent,
    PotentialdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableExporterModule,
    NgxIntlTelInputModule,
    ChartsModule,
    AppMaterialModules,
    BrowserAnimationsModule,
    CommonModule,
    NoopAnimationsModule, SortablejsModule.forRoot({ animation: 150 }),
    OAuthModule.forRoot()
  ],
  providers: [DatePipe,
    // ApiInterceptor,

    {
      provide : HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi   : true,
    },
    // httpInterceptorProviders,
    WindowRef,provideOAuthClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
