import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, TagInputModule ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{
onTagAdded() {
throw new Error('Method not implemented.');
}
  items=[];
  myGroup!:FormGroup;

  ngOnInit() {
    this.setForm();
  }

  setForm(){
    this.myGroup = new FormGroup({
      competences: new FormControl([]),
      formations: new FormControl([]),
      experiences: new FormControl([]),
      interests  : new FormControl([]),
      firstName: new FormControl()
  });

 

  }


}
