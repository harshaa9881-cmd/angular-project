import { Component } from '@angular/core';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-student',
  styleUrl: './student.css',
  templateUrl: './student.html',
})
export class Student {
  studentName: string = 'John Doe';
  studentAge: number = 23;
  course: string = 'Computer Science';
  displayDetails(){
    console.log(`Name: ${this.studentName}, Age: ${this.studentAge}, Course: ${this.course}`);
  }
}
