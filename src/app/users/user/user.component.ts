import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Subscription } from 'rxjs';

import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  /*userData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };*/

  userData: any = [];

  private routeSub: Subscription;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params['id']) 

      const userId = params['id'];
      
      // get the users on component init
      this.usersService.fetchSingleUser(userId).subscribe(
        userRes => {          
          this.userData = userRes;
        }
      );


    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
