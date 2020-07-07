import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';
import {HttpClientModule} from '@angular/common/http';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxJsonViewerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
