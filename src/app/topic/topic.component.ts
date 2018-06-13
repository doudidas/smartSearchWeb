import { Component, OnInit } from '@angular/core';
import { Topic } from '../class/topic';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})

export class TopicComponent implements OnInit {
  public topics: Topic[];
  public focusTopic: Topic;
  public showCard: boolean;
  constructor(private api: ApiService) {
    this.getAllTopics();
  }

  ngOnInit() {
    this.focusTopic = new Topic(null, null, null);
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
