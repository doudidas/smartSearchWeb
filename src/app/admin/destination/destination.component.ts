import { Component, OnInit } from '@angular/core';
import { addTextIcon, ClarityIcons, languageIcon, viewCardsIcon, viewListIcon } from '@cds/core/icon';
import { sleep } from '@cds/core/internal';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  public destinations: any[];
  public database: any[];
  private destinationDB: any[];
  public showAs = "list"
  private fakeDestination = { name: "---", region: "---" }
  constructor(private api: ApiService) {
    this.destinations = new Array();
  }

  async ngOnInit() {
    ClarityIcons.addIcons(viewCardsIcon, viewListIcon, addTextIcon, languageIcon);
    this.destinations = Array(10).fill(this.fakeDestination)
    this.getAllDestination();
  }

  async addRandomDestination() {
    if (!this.destinations) {
      this.destinations = [];
    }
    const destination = await this.generateRandomDestination();
    this.api.post(this.api.baseURL + 'topic', destination).then(
      () => this.destinations.unshift(destination),
      error => console.error("Failed to update value on DB: " + error)
    );
  }

  public async generateRandomDestination() {
    if (!this.destinationDB) {
      this.destinationDB = await this.api.getDestinationDB();
    }
    const destination = this.destinationDB[Math.floor(Math.random() * this.destinationDB.length)];
    console.log(destination);
    return destination;
  }
  async getAllDestination() {
    let number: number;
    const pageSize = 20;
    number = await this.api.get(this.api.baseURL + 'countTopic',null)
    this.destinations = [];
    for (let page = 0; page < Math.ceil(number/pageSize); page++) {
      this.api.get(this.api.baseURL + 'topic?size=' + pageSize + '&page=' + page, null).then(
        result => this.destinations = this.destinations.concat(result)
      )
    }
  }
  public showPopulation(n: number): string {
    const base = Math.log10(n);
    let output = 'n/a';
    if (base >= 6) {
      output = Math.trunc(n / (1000000)).toString() + ' M';
    } else if (base >= 3) {
      output = Math.trunc(n / (1000)).toString() + ' K';
    }
    return output;
  }
}
