import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from '../services/previous-route.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.scss']
})
export class NotFoundComponent implements OnInit {
  previousRoute: string;
  constructor(private previousRouteService: PreviousRouteService) { }

  ngOnInit() {
    // this.previousRoute = this.previousRouteService.getPreviousUrl();
  }

}
