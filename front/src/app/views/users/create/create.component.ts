import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { ConnectableObservable } from 'rxjs';

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
  items=[]; items2=[];
  myGroup!:FormGroup;

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

  setForm(){
    this.myGroup = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      telephone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      cvlink: new FormControl(''),
      linkedinlink: new FormControl(''),
      portfoliolink: new FormControl(''),
      githublink: new FormControl(''),
      skills: new FormControl('[]'),
      interests: new FormControl('[]'),
      photo: new FormControl(''),
      formations: new FormControl('[]'),
      experiences: new FormControl('[]'),
      beginDateFormation1 : new FormControl(''),
      endDateFormation1 : new FormControl(''),
      diplomeFormation1 : new FormControl(''),
      descriptionFormation1 : new FormControl(''),
      beginDateFormation2 : new FormControl(''),
      endDateFormation2 : new FormControl(''),
      diplomeFormation2 : new FormControl(''),
      descriptionFormation2 : new FormControl(''),
      beginDateFormation3 : new FormControl(''),
      endDateFormation3 : new FormControl(''),
      diplomeFormation3 : new FormControl(''),
      descriptionFormation3 : new FormControl(''),
      beginDateExperience1 : new FormControl(''),
      endDateExperience1 : new FormControl(''),
      posteExperience1 : new FormControl(''),
      descriptionExperience1 : new FormControl(''),
      beginDateExperience2 : new FormControl(''),
      posteExperience2 : new FormControl(''),
      descriptionExperience2 : new FormControl(''),
      endDateExperience2 : new FormControl(''),
      beginDateExperience3 : new FormControl(''),
      posteExperience3 : new FormControl(''),
      descriptionExperience3 : new FormControl('')

    }
    )
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


  submitCandidate(){
    console.log('submit')
    console.log(this.myGroup.value);
  if(this.myGroup.valid)
    {
      console.log(this.myGroup.value);
    }
  }


 


}
