We’ll update your existing Angular project using Student and StudentList components, configure routing with an empty path, and add navigation using `routerLink` and `routerLinkActive`.

First, the two commands you provided create the components:

```
ng generate component component/student
ng g c component/student-list
```

- `Student` – the component for displaying student details.
- `StudentList` – the component for displaying the student list.

I checked your uploaded `src.zip`. Both components have already been created, and your `app.config.ts` is already configured correctly. You only need to update a few files.

## 1. Update `app.routes.ts`

Add the component imports and define the routes.

```

import { Routes } from '@angular/router';
import { Student } from './component/student/student';
import { StudentList } from './component/student-list/student-list';

export const routes: Routes = [
  { path: '', component: Student },
  { path: 'student-list', component: StudentList }
];

```

Understanding the paths:

| Path             | Component displayed |
| ---------------- | ------------------- |
| `''`             | Student             |
| `'student-list'` | StudentList         |

The empty path means the default page when you open `http://localhost:4200/`.

## 2. Check `app.config.ts`

Your existing file is already correct. No changes are required.

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

What does `provideRouter(routes)` do?

It registers the routes defined in `app.routes.ts` so Angular can navigate between components.

## 3. Update `app.ts`

Remove the `Student` import and add `RouterLink` and `RouterLinkActive`.

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

Understanding the imports:

- `RouterOutlet` – displays the component matching the current route.
- `RouterLink` – allows navigation between routes.
- `RouterLinkActive` – applies a CSS class when a route is active.

## 4. Update `app.html`

Replace your existing `<app-student>` with navigation links.

```

<h1>Student Management</h1>

<nav>
  <a routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
    Student
  </a>

  <a routerLink="/student-list" routerLinkActive="active">
    Student List
  </a>
</nav>

<hr>

<router-outlet></router-outlet>

```

Here:

- `routerLink=""` navigates to the default Student component.
- `routerLink="/student-list"` navigates to StudentList.
- `routerLinkActive="active"` applies the `active` CSS class to the matching link.
- `[routerLinkActiveOptions]="{ exact: true }"` ensures the Student link is active only for the empty path.
- `<router-outlet>` displays the selected component.

## 5. Update `app.css`

Add simple styling for navigation and the active link.

```

nav {
    display: flex;
    gap: 20px;
}

a {
    text-decoration: none;
    color: blue;
}

.active {
    color: red;
    font-weight: bold;
}

```

## 6. Update `student-list.html`

Currently, your file only contains `student-list works!`. Replace it with:

```

<h2>Student List</h2>

<ul>
    <li>John Doe</li>
    <li>David</li>
    <li>Priya</li>
    <li>Rahul</li>
</ul>

```

You can keep your existing `student.ts`, `student.html`, and `student.css` files as they are.

## 7. Understand the complete execution flow

main.ts

Bootstraps the App component with appConfig

app.config.ts

Registers provideRouter(routes)

app.routes.ts

Checks which path matches

app.ts + app.html

RouterLink handles navigation; RouterOutlet displays the component

Empty path

Student

student-list

StudentList

## 8. Run the project

Open the terminal in your Angular project and execute:

```
ng serve
```

Open `http://localhost:4200/`.

Expected result

- Initially, the Student component appears.
- Click Student List to display the StudentList component.
- Click Student to return to the Student component.
- The active navigation link becomes red and bold.

Important concept to remember: `RouterLink` navigates, `RouterLinkActive` highlights the active link, and `RouterOutlet` displays the routed component.