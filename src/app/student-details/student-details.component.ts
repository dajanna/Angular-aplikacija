import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../data.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent {

   constructor(private httpservice: DataService) { }

  @Input()
  studentId!: number;

  @Output()
  onClose = new EventEmitter<boolean>();

  student!: Student;

  ngOnInit() {
    this.student = new Student();
    if (this.studentId > 0) {
      this.getById();
    }
  }

  getById() {
    this.httpservice.GetById(this.studentId).subscribe((data) => {
      this.student = data;
    })
  }

  confirm() {

    if (this.student.firstName == ''
      || this.student.lastName == ''
      || this.student.identificationNumber == 0) {
      alert('morate uneti obavezne podatke (ime, preime i identifikacioni broj)');
      return;
    }

    if (this.student.id > 0) {
      this.update();
    }
    else {
      this.add();
    }
  }

  update() {
    this.httpservice.update(this.student.id, this.student).subscribe(() => {
      this.close();
    });
  }

  add() {
    this.httpservice.add(this.student).subscribe(() => {
      this.close();
    })
  }

  close() {
    this.onClose.emit(false);
  }
}
