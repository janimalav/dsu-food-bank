import { UserModel } from './../@core/model/user.model';
import { RoleModel } from './../@core/model/role.model';
import { SignupService } from './signup.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@shared/mat-dialog-wrapper/mat-dialog-wrapper.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  roles: RoleModel[];
  User: UserModel;
  constructor(
    private SignupService: SignupService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _matDialog: MatDialog
  ) {}
  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };

  ngOnInit() {
    this._createSignupForm();
    this.loadRoles();
  }
  ngOnDestroy() {}

  signup() {
    try {
      console.log(this.signupForm.controls);
      if (this.signupForm.valid) {
        this.SignupService.addUser(this.signupForm.value).subscribe(
          (res) => {
            const dialogConfig = this._matDialogConfig;
            dialogConfig.data = { header: 'Success!', content: 'User added successfully.' };
            this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
            this.router.navigate(['/login']);
          },
          (error) => {
            if (error.status == 500) {
              const dialogConfig = this._matDialogConfig;
              dialogConfig.data = { header: 'Failure!', content: 'Please try again.' };
              this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
            }
          }
        );
      }
    } catch (e) {
      const dialogConfig = this._matDialogConfig;
      dialogConfig.data = { header: 'Failure!', content: 'Error Occured.' };
      this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
    }
  }

  loadRoles() {
    this.roles = this.SignupService.getAllroles();
  }

  get bannerId() {
    return this.signupForm.controls.bannerId;
  }
  get firstName() {
    return this.signupForm.controls.firstName;
  }
  get lastName() {
    return this.signupForm.controls.lastName;
  }
  get email() {
    return this.signupForm.controls.email;
  }
  get password() {
    return this.signupForm.controls.password;
  }
  get role() {
    return this.signupForm.controls.role;
  }
  get confirm_password() {
    return this.signupForm.controls.confirm_password;
  }
  private _createSignupForm() {
    this.signupForm = this.formBuilder.group(
      {
        bannerId: ['', [Validators.required, Validators.maxLength(9)]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')],
        ],
        confirm_password: ['', Validators.required],
        role: ['', Validators.required],
      },
      {
        validator: ConfirmedValidator('password', 'confirm_password'),
      }
    );
  }
}
