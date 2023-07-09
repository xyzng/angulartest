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

  userDetail = [];

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
        user => {
          this.userDetail['firstName'] = user['first_name'];
          this.userDetail['lastName'] = user['last_name'];
          this.userDetail['emailAddress'] = user['email'];
          this.userDetail['phone'] = user['phone'];
        }
      );


    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
