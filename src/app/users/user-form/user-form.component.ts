import { Component, Output, Input, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {

  userForm: FormGroup;

  @Output() addUser = new EventEmitter<any>();
  @Output() editUser = new EventEmitter<any>();
  @Input() userDetail: User;
  @Input() resetForm: boolean;

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges() {
    console.log('user-form Onchanges');

    if(this.userDetail.id) {
      this.userForm.patchValue(this.userDetail);
    }

    if(this.resetForm) {
      console.log('reset form here');
      this.userDetail.id = null;
      this.createForm();
      
    }

  }

  onUserFormSubmit() {
    console.log(this.userForm);
    console.log('onUserFormSubmit userId: ' + this.userDetail.id);
  
    if(this.userDetail.id) {
      // Edit
      console.log('user-form: edit user');
      this.editUser.emit(this.userForm);
    } 

    if(!this.userDetail.id) {
      // Add
      console.log('user-form: add user');
      this.addUser.emit(this.userForm);
    }

  }

  createForm() {

    this.userForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5)])
    });

  }


}
