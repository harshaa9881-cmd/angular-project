
import { Injectable } from '@angular/core';

export interface StudentRec {
  id: number;
  name: string;
  age: number;
  department: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: StudentRec[] = [];

  addStudent(student: StudentRec) {
    this.students.push(student);
  }

  getStudent(): StudentRec[] {
    return this.students;
  }
}
