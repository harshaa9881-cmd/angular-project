
import { Component, Input } from '@angular/core';
import { StudentRec } from '../../service/student';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css'
})
export class StudentCard {

  @Input() student!: StudentRec;

}
