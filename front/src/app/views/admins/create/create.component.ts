import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{
  usersService = inject(UsersService);
  toaster = inject(ToastrService)
  myGroup!:FormGroup;
  setForm(){
    this.myGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      photo: new FormControl('')
    }
    )
  }
  ngOnInit() {
    this.setForm();
    const passwordControl = this.myGroup.get('password');
    const passwordConfirmControl = this.myGroup.get('passwordConfirm');
    if (passwordControl && passwordConfirmControl) {
        this.myGroup.addValidators(
        this.matchValidator(passwordControl, passwordConfirmControl)
      );
    }
    
  }
  matchValidator(
    control: AbstractControl,
    controlTwo: AbstractControl
  ): ValidatorFn {
    return () => {
      if (control.value !== controlTwo.value)
        return { match_error: 'Value does not match' };
      return null;
    };
  }
  submitForm(){
     if(this.myGroup.valid)
      {
        const user = this.myGroup.value;
        user.role = 'admin';

        console.log("USER", user);
        this.usersService.createUser(user).subscribe(
          (response) => {
            this.toaster.success("User created successfully", "Success")
            
          },
          (error) => {
            this.toaster.error("Error while creating user: "+error.error.err, "Error")
          }
        )

      }
    
  }

}
