import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ConnectionService } from '../../../services/connection.service';

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
  username = '';
  
  
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
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  submit(){
    if(this.loginForm.valid)
    {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        response => {
          this.isLoggedIn = true,
          this.username = response.username
          this.toaster.success("User logged in succefully", "Success")
          this._router.navigate(['/dashboard'])
      },
      error => {
        this.toaster.error("Bad crediantials!","danger")
      }
      )

    }
    else {
      this.toaster.error("Please fill the form correctly","danger")
    }

  }
  
  
 
  
}
