import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router:Router, private fb: FormBuilder){}


clickHandler(){
  const confirm=prompt('Are you sure you want to go here?');
  if(confirm==='yes'){
    this.router.navigate(['podaci']);
  }
}
studentForm!: FormGroup;

 ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['Dajana', Validators.required],
      lastName: ['Brcic', Validators.required],
      indexNumber: ['1i1/0057/21', Validators.required],
    });
  }

  onSubmit(): void {
    console.log('Form Data:', this.studentForm.value);
  }

}
