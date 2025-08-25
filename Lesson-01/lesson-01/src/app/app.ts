import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBar } from './navigation-bar/navigation-bar';
import { CourseList } from './course-list/course-list';
import { Course } from './course';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar, CourseList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lesson-01');

courses: Course [] = [
  { name: 'Angular Basics', code: 'ANG101', ects: 5 },
  { name: 'Advanced Angular', code: 'ANG102', ects: 5 },
  { name: 'Angular Testing', code: 'ANG103', ects: 5 }
]
}
