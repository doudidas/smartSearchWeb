import { Component, OnInit } from '@angular/core';
import { Topic } from '../class/topic';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.focusTopic = this.getTopicById(id);
      this.showCard = true;
    } else {
      this.focusTopic = new Topic(null, null, null);
    }
    this.showCard = false;
  }

  public async getAllTopics() {
    this.topics = await this.api.get('api/topic', null);
  }

  public getTopicById(topicId: string) {
    let output: Topic;
    for (const topic of this.topics) {
      if (topic.hasOwnProperty('id') && topic.id === topicId) {
        output = topic;
        break;
      }
    }
    return output;
  }

  getTopicUrlById(topicId: string) {
    const uri = 'images/topics/full/' + topicId + '.jpg';
    return uri;
  }
  showTopic(topic: Topic) {
    this.focusTopic = topic;
    this.showCard = true;
  }
}
