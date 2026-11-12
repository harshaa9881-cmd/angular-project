
import { Routes } from '@angular/router';
import { Student } from './component/student/student';
import { StudentList } from './component/student-list/student-list';

export const routes: Routes = [
  { path: '', component: Student },
  { path: 'student-list', component: StudentList }
];
