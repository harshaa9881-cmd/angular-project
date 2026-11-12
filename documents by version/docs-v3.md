# Commit 2 – Student Service and Interface

In this commit, we will move the student data and student-related operations into a Student Service.

The purpose is to avoid keeping the same student data separately in the Registration and Student List components.

We will have exactly two service functions:

1. `addStudent()` – adds a student to the student array.
2. `getStudent()` – returns the student array.

We will also declare the `StudentRec` interface inside the service file itself. No separate interface file or folder is needed.

## 1. Create the Student Service

Run this command from your Angular project folder:

```
ng generate service service/student
```

This creates:

`src/app/service/student.ts`

If Angular generates a file named `student.ts` inside the `service` folder, use that file.

## 2. `service/student.ts`

Replace its content with:

```

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

```

### Understand the service

Interface:

```
export interface StudentRec {
  id: number;
  name: string;
  age: number;
  department: string;
  email: string;
}
```

The interface defines the structure of one student record. Whenever we create a student, it should follow this structure.

Array:

```
students: StudentRec[] = [];
```

Stores multiple student records.

Function 1:

```
addStudent(student: StudentRec) {
  this.students.push(student);
}
```

Receives one student and adds it to the array.

Function 2:

```
getStudent(): StudentRec[] {
  return this.students;
}
```

Returns all student records.

`providedIn: 'root'` makes the service available throughout the application using Angular dependency injection.

## 3. Update `component/student/student.ts`

Now the Student component will use the service instead of directly storing the student array.

Replace the existing code:

```

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

```

### Understand the changes

1\. Import the service and interface

```
import { StudentService, StudentRec } from '../../service/student';
```

- `StudentService` provides the student functions.
- `StudentRec` provides the student datatype.

2\. Constructor – Dependency Injection

```
constructor(
  private studentRec: StudentService,
  private router: Router
) {}
```

Angular provides the `StudentService` object and the `Router` object to this component.

3\. Use the interface as a datatype

```
const student: StudentRec = {
  id: Date.now(),
  name: this.studentName,
  age: this.studentAge,
  department: this.department,
  email: this.email
};
```

The `student` variable must follow the structure defined by `StudentRec`.

4\. Store using the service

```
this.studentRec.addStudent(student);
```

Instead of directly pushing into an array in the component, we call the service function.

5\. Navigate to the Student List

```
this.router.navigate(['/student-list']);
```

After registration, Angular opens the Student List route.

## 4. `component/student/student.html`

Keep the registration form and its fields. Use this HTML:

```

<div class="student-card">

  <h2>Student Registration</h2>

  <form (ngSubmit)="registerStudent()">

    <label>Student Name</label>
    <input
      type="text"
      name="studentName"
      [(ngModel)]="studentName"
      required
    >

    <label>Age</label>
    <input
      type="number"
      name="studentAge"
      [(ngModel)]="studentAge"
      required
    >

    <label>Department</label>
    <input
      type="text"
      name="department"
      [(ngModel)]="department"
      required
    >

    <label>Email</label>
    <input
      type="email"
      name="email"
      [(ngModel)]="email"
      required
    >

    <button type="submit">Register Student</button>

  </form>

</div>

```

No change is required to your existing `student.css` if you are keeping the styling from the previous commit.

## 5. Update `component/student-list/student-list.ts`

Now the Student List component also uses the same service to get the student records.

```

import { Component, OnInit } from '@angular/core';
import { StudentService, StudentRec } from '../../service/student';

@Component({
  imports: [],
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

```

### Understand the changes

Import:

```
import { StudentService, StudentRec } from '../../service/student';
```

Declare the array using the interface:

```
students: StudentRec[] = [];
```

This array can hold multiple student records.

Constructor:

```
constructor(private studentRec: StudentService) {}
```

Injects the same StudentService into this component.

Get the student records:

```
ngOnInit() {
  this.students = this.studentRec.getStudent();
}
```

When the Student List component loads, `ngOnInit()` calls the service and gets all registered students.

## 6. Update `component/student-list/student-list.html`

Use Angular's `@if`, `@else`, and `@for` to display multiple students.

```

<h2>Registered Students</h2>

@if (students.length > 0) {

  <table>
    <thead>
      <tr>
        <th>S.No</th>
        <th>Name</th>
        <th>Age</th>
        <th>Department</th>
        <th>Email</th>
      </tr>
    </thead>

    <tbody>
      @for (student of students; track $index) {
        <tr>
          <td>{{ $index + 1 }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>{{ student.department }}</td>
          <td>{{ student.email }}</td>
        </tr>
      }
    </tbody>
  </table>

}
@else {
  <p>No students registered yet.</p>
}

```

### Understand `@if` and `@else`

```
@if (students.length > 0) {
  <!-- Display student table -->
}
@else {
  <p>No students registered yet.</p>
}
```

- If at least one student exists, display the table.
- Otherwise, display the message.

### Understand `@for`

```
@for (student of students; track $index) {
  <td>{{ student.name }}</td>
}
```

- `student` represents the current student record.
- `students` is the array.
- `track $index` tracks each displayed item by its index.
- `$index + 1` displays serial numbers starting from 1.

No change is required to `student-list.css` for the functionality.

## 7. Keep the two routes connected

One important note after checking your uploaded ZIP: its `app.routes.ts` is still empty, `app.html` still contains `<app-student>`, and `app.ts` directly imports Student. If those files have not already been updated in your actual project, use the following versions so the two routes work.

`app.routes.ts`

```
import { Routes } from '@angular/router';
import { Student } from './component/student/student';
import { StudentList } from './component/student-list/student-list';

export const routes: Routes = [
  { path: 'register', component: Student },
  { path: 'student-list', component: StudentList },
  { path: '', redirectTo: 'register', pathMatch: 'full' }
];
```

`app.ts`

```
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
}
```

`app.html`

```
<header>
  <h2>Student Management System</h2>

  <nav>
    <a routerLink="/register" routerLinkActive="active">
      Register Student
    </a>

    <a routerLink="/student-list" routerLinkActive="active">
      Student List
    </a>
  </nav>
</header>

<main>
  <router-outlet></router-outlet>
</main>
```

Your `app.config.ts` already registers `provideRouter(routes)`, so no change is needed there.

## 8. Complete execution flow

Student Registration Component

User enters student details

StudentService.addStudent(student)

Adds the record to the shared students array

router.navigate(['/student-list'])

Navigates to the Student List route

StudentList.ngOnInit()

Calls StudentService.getStudent()

Student List HTML

Uses @if and @for to display records

### How the service shares data

Student Component

Calls addStudent()

StudentService

students: StudentRec[]

Shared student data

addStudent() · getStudent()

StudentList Component

Calls getStudent()

Because `providedIn: 'root'` creates an application-wide service instance, both components use the same student array.

Important: This service stores data in memory only. Registered students remain available while the application is running, but refreshing the browser clears the array. We can add persistent storage in a later step if required.

## 9. Test the application

Run:

```
ng serve
```

Test in this order:

1. Open `/register`.
2. Register student John.
3. Register student Priya.
4. The application navigates to `/student-list`.
5. Both students should appear in the table.
6. Open `/register` again and register another student.
7. Return to Student List and check all three records.

## 10. Commit this work

Suggested commit message:

```
git add .
git commit -m "Add Student Service and interface for shared student data"
git push
```

Commit 2 completed: Student Service, `StudentRec` interface, dependency injection, `addStudent()`, `getStudent()`, and multiple student display using `@if`, `@else`, and `@for`.