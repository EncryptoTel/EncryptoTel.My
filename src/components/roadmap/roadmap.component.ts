import {Component, ElementRef, ViewChild} from '@angular/core';

import {RoadmapServices} from '../../services/roadmap.services';

import {PageInfo} from '../../models/page-info.model';
import {RoadmapModel} from '../../models/roadmap.model';

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
  roadmap: RoadmapModel;

  progress: number[];

  @ViewChild('dotItem') dotItems: ElementRef;

  constructor(private _services: RoadmapServices) {
    this.pageInfo = {
      title: 'Encrypto Telecom Roadmap',
      description:
        `Track any changes and progresses of our development. Timeframes may be approximate, and we <br class="hidden_sm_down">
         want to show changes happening in real time. We will also pin Github links where it's possible.`
    };
    this.loading = true;
    this.fetchRoadmap();
    this.progress = Array(20).fill(0).map((i, x) => x + 1);
  }

  fetchRoadmap(): void {
    this.loading = true;
    this._services.fetchRoadmap()
      .then(res => {
        this.roadmap = res;
        this.loading = false;
      })
      .catch(() => this.loading = false)
  }
}
