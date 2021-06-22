import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from '../../models/student';
import { StudentsApiService } from '../../services/students-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.css']
})
export class LetraComponent implements OnInit {
  @ViewChild('studentForm', { static: false })
  studentForm!: NgForm;
  isEditMode = false;
  studentId!: number;
  studentData: Student = {} as Student;
  defaultStudent: Student = { id: 0, name: '', age: 0, address: ''};
  constructor(private studentsApi: StudentsApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.studentId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveStudent(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetStudent();
        this.isEditMode = false;
        return 0;
      }
    }));
  }
  navigateToStudents(): void {
    this.router.navigate(['/students'])
      .then(() => console.log(this.route.url) );
  }
  resetStudent(): void {
    this.studentData = this.defaultStudent;
  }
  retrieveStudent(id: number): void {
    this.studentsApi.getStudentById(id)
      .subscribe((response: Student) => {
        this.studentData = {} as Student;
        this.studentData = _.cloneDeep(response);
        console.log(response);
        console.log(this.studentData);
      });
  }
  addStudent(): void {
    const newStudent = {name: this.studentData.name, age: this.studentData.age, address: this.studentData.address};
    this.studentsApi.addStudent(newStudent)
      .subscribe(() => {
        this.navigateToStudents();
      });
  }
  cancelEdit(): void {
    this.navigateToStudents();
  }

  updateStudent(): void {
    this.studentsApi.updateStudent(this.studentData.id, this.studentData as Student)
      .subscribe(response => {
        console.log(response);
      });
    this.navigateToStudents();
  }
  onSubmit(): void {
    if (this.studentForm.form.valid) {
      console.log(this.studentData);
      if (this.isEditMode) {
        this.updateStudent();
      } else {
        this.addStudent();
      }
    } else {
      console.log('Invalid Data');
    }
  }
}
