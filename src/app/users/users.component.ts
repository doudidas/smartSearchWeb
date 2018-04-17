import {Injectable} from '@angular/core';
import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {User} from "../user";
import {by} from "protractor";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

@Injectable()
export class UsersComponent {
    public addUser: Boolean = false;
    public users: User[];
    public form_firstName: string;
    public form_lastName: string;
    public form_gender: string;
    public form_email: string;

    constructor(private http: HttpClient) {
        http.get('http://0.0.0.0:9000/api/user').subscribe(users => {
            console.log(users);
            let i;
            this.users = [];
            for (i in users) {
                let tempUser = users[i];
                let user: User;
                user = new User(tempUser.firstName, tempUser.lastName, tempUser.gender,
                    tempUser.id, tempUser.departure, tempUser.email, tempUser.topics);
                this.users.push(user);
            }
        }, error => {
            console.log(error)
        });
    };

    sendUser(): void {
        console.log("Sending users…");
        this.http.post("http://0.0.0.0:9000/api/user", {
            firstName: this.form_firstName,
            gender: this.form_gender,
            lastName: this.form_lastName,
            email: this.form_email,
            departure: null,
            topics: []
        }).subscribe(
            res => {
                console.log("Done ! " + res);
            },
            error => {
                console.log(error)
            });
    }

    deleteUser(user: User) {
        console.log("Deleting user :" + user.id);
        this.http.delete("http://0.0.0.0:9000/api/user/" + user.id).subscribe(response => {
            console.log(response);
            this.users.splice(this.users.indexOf(user), 1);
        });
    }


};
