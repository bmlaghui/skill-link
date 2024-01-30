import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{

  formCreateUser!:FormGroup;

  ngOnInit() {
    this.setForm();
  }

  setForm(){
    this.formCreateUser = new FormGroup({
      username: new FormControl('', [Validators.required]),
      tags: new FormControl([[]])
    });
  }


}
