import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { NgForm } from '@angular/forms';

import { User } from './user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  loadedUsers: User[] = [];
  isFetching = false;
  error = null;

  private errorSub: Subscription;
  
  @ViewChild('userForm') userForm: NgForm;

  submitMode = 'add';
  firstName = '';
  lastName = '';
  emailAddress = '';
  phone = '';
  userId = null;

  constructor(private http: HttpClient, private usersService: UsersService) {}

  ngOnInit() {
    this.errorSub = this.usersService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    // get the users on component init
    this.onFetchUsers();
  }

  onCreateUpdateUser(userData: User) {
    
    // Debug form
    console.log(this.userForm);

    if(this.submitMode == 'add') {
      console.log('add user');
      // send user data to endpoint
      this.usersService.createUser(userData.first_name, 
                                           userData.last_name,
                                           userData.email,
                                           userData.phone,
                                           ).subscribe(() => {
                                              this.onFetchUsers();

                                              // clear and switch back the submit mode to `add`
                                              this.userForm.reset();
                                              this.submitMode = 'add';
                                          }
                                        );
    }

    if(this.submitMode == 'edit') {
      console.log('edit user ');
      // send user data to endpoint
      this.usersService.editUser(userData.first_name, 
                                           userData.last_name,
                                           userData.email,
                                           userData.phone,
                                           this.userId
                                           ).subscribe(() => {
                                              this.onFetchUsers();

                                              // clear and switch back the submit mode to `add`
                                              this.userForm.reset();
                                              this.submitMode = 'add';
                                          }
                                        );
      
    }

    
  }

  onFetchUsers() {
    // Send http request to endpoint and fetch users
    this.isFetching = true;
    this.usersService.fetchUsers().subscribe(
      users => {
        this.isFetching = false;
        this.loadedUsers = users;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );

  }

  onEdit(userData: User) {
    this.firstName = userData.first_name;
    this.lastName = userData.last_name;
    this.emailAddress = userData.email;
    this.phone = userData.phone;
    this.userId = userData.id;

    this.submitMode = 'edit';

    console.log(userData);
  }

  onDeleteUser(userData: User) {
    if(confirm("Delete User? ")) {
      
      console.log(userData.id);
      // Send http request to endpoitn and delete a single user
      this.usersService.deleteUser(userData.id).subscribe(() => {        
        this.onFetchUsers();
      });

    }
    
  }

  onDeleteUsers() {
    // Send Http request to endpoint and drop users data
    this.usersService.deleteUsers().subscribe(() => {
      this.loadedUsers = [];
      this.userForm.reset();
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
