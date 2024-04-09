import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})

export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user: User;
  userSubmitted:boolean
  constructor(private fb: FormBuilder, private userService: UserService,private alertify:AlertifyService ) {}

  ngOnInit(): void {
    // this.registrationForm = new FormGroup(
    //   {
    //     userName: new FormControl(null, Validators.required),
    //     email: new FormControl(null, [Validators.required, Validators.email]),
    //     password: new FormControl(null, [
    //       Validators.required,
    //       Validators.minLength(8),
    //     ]),
    //     confirmPassword: new FormControl(null, Validators.required),
    //   },this.passwordMatchingValidatior );
    this.createRegistrationForm();
    // Add the validators property here
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group(
      {
        userName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, Validators.required],
      },
      { validators: this.passwordMatchingValidatior }
    );
  }

  // Cross field validations
  passwordMatchingValidatior(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    const error = { notmatched: true };
    const isValid = password?.value === confirmPassword?.value;
    if (!isValid) {
      confirmPassword?.setErrors(error);
    }
    return isValid ? null : error;
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.userSubmitted=true;
    if (this.registrationForm.valid) {  //so that empty data cannot be added
      
      //this.user = Object.assign(this.user, this.registrationForm.value);
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.userSubmitted=false;
      this.alertify.success('You are registered Successfully')
    }
    else{
      this.alertify.error('Kindly provide all required details')
    }
    //localStorage.setItem('Users', JSON.stringify(this.user));
  }

  //     if (this.registerationForm.valid) {
  //         // this.user = Object.assign(this.user, this.registerationForm.value);
  //         this.authService.registerUser(this.userData()).subscribe(() =>
  //         {
  //             this.onReset();
  //             this.alertify.success('Congrats, you are successfully registered');
  //         });
  //     }
  // }

  userData(): User {
    let isAdmin=false
    if(this.email.value==='admin@example.com' && this.password.value==='Admin1234' && this.userName.value==='Admin'){
      isAdmin=true;
      console.log('Admin',isAdmin);
    }
    return this.user = {
        userName: this.userName.value,
        email: this.email.value,
        password: this.password.value,
        isAdmin:isAdmin,
    };
  }

  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }
  get password() {
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  // onSubmit() {
  //   console.log(this.registrationForm);
  // }
}
