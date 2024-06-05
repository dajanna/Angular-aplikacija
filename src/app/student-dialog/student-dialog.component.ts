import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Student } from '../student';
@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.css'
})
export class StudentDialogComponent {
  student: Student = new Student();

  constructor(
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { studentId: number },
    private httpservice: DataService
  ) {
    if (data.studentId > 0) {
      this.getById(data.studentId);
    }
  }

  getById(studentId: number) {
    this.httpservice.GetById(studentId).subscribe((data) => {
      this.student = data;
    });
  }

  confirm() {
    if (this.student.firstName === '' || this.student.lastName === '' || this.student.identificationNumber === 0) {
      alert('morate uneti obavezne podatke (ime, preime i identifikacioni broj)');
      return;
    }

    if (this.student.id > 0) {
      this.update();
    } else {
      this.add();
    }
  }

  update() {
    this.httpservice.update(this.student.id, this.student).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  add() {
    this.httpservice.add(this.student).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  close() {
    this.dialogRef.close();
  }
}
