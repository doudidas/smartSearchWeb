import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  public destinations: any[];
  public database: any[];
  private destinationDB: any[];

  constructor(private api: ApiService) {
    this.destinations = new Array();
    // this.getAllDestinations();
  }
  async ngOnInit() {
    this.destinations = await this.getAllDestination();
  }

  async addRandomDestination() {
    if (! this.destinations) {
      this.destinations = [];
    }
    const destination = await this.generateRandomDestination();
    this.api.post(this.api.baseURL + 'topic', destination).then(
      success => {
        this.destinations.push(destination);

      }
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
  async getAllDestination(): Promise<any> {
    let destinations: any[];
    await this.api.get(this.api.baseURL + 'topic', null)
      .then((success: any[]) => {
        destinations = success;
      }, () => {
        destinations = null;
      });
    return destinations;
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
