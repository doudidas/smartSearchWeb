import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/class/user';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrForm } from '@clr/angular';
import { ClrLoadingState } from '@clr/angular';
import { GeneralService } from 'src/app/services/general.service';
import { Md5 } from 'ts-md5';
import { addTextIcon, airplaneIcon, ClarityIcons, cogIcon, viewCardsIcon, viewListIcon } from '@cds/core/icon';

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
  public pagesize: number | string;
  public userPicture: string;
  public showUser = false;
  public deleteUser = false;
  public user: User;
  public focusUser: User;
  public users: User[];
  public errorForm: boolean;
  public addUserModal: boolean;
  public fileMaxSize: number;
  constructor(private api: ApiService) { }
  public userForm: FormGroup;
  public showAs: string;

  ngOnInit() {
    ClarityIcons.addIcons(viewCardsIcon, viewListIcon, addTextIcon, airplaneIcon, cogIcon);
    this.showAs = "list"
    this.focusUser = {} as User;
    this.user = {} as User;
    this.fileMaxSize = 0;
    this.users = new Array<User>(0);
    this.currentPage = 0;
    this.userPicture = '';
    this.userForm = new FormGroup({
      firstname: new FormControl('', Validators.nullValidator),
      lastname: new FormControl('', Validators.nullValidator),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.nullValidator)
    });
    // this.initFakeUsers();

    this.getAllUsers();
  }

  initFakeUsers() {
    let tmpUser = new User("---", "---", "", "", "---", [], "---", null, null);
    tmpUser.topics = [];
    this.users = Array(10).fill(tmpUser)
  }

  showDeleteUser(user: User) {
    this.deleteUser = true;
    this.focusUser = user;
  }
  deleteUserFromDatabase() {
    const user = this.focusUser;
    this.api.delete(this.api.baseURL + 'user/' + user._id).then(
      () => this.users.splice(this.users.indexOf(user), 1),
      fail => console.error(fail)
    );
    this.deleteUser = false;
  }

  async getAllUsers() {
    const pageSize = 20;
    this.api.get(this.api.baseURL + 'countUser', null).then(
      number => {
        this.users = []
        for (let page = 0; page < Math.ceil(number / pageSize); page++) {
          this.api.get(this.api.baseURL + 'user?size=' + pageSize + '&page=' + page, null).then(
            (users: User[]) => this.users = this.users.concat(users)
          )
        }
      },
      error => console.error(error)
    )

  }

  appendUser(userID: string) {
    this.api.get(this.api.baseURL + 'user/' + userID, null).then(
      (user: User) => this.users.unshift(user),
      error => console.error(error)
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

  public async changesize(size: number | string) {
    this.pagesize = size;
    this.getAllUsers();
  }

  async submit() {
    this.submitBtnState = ClrLoadingState.LOADING;
    if (this.userForm.invalid) {
      this.submitBtnState = ClrLoadingState.ERROR;
      this.clrForm.markAsTouched();
    } else {
      const hash = Md5.hashStr(this.userForm.value.username + ':' + this.userForm.value.password).toString()
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
      success => {
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
    reader.onprogress = () => {
      this.uploadBtn = ClrLoadingState.LOADING;
    };
    reader.onloadend = () => {
      this.uploadBtn = ClrLoadingState.SUCCESS;
      this.userPicture = reader.result.toString();
    };
    reader.onerror = error => {
      this.uploadBtn = ClrLoadingState.ERROR;
      console.error(error);
    };
  }
}
