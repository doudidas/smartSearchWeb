import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  public destinations: any[];


  constructor(private api: ApiService) {
    this.destinations = new Array();
  }
  ngOnInit() {
  }

  addRandomDestination() {
    const ID = Math.floor(Math.random() * 500) + 1;
    this.api.get('https://picsum.photos/id/' + ID + '/info', null).then(
      obj => {
        obj.link = 'https://picsum.photos/200?random=' + ID;
        this.destinations.push(obj);
      }
    );
  }
}
