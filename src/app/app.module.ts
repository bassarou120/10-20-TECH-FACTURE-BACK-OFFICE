import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


// import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd/modal';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {LoginComponent, LoginModule} from './login';
import {AuthService} from './utils/auth.service';
import {TokenStorage} from './utils/token.storage';
import {BrowserModule} from '@angular/platform-browser';
import {JwtInterceptor} from './utils/JwtInterceptor';
import {ErrorInterceptor} from './utils/ErrorInterceptor';
import {CreateAdminComponent} from './create-admin/create-admint.component';
import { QuillModule } from 'ngx-quill';
import { NgxQuillModule } from '@dimpu/ngx-quill';





@NgModule({
  imports: [
    BrowserAnimationsModule,

    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxQuillModule


  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoginComponent,
    CreateAdminComponent
  ],


  providers: [
    AuthService,
    TokenStorage,
    // { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
