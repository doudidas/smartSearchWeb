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

  constructor(private api: ApiService) {
    this.getAllTopics();
  }

  ngOnInit() {

  }

  public async getAllTopics() {
    this.topics = await this.api.get("topic", null);
    this.topics.forEach(topic => {
      console.log(topic);
    });
  }
  getTopicUrlById(topicId: number) {
    let uri = "images/topics/full/" + Math.floor(topicId) + ".jpg";
    return uri;
  }
}
