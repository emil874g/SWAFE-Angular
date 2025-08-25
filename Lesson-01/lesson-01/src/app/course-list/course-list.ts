import { Component, input } from '@angular/core';
import { CourseListItem } from "../course-list-item/course-list-item";
import { Course } from '../course';

@Component({
  selector: 'app-course-list',
  imports: [ CourseListItem ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss'
})
export class CourseList {
  courses = input<Course[]>([]);
}

