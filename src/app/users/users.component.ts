import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { User } from './user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  loadedUsers: User[] = [];
  
  isFetching: boolean = false;
  error = null;

  userDetail: any = [];
  userId: string = null;
  resetForm: boolean = false;

  private errorSub: Subscription;
  
  constructor(private usersService: UsersService) {}

  ngOnInit() {

    this.errorSub = this.usersService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    // get the users on component init
    this.onFetchUsers();

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

  onAddUser(formData: any) {

    const user = formData.value;

    this.usersService
        .createUser(user.first_name, 
                    user.last_name,
                    user.email,
                    user.phone,
                   )
        .subscribe(resData => {
                        
            console.log(resData);    

            const key = resData.name;            
            this.loadedUsers.push({ ...user, id: key });

          }
        );


  }

  onEditUser(formData: any) {

    console.log(formData.value);
    
    const user = formData.value;
    //const userId = this.userId;
    const userId = this.userId;
    this.usersService
        .editUser(user.first_name, 
                  user.last_name,
                  user.email,
                  user.phone,
                  userId
                  )
        .subscribe(() => {
            
            this.onFetchUsers();            

        }
      );
  }

  editUser2(userData: User) {
    console.log('bbom'); 
    console.log(userData);
  }

  editUser(userData: User) {
    //console.log(userData);
    this.resetForm = false;
    this.userDetail = userData;
    this.userId = userData.id;
    console.log('user-component: user id = '+this.userId);
    
  }

  resetUserForm() {
    this.resetForm = true;
    this.userId = null;
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
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
