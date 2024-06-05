import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Student } from '../student';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { MatDialog } from '@angular/material/dialog';
const MaterialComponents = [MatTableModule, MatInputModule];

@Component({
  selector: 'app-podaci',
  templateUrl: './podaci.component.html',
  styleUrl: './podaci.component.css'
})
export class PodaciComponent {

 filter:string=""
 students: Student[]=[];
 studentId!: number;
 showDetails!: boolean;
 dataSource = new MatTableDataSource(this.students);
 displayedColumns: string[] = ['avatar', 'id', 'firstName', 'lastName', 'adress', 'email', 'akcije'];
 constructor(private httpservice: DataService, private dialog: MatDialog) { ;
 }

 primeniFilter(filter: any) {
  this.dataSource.filter = filter.target.value.trim().toLowerCase();
  }
  
 getAll() {
   this.httpservice.GetAll().subscribe((data) => {
     this.students = data;
     this.dataSource.data = this.students;
   })
 }

 showStudentDetails(studentId: number) {
  const dialogRef = this.dialog.open(StudentDialogComponent, {
    width: '400px',
    data: { studentId: studentId }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getAll();
    }
  });
}


 deleteStudent(id: number) {
   if (confirm("Da li ste sigurni da zelite da obrisete?")) {
     this.httpservice.delete(id).subscribe(() => {
       this.getAll();
     });
   }
 }

 onStudentConfirm(prikaz: boolean) {
   this.getAll();
   this.showDetails = prikaz;

 }
}