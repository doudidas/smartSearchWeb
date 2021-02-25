import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.scss']
})
export class NotFoundComponent implements OnInit {
  previousRoute: string;
  constructor() { }

  ngOnInit() {
    // this.previousRoute = this.previousRouteService.getPreviousUrl();
  }

}
