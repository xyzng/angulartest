import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() userDetail: User;

  @Output() deleteUser = new EventEmitter<any>();
  @Output() editUser =  new EventEmitter<any>();

  ngOnInit() {}
  
  onEditUser() {
    this.editUser.emit(this.userDetail);
  }

  onDeleteUser() {
    this.deleteUser.emit(this.userDetail);
  }

}
