import {Injectable, OnInit} from '@angular/core';
import {Component} from '@angular/core';
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
    public users: User[];
    public form_firstName: string;
    public form_lastName: string;
    public form_gender: string;
    public form_email: string;
    private errorForm: boolean;

    constructor(private http: HttpClient, private api: ApiService) {};

    ngOnInit() {
        this.users = this.getAllUsers();
    }
    sendUser(): boolean {

        let body = {
            firstName: this.form_firstName,
            gender: this.form_gender,
            lastName: this.form_lastName,
            email: this.form_email,
            departure: null,
            topics: []
        };
        try {
            let response = this.api.post("user", body);
            this.users.push(new User(this.form_firstName, this.form_lastName, this.form_gender,  null,
                '', this.form_email, []));
            this.resetFormValues();
            this.errorForm = false;
            console.log("Done ! " + response);
            this.addUser = false;
        } catch (e) {
            console.log(e);
            this.errorForm = true;
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
        for (let user of users) {
            this.users.push(user);
        }
        return users;
    }
    resetFormValues(): void {
        this.form_firstName = "";
        this.form_gender = "";
        this.form_lastName = "";
        this.form_email = "";
    }
}
