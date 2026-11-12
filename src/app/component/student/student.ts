
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService, StudentRec } from '../../service/student';

@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-student',
  styleUrl: './student.css',
  templateUrl: './student.html',
})
export class Student {

  studentName: string = '';
  studentAge: number = 0;
  department: string = '';
  email: string = '';

  constructor(
    private studentRec: StudentService,
    private router: Router
  ) {}

  registerStudent() {

    const student: StudentRec = {
      id: Date.now(),
      name: this.studentName,
      age: this.studentAge,
      department: this.department,
      email: this.email
    };

    this.studentRec.addStudent(student);

    alert('Student registered successfully!');

    this.router.navigate(['/student-list']);
  }
}
