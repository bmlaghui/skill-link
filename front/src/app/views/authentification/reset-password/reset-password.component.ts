import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  constructor() { }

  toaster = inject(ToastrService)
  
  resetPasswordForm!:FormGroup

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required])
    })
  }

  submit(){
    if(this.resetPasswordForm.valid)
    {
      this.toaster.success("Password reset succefully", "Success")
    }
  }


}
