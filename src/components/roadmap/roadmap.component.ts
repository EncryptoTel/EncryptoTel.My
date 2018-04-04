import {Component} from '@angular/core';

import {RoadmapServices} from '../../services/roadmap.services';

import {PageInfo} from '../../models/page-info.model';
import {RoadmapItem} from '../../models/roadmap-item.model';

@Component({
  selector: 'roadmap-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  providers: [RoadmapServices]
})

export class RoadmapComponent {

  // Page data
  pageInfo: PageInfo;
  loading: boolean;

  // Roadmap array
  roadmap: RoadmapItem[];

  constructor(private _services: RoadmapServices) {
    this.pageInfo = {
      title: 'Encrypto Telecom Roadmap',
      description:
        `Track any changes and progresses of our development. Timeframes may be approximate and we <br class="hidden_sm_down">
         want to show changes happening in real time. We will also pin github links where it's possible`
    };
    this.loading = true;
    this.roadmap = [];
    this.fetchRoadmap();
  }

  fetchRoadmap(): void {
    this.loading = true;
    this._services.fetchRoadmap()
      .then(() => this.loading = false)
      .catch(() => this.loading = false)
  }
}
