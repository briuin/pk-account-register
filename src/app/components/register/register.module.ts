import { RegisterRoutingModule } from './register-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RegisterRoutingModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
