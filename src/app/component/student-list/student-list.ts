
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-student-list',
  styleUrl: './student-list.css',
  templateUrl: './student-list.html',
})
export class StudentList implements OnInit {

  students: any[] = [];

  ngOnInit() {
    this.students = JSON.parse(localStorage.getItem('students') || '[]');
  }
}
