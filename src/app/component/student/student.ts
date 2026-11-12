
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-student',
  styleUrl: './student.css',
  templateUrl: './student.html',
})
export class Student {

  studentName: string = '';
  studentAge: number | null = null;
  department: string = '';
  email: string = '';

  constructor(private router: Router) {}

  registerStudent() {

    const student = {
      id: Date.now(),
      name: this.studentName,
      age: this.studentAge,
      department: this.department,
      email: this.email
    };

    let students = JSON.parse(localStorage.getItem('students') || '[]');

    students.push(student);

    localStorage.setItem('students', JSON.stringify(students));

    alert('Student registered successfully!');

    this.router.navigate(['/student-list']);
  }
}
