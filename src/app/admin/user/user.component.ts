import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  public currentPage: number;
  public pagesize: number;
  public addUser = false;
  public showUser = false;
  public deleteUser = false;
  public user: User;
  public focusUser: User;
  public users: User[];
  public errorForm: boolean;
  public userForm: FormGroup;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.focusUser = new User(null, null, null, null, null, null, null, null);
    this.user = new User(null, null, null, null, null, null, null, null);
    this.users = new Array<User>(0);
    this.currentPage = 0;
    this.pagesize = 20;
    this.getAllUsers();
  }

  public sendUser(user: User): boolean {
    user.topics = [];
    user.departure = null;
    let response: User;
    response = this.api.post(this.api.baseURL + 'user', user).then(
      () => {
        this.users.push(user);
        this.errorForm = false;
        this.addUser = false;
      }, () => {
        this.addUser = true;
      }
    );
    return this.addUser;
  }
  showDeleteUser(user: User) {
    this.deleteUser = true;
    this.focusUser = user;
  }
  deleteUserFromDatabase() {
    const user = this.focusUser;
    console.log('Deleting user :' + user._id);
    this.api.delete(this.api.baseURL + 'user/' + user._id).then(
      success => {
        console.log(success);
        this.users.splice(this.users.indexOf(user), 1);
      }, fail => {
        console.error(fail);
      }
    );
    this.deleteUser = false;
  }

  async getAllUsers(): Promise<User[]> {
    let users: User[];
    await this.api.get(this.api.baseURL + 'user?size=' + this.pagesize + '&page=' + this.currentPage, null)
      .then((success: User[]) => {
        users = success;
        if (users.length == null) {
          users = [];
        } else {
          for (const user of users) {
            if (user.hasOwnProperty('topics')) {
              for (let i = 0; i < user.topics.length; i++) {
                if (user.topics[i] != null || user.topics[i] !== '0') {
                  user.topics.splice(i, 1);
                }
              }
            } else {
              user.topics = [];
            }
            this.users.push(user);
          }
        }
      }, () => {
        users = null;
      });
    return users;
  }
  getUserById(userId: string) {
    let output: User;
    for (const user of this.users) {
      if (user._id === userId) {
        output = user;
        break;
      }
    }
    return output;
  }
  onSubmit() {
    const successful = this.sendUser(this.user);
    if (successful) {
      this.resetForm();
    }
  }
  resetForm() {
    this.userForm.reset();
  }

  showCard(user: User) {
    this.focusUser = user;
    console.log(this.focusUser);
    this.showUser = true;
  }
  getTopicUrlById(topicId: string) {
    return 'images/topics/full/' + topicId + '.jpg';
  }
  public removeTopicFromUser(topicId: string, userId: string) {
    let user: User;
    user = this.getUserById(userId);
    user.topics.splice(user.topics.indexOf(topicId), 1);
    // this.updateUser(user);
  }
  public async changesize(size: number) {
    this.pagesize = size;
    this.users = await this.getAllUsers();
  }
}
