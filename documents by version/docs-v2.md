Yes. We can build a simple Student Registration and Student List application using only the folders and files already present in your uploaded project.

We will keep your existing structure and use exactly two routes:

1. `/register` – displays the student registration form.
2. `/student-list` – displays the registered students.

The application will have two navigation tabs in the header:

- Register Student
- Student List

When you submit the registration form, the student details will be saved in the browser's `localStorage`, and Angular will navigate to the Student List page.

## 1. How the existing files will work

We will not create any additional files or folders.

| Existing file       | Responsibility                                     |
| ------------------- | -------------------------------------------------- |
| `app.routes.ts`     | Defines the two paths and their components         |
| `app.config.ts`     | Registers the routes                               |
| `app.ts`            | Imports RouterOutlet, RouterLink, RouterLinkActive |
| `app.html`          | Header, two navigation links and RouterOutlet      |
| `app.css`           | Header and navigation styling                      |
| `student.ts`        | Registration form logic and navigation             |
| `student.html`      | Registration form UI                               |
| `student.css`       | Registration form styling                          |
| `student-list.ts`   | Retrieves registered students                      |
| `student-list.html` | Displays student list                              |
| `student-list.css`  | Student list styling                               |

## 2. `app.routes.ts` – Define the two routes

This file decides which component should open for which URL.

Replace the existing content:

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

Understanding the routes:

| URL                           | Component             |
| ----------------------------- | --------------------- |
| `localhost:4200/register`     | Student               |
| `localhost:4200/student-list` | StudentList           |
| `localhost:4200/`             | Redirects to register |

Important: The route mapping is defined in `app.routes.ts`, not in `app.html`.

## 3. `app.config.ts` – Register the routes

Your existing file is already correct. Keep it as it is.

```
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
```

`provideRouter(routes)` tells Angular to use the routes defined in `app.routes.ts`.

## 4. `app.ts` – Import the three router features

Replace your existing `app.ts`:

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

### What are these three imports?

| Import             | Work                                              |
| ------------------ | ------------------------------------------------- |
| `RouterLink`       | Navigates to another route when clicked           |
| `RouterLinkActive` | Applies a CSS class to the active navigation link |
| `RouterOutlet`     | Displays the component matching the current route |

## 5. `app.html` – Header, navigation and main section

This is where we create the two tabs.

Replace your existing `app.html`:

```

<header>
  <h2>Student Management System</h2>

  <nav>
    <a routerLink="/register"
       routerLinkActive="active">
       Register Student
    </a>

    <a routerLink="/student-list"
       routerLinkActive="active">
       Student List
    </a>
  </nav>
</header>

<main>
  <router-outlet></router-outlet>
</main>

```

### Understand what happens here

First anchor:

```
<a routerLink="/register" routerLinkActive="active">
  Register Student
</a>
```

- `routerLink="/register"` navigates to the register path.
- Angular checks `app.routes.ts`.
- It finds `Student` as the matching component.
- `router-outlet` displays the Student component.
- `routerLinkActive="active"` applies the `active` CSS class to this anchor.

Second anchor:

```
<a routerLink="/student-list" routerLinkActive="active">
  Student List
</a>
```

- Navigates to `/student-list`.
- Angular finds `StudentList` in `app.routes.ts`.
- `router-outlet` displays StudentList.
- The active CSS class is applied to the second anchor.

### 6. `app.css` – Header and navigation styling

```

header {
    background-color: #222;
    color: white;
    padding: 20px;
}

nav {
    display: flex;
    gap: 20px;
    margin-top: 15px;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
}

nav a.active {
    background-color: #007bff;
    color: white;
}

main {
    padding: 20px;
}

```

## 7. Student registration component

We will use your existing `student` component for registration.

### `student.ts`

Replace the existing code:

```

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

```

### `student.html`

Replace the existing HTML:

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

### `student.css`

```

.student-card {
    max-width: 450px;
    margin: 30px auto;
    padding: 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

h2 {
    text-align: center;
}

label {
    display: block;
    margin-top: 15px;
}

input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    box-sizing: border-box;
}

button {
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

```

Why `FormsModule`?

We use `[(ngModel)]` to connect the HTML input fields with the properties in `student.ts`.

For example:

```
<input name="studentName" [(ngModel)]="studentName">
```

When the user types a name, the `studentName` property is automatically updated.

## 8. Student List component

This component reads the student information saved during registration.

### `student-list.ts`

```

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

```

### `student-list.html`

```

<h2>Registered Students</h2>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
      <th>Department</th>
      <th>Email</th>
    </tr>
  </thead>

  <tbody>
    @for (student of students; track student.id) {
      <tr>
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.age }}</td>
        <td>{{ student.department }}</td>
        <td>{{ student.email }}</td>
      </tr>
    }
  </tbody>
</table>

@if (students.length === 0) {
  <p>No students registered yet.</p>
}

```

### `student-list.css`

```

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ccc;
    padding: 12px;
    text-align: left;
}

th {
    background-color: #222;
    color: white;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

```

## 9. Important: `student.ts` – What is `Router.navigate()`?

You asked whether `student.ts` should contain `route.navigate()`.

Yes! We use:

```
constructor(private router: Router) {}
```

This imports the Angular Router service into the Student component.

After successful registration:

```
this.router.navigate(['/student-list']);
```

This performs programmatic navigation.

It means:

1. User fills the registration form.
2. User clicks Register Student.
3. `registerStudent()` executes.
4. Student details are saved in `localStorage`.
5. `router.navigate()` changes the URL to `/student-list`.
6. Angular displays the StudentList component inside `router-outlet`.

There are two ways to navigate:

| Navigation          | Where used | Purpose                                                  |
| ------------------- | ---------- | -------------------------------------------------------- |
| `routerLink`        | HTML       | Navigation when the user clicks a link                   |
| `router.navigate()` | TypeScript | Navigation through code, such as after submitting a form |

## 10. Complete execution workflow

main.ts

Bootstraps App with appConfig

app.config.ts

Registers provideRouter(routes)

app.routes.ts

Maps URL paths to components

app.html

HEADER

Register Student | Student List

routerLink + routerLinkActive

MAIN – router-outlet

Displays the matching component

/register

Student component

Registration form

/student-list

StudentList component

Student table

### What exactly gets replaced?

This is the most important concept.

Your `app.html` has:

```
<header>
  <!-- Navigation links -->
</header>

<main>
  <router-outlet></router-outlet>
</main>
```

When you click Register Student:

- Header remains.
- Main displays the Student component.

When you click Student List:

- Header remains.
- Main displays the StudentList component instead.

The `router-outlet` is the placeholder where Angular displays the matching routed component. It does not replace the entire `app.html`.

### Difference between the three router features

| Feature            | Actual work                                      |
| ------------------ | ------------------------------------------------ |
| `RouterLink`       | Changes the route when clicked                   |
| `RouterLinkActive` | Adds the `active` CSS class to the matching link |
| `RouterOutlet`     | Displays the component for the current route     |

## 11. Test your application

Run:

```
ng serve
```

Expected navigation

Register Student

/register

Enter name, age, department and email, then submit.

Student List

/student-list

View the registered student details in a table.

Note: This beginner version uses browser `localStorage`, so the data stays in that browser. It is not stored in a database.

One final point: `RouterLinkActive` only highlights the active navigation link; it does not perform navigation itself. `RouterLink` performs navigation, and `RouterOutlet` displays the selected component.