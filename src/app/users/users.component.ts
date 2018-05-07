import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {User} from "../class/user";
import {ApiService} from "../services/api.service";

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
    private errorForm: boolean;
    private userForm: any;
    private submitted: boolean;
    constructor(private http: HttpClient, private api: ApiService) {};

    ngOnInit() {
        this.user = new User(null, null, null, null, null , null , null);
        this.users = this.getAllUsers();
    }
    public sendUser(user: User): boolean {
        user.topics = [];
        user.departure = null;
        try {
            let response = this.api.post("user", user);
            this.users.push(user);
            this.errorForm = false;
            console.log("Done ! " + response);
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
        users = this.api.get("user", null);
        if (users.length == null) {
            users = [];
        } else {
            for (let user of users) {
                this.users.push(user);
            }
        }
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
