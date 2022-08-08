import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from './confirmed.validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;
  constructor(private router: Router, private httpClient: HttpClient) {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$')
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
          )
        ]),
        confirm_password: new FormControl('', [Validators.required])
      },
      {
        validators: ConfirmedValidator
      }
    );
  }
  ngOnInit(): void {}
  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    this.httpClient
      .post('https://pk-center.herokuapp.com/auth/register', {
        username: this.registerForm.getRawValue().username,
        email: this.registerForm.getRawValue().email,
        password: this.registerForm.getRawValue().password
      })
      .subscribe((x: any) => {
        this.router.navigate(['/account/login']);
      });
  }
}
