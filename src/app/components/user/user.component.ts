import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  usersSearching: boolean;
  userBySid: User;
  userBySidSearching: boolean;
  userByRef: User;
  userByRefSearching: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    this.getUsersBySid('S1287A');
    this.getUserByRef('Cgil4sRIOrzxm7KDYlmb');
  }

  getUsers() {
    this.usersSearching = true;
    this.userService.getUsers().subscribe(users => {
      console.log(users);
      this.users = users;
      this.usersSearching = false;
    });
  }

  getUsersBySid(sid: string) {
    this.userBySidSearching = true;
    this.userService.getUsersBySID(sid).subscribe(users => {
      console.log(users);
      this.userBySid = users[0];
      this.userBySidSearching = false;
    });
  }

  getUserByRef(ref: string) {
    this.userByRefSearching = true;
    this.userService.getUserById(ref).subscribe(user => {
      this.userByRef = user;
      this.userByRefSearching = false;
    });
  }

}
