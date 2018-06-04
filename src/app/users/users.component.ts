import {Component, Injectable, OnInit} from '@angular/core';
import {User} from "../class/user";
import {ApiService} from "../services/api.service";
import {HttpClient} from "@angular/common/http";
import { AppComponent } from '..';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

@Injectable()
export class UsersComponent implements OnInit {
    public addUser: boolean = false;
    public user: User;
    public users: User[];
    public errorForm: boolean;
    public userForm: any;
    private submitted: boolean;
    public loading: boolean;
    constructor(private http: HttpClient, private api: ApiService) {};

    ngOnInit() {
        this.loading = false;
        this.user = new User(null, null, null, null, null , null , null);
        this.users = new Array<User>(0);
        this.getAllUsers();
    }

    public sendUser(user: User): boolean {
        user.topics = [];
        user.departure = null;
        let response: User;
        try {
            response = this.api.post("user", user);
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
        let response = this.api.delete('user/' + user.id);
        console.log(response);
        this.users.splice(this.users.indexOf(user), 1);
    }
    getAllUsers(): User[] {
        let users: User[];
        this.api.get("user", null).then((success: User[]) => {
            users = success;
            if (users.length == null) {
                users = [];
            } else {
                for (let user of users) {
                    this.users.push(user);
                }
            }
        }, (fail: User[]) => {
            users = null;
        });
        return users;
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
}
