import {Injectable, OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {User} from "../class/user";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

@Injectable()
export class UsersComponent implements OnInit{
    public addUser: boolean = false;
    public users: User[];
    public form_firstName: string;
    public form_lastName: string;
    public form_gender: string;
    public form_email: string;
    private errorForm: boolean;
    constructor(private http: HttpClient) {
    };
    ngOnInit() {
        this.getAllUsers();
    }
    sendUser(): boolean {
        console.log("Sending users…");
        this.http.post("http://spacelama-api:9000/api/user", {
            firstName: this.form_firstName,
            gender: this.form_gender,
            lastName: this.form_lastName,
            email: this.form_email,
            departure: null,
            topics: []
        }).subscribe(
            res => {
                this.users.push(new User(this.form_firstName, this.form_lastName, this.form_gender,  null,
                    '', this.form_email, []));
                this.form_firstName = "";
                this.form_gender = "";
                this.form_lastName = "";
                this.form_email = "";
                this.errorForm = false;
                console.log("Done ! " + res);
                this.addUser = false;
            },
            error => {
                console.log(error)
                this.errorForm = true;
                this.addUser = true;
            });
        return this.addUser;
    }

    deleteUser(user: User) {
        console.log("Deleting user :" + user.id);
        this.http.delete("http://spacelama-api:9000/api/user/" + user.id).toPromise().then(response => {
            console.log(response);
            this.users.splice(this.users.indexOf(user), 1);
        });
    }
    getAllUsers() {
        this.http.get('http://spacelama-api:9000/api/user').toPromise().then(users => {
            console.log(users);
            let i;
            this.users = [];
            for (i in users) {
                let user: User;
                user = users[i];
                this.users.push(user);
            }
        }, error => {
            console.log(error)
        });
    }

};
