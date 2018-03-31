import {Injectable} from '@angular/core';

import {RequestServices} from './request.services';

import {RoadmapItem} from '../models/roadmap-item.model';

@Injectable()
export class RoadmapServices {
  constructor(private _req: RequestServices) {}

  // Fetching roadmap data
  fetchRoadmap(): Promise<RoadmapItem[]> {
    return this._req.get('roadmap', true)
      .then(res => {
        console.log(res);
        return [];
      })
      .catch(res => {
        console.log(res);
        return [];
      });
  }
}
