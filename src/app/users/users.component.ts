import { Component, Injectable, OnInit } from '@angular/core';
import { User } from "../class/user";
import { ApiService } from "../services/api.service";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from '..';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

@Injectable()
export class UsersComponent implements OnInit {
    public addUser: boolean = false;
    public showUser: boolean = false;
    public user: User;
    public focusUser: User;
    public users: User[];
    public errorForm: boolean;
    public userForm: any;
    private submitted: boolean;
    public loading: boolean;
    constructor(private http: HttpClient, private api: ApiService) { };

    ngOnInit() {
        this.focusUser = new User(null, null, null, null, null, null, null);
        this.loading = false;
        this.user = new User(null, null, null, null, null, null, null);
        this.users = new Array<User>(0);
        this.getAllUsers();
    }

    public sendUser(user: User): boolean {
        user.topics = [];
        user.departure = null;
        let response: User;
        try {
            response = this.api.post("api/user", user);
            this.users.push(user);
            this.errorForm = false;
            this.addUser = false;
        } catch (e) {
            this.addUser = true;
        }
        return this.addUser;
    }

    deleteUser(user: User) {
        console.log("Deleting user :" + user.id);
        let response = this.api.delete('api/user/' + user.id);
        console.log(response);
        this.users.splice(this.users.indexOf(user), 1);
    }
    async getAllUsers(): Promise<User[]> {
        let users: User[];
        await this.api.get("api/user", null).then((success: User[]) => {
            users = success;
            if (users.length == null) {
                users = [];
            } else {
                for (let user of users) {
                    for (let i = 0; i < user.topics.length; i++) {
                        if (user.topics[i] != null || user.topics[i] !== "0") {
                            user.topics.splice(i, 1);
                        }
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
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].hasOwnProperty('id') && this.users[i].id === userId) {
                output = this.users[i];
                break;
            }
        }
        return output;
    }
    onSubmit() {
        let successful = this.sendUser(this.user);
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
        return "images/topics/full/" + topicId + ".jpg";
    }
    public removeTopicFromUser(topicId, userId) {
        let user: User;
        user = this.getUserById(userId);
        user.topics.splice(user.topics.indexOf(topicId), 1);
        this.updateUser(user);
        this.showCard(user);
    }
    private updateUser(user: User) {
        this.api.put("api/user", user);
    }
}
