import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  // Create user
  createUser(firstName: string,
                     lastName: string,
                     email: string,
                     phone: string) {
    
    const userData: User = { first_name: firstName, 
                             last_name: lastName,
                             email: email,
                             phone: phone 
                           };

    return this.http
      .post<{ name: string }>(
        'https://dev-test-b52d0-default-rtdb.asia-southeast1.firebasedatabase.app/users.json',
        userData
      ).pipe(
        map(responseData => {
          return responseData;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  // Edit user
  editUser(firstName: string,
                     lastName: string,
                     email: string,
                     phone: string,
                     id: string
                     ) {
    
    const userData: User = { first_name: firstName, 
                             last_name: lastName,
                             email: email,
                             phone: phone,
                             id: id
                           };

    const userId = userData.id;

    return this.http
      .put<{ name: string }>(
        'https://dev-test-b52d0-default-rtdb.asia-southeast1.firebasedatabase.app/users/'+userId+'.json',
        userData
      ).pipe(
        map(responseData => {
          return responseData;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  // Get users from endpoint
  fetchUsers() {
    return this.http
      .get<{ [key: string]: User }>('https://dev-test-b52d0-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
      .pipe(
        map(responseData => {
          const users: User[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              users.push({ ...responseData[key], id: key });
            }
          }
          return users;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  // Get users from endpoint
  fetchSingleUser(id: string) {

    const userId = id;
    return this.http
      .get('https://dev-test-b52d0-default-rtdb.asia-southeast1.firebasedatabase.app/users/'+userId+'.json')
      .pipe(
        map(responseData => {
          return responseData;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

   // Delete single users
  deleteUser(id: string) {

    const userId = id;

    return this.http.delete(
      'https://dev-test-b52d0-default-rtdb.asia-southeast1.firebasedatabase.app/users/'+userId+'.json'
    );
  }

  // Delete users
  deleteUsers() {
    return this.http.delete(
      'https://dev-test-b52d0-default-rtdb.asia-southeast1.firebasedatabase.app/users.json'
    );
  }


}
