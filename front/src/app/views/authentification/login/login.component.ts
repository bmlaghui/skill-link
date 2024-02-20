import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ConnectionService } from '../../../core/services/connection.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  
  toaster = inject(ToastrService)
  
  loginForm!:FormGroup
  
  isLoggedIn = false;
  userName = '';
  
  
  connected: Observable<boolean> = new Observable<boolean>(); // Initialize connected as an Observable<boolean>

  ngOnInit() {
    this.setForm();
    this.connectionService.testPing().subscribe(data=>{
      if (data.message == 'ok') {
        this.connected = of(true);
      }
    });
  }

  constructor(
    private _router:Router,
    private authService:AuthService,
    public connectionService:ConnectionService
  ){}

  setForm(){
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  submit(){
    if(this.loginForm.valid)
    {
      this.authService.login(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe(
        response => {
          this.isLoggedIn = true,
          this.userName = response.userName
          this.toaster.success("User logged in succefully", "Success")
          this._router.navigate(['/dashboard'])
      },
      error => {
        this.toaster.error(error.error.err,"Error")
      }
      )

    }
    else {
      this.toaster.error("Please fill the form correctly","Error")
    }

  }
  
}
