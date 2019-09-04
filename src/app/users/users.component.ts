import { Component, Injectable, OnInit } from '@angular/core';
import { User } from '../class/user';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

@Injectable()
export class UsersComponent implements OnInit {
    public addUser = false;
    public showUser = false;
    public user: User;
    public focusUser: User;
    public users: User[];
    public errorForm: boolean;
    public userForm: any;
    private submitted: boolean;
    public loading: boolean;
    constructor(private http: HttpClient, private api: ApiService) {}

    ngOnInit() {
        this.focusUser = new User(null, null, null, null, null, null, null, null);
        this.loading = false;
        this.user = new User(null, null, null, null, null, null, null, null);
        this.users = new Array<User>(0);
        this.getAllUsers();
    }

    public sendUser(user: User): boolean {
        user.topics = [];
        user.departure = null;
        let response: User;
        response = this.api.post('api/user', user).then(
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

    deleteUser(user: User) {
        console.log('Deleting user :' + user._id);
        const response = this.api.delete('api/user/' + user._id).then(success => {
            console.log(success.toString);
            this.users.splice(this.users.indexOf(user), 1);
        }, fail => {
            console.error(fail.toString);
        }
        );
    }

    async getAllUsers(): Promise<User[]> {
        let users: User[];
        await this.api.get('api/user', null).then((success: User[]) => {
            users = success;
            if (users.length == null) {
                users = [];
            } else {
                for (const user of users) {
                    console.log(user);
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
        }, (fail: User[]) => {
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
        this.submitted = false;
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
    private updateUser(user: User) {
        this.api.put('api/user', user);
    }
}
