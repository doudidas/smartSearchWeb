import { Component, OnInit } from '@angular/core';
import { Topic } from '../class/topic';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})

export class TopicComponent implements OnInit {
  public topics: Topic[];
  public focusTopic: Topic;
  public showCard: boolean;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.getAllTopics();
  }

  async ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.focusTopic = this.getTopicById(id);
      this.showCard = true;
    } else {
      this.focusTopic = new Topic(null, null, null);
    }
    this.showCard = false;
  }

  public async getAllTopics() {
    this.topics = await this.api.get("api/topic", null);
    for (let index = 0; index < this.topics.length; index++) {
      this.topics[index].description = await this.api.getLoremIpsum().then(
        success => {
          return success;
        }, error => {
          return error.error.text;
        }
      );
    }
  }

  public getTopicById(topicId: number) {
    let output: Topic;
    for (let i = 0; i < this.topics.length; i++) {
      if (this.topics[i].hasOwnProperty('id') && this.topics[i].id === topicId) {
        output = this.topics[i];
        break;
      }
    }
    return output;
  }

  getTopicUrlById(topicId: number) {
    let uri = "images/topics/full/" + Math.floor(topicId) + ".jpg";
    return uri;
  }
  showTopic(topic: Topic) {
    this.focusTopic = topic;
    this.showCard = true;
  }

  public async setRandomDesription() {

  }
}
