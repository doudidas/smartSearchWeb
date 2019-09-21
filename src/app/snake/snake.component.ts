import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})


export class SnakeComponent {
  constructor(public router: Router) {
    router.navigate(['maintenance']);
  }
}
