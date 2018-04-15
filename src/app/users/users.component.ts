import {Injectable} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

@Injectable()
export class UsersComponent {

    public users;
  constructor(private http:HttpClient) {
      var response = http.get('http://0.0.0.0:9000/api/users').subscribe(data => {
      this.users = data;
      console.log(this.users);
    });;
  }
}
