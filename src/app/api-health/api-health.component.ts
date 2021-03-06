import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-api-health',
  templateUrl: './api-health.component.html',
  styleUrls: ['./api-health.component.css']
})
export class ApiHealthComponent implements OnInit {
  public refresh: boolean;
  public message: string;
  public waiting: true;
  constructor(private api: ApiService, private service: GeneralService, public router: Router) { }

  ngOnInit() {
    this.init();
  }

  private async init() {
    while (this.router.url !== "/") {
      this.refreshMessage();
      const timer = (this.message) ? 1000 * 5 : 1000 * 60;
      await this.service._delay(timer);
    }
  }

  public async refreshMessage() {
    this.refresh = true;
    this.message = await this.api.checkHealth();
    this.refresh = false;
  }

}
