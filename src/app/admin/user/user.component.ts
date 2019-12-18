import { Component, OnInit, ViewChild, SystemJsNgModuleLoader, Output } from '@angular/core';
import { User } from 'src/app/class/user';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClrForm } from '@clr/angular';
import { ClrLoadingState } from '@clr/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  @ViewChild(ClrForm, { static: true }) clrForm;
  public uploadBtn: ClrLoadingState = ClrLoadingState.DEFAULT;
  public submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  public randomBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  public currentPage: number;
  public pagesize: number;
  public userPicture: string;
  public showUser = false;
  public deleteUser = false;
  public user: User;
  public focusUser: User;
  public users: User[];
  public errorForm: boolean;
  public addUserModal: boolean;
  public fileMaxSize: number;
  constructor(private api: ApiService, private generateServie: GeneralService) { }
  public userForm: FormGroup;
  ngOnInit() {
    this.focusUser = {} as User;
    this.user = {} as User;
    this.fileMaxSize = 0;
    this.users = new Array<User>(0);
    this.currentPage = 0;
    this.pagesize = 20;
    this.userPicture = '';
    this.userForm = new FormGroup({
      firstname: new FormControl('', Validators.nullValidator),
      lastname: new FormControl('', Validators.nullValidator),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.nullValidator)
    });
    this.getAllUsers();
  }

  showDeleteUser(user: User) {
    this.deleteUser = true;
    this.focusUser = user;
  }
  deleteUserFromDatabase() {
    const user = this.focusUser;
    this.api.delete(this.api.baseURL + 'user/' + user._id).then(
      success => {
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
  appendUser(userID: string) {
    this.api.get(this.api.baseURL + 'user/' + userID, null).then(
      (user: User) => {
        this.users.push(user);
      },
      error => {
        console.error(error);
      }
    );
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

  showCard(user: User) {
    this.focusUser = user;
    this.showUser = true;
  }
  getTopicUrlById(topicId: string) {
    return 'images/topics/full/' + topicId + '.jpg';
  }
  public removeTopicFromUser(topicId: string, userId: string) {
    let user: User;
    user = this.getUserById(userId);
    user.topics.splice(user.topics.indexOf(topicId), 1);
  }
  public async changesize(size: number) {
    this.pagesize = size;
    this.users = await this.getAllUsers();
  }

  async submit() {
    this.submitBtnState = ClrLoadingState.LOADING;
    if (this.userForm.invalid) {
      this.submitBtnState = ClrLoadingState.ERROR;
      this.clrForm.markAsTouched();
    } else {
      const hash = this.generateServie.encrypt(this.userForm.value.username + ':' + this.userForm.value.password);
      const user = new User(this.userForm.value.firstname, this.userForm.value.lastname,
        null,
        '',
        this.userForm.value.email,
        [],
        this.userForm.value.username,
        hash,
        {
          thumbnail: this.userPicture,
          medium: this.userPicture,
          large: this.userPicture
        },
      );
      delete user._id;
      this.api.post(this.api.baseURL + 'user', [user]).then(
        success => {
          this.appendUser(success[0]);
        }
      );
      this.addUserModal = false;
      this.userPicture = '';
      this.userForm.reset();
      await new GeneralService()._delay(500);
      this.submitBtnState = ClrLoadingState.SUCCESS;
    }
  }
  addRandomUser() {
    this.randomBtnState = ClrLoadingState.LOADING;
    this.api.get('https://randomuser.me/api/?inc=login,name,email,picture', null).then(
      async success => {
        const tmp = success.results[0];
        const generatedUser = new User(
          tmp.name.first,
          tmp.name.last,
          null,
          '',
          tmp.email,
          [],
          tmp.login.username,
          '',
          tmp.picture
        );
        delete generatedUser._id;
        this.api.post(this.api.baseURL + 'user', [generatedUser]).then(
          successresponse => {
            this.appendUser(successresponse[0]);
          }
        );
        this.randomBtnState = ClrLoadingState.SUCCESS;
      }, error => {
        console.error(error);
        this.randomBtnState = ClrLoadingState.ERROR;
      }
    );
  }

  updateImage(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onprogress = e => {
      this.uploadBtn = ClrLoadingState.LOADING;
    };
    reader.onloadend = e => {
      this.uploadBtn = ClrLoadingState.SUCCESS;
      this.userPicture = reader.result.toString();

    };
    reader.onerror = error => {
      this.uploadBtn = ClrLoadingState.ERROR;
      console.error(error);
    };
  }

}
