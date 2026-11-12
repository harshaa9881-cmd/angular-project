
import { Component, OnInit } from '@angular/core';
import { StudentService, StudentRec } from '../../service/student';
import { StudentCard } from '../student-card/student-card';

@Component({
  imports: [StudentCard],
  standalone: true,
  selector: 'app-student-list',
  styleUrl: './student-list.css',
  templateUrl: './student-list.html',
})
export class StudentList implements OnInit {

  students: StudentRec[] = [];

  constructor(private studentRec: StudentService) {}

  ngOnInit() {
    this.students = this.studentRec.getStudent();
  }
}
