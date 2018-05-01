import {Injectable} from '@angular/core';

import {RequestServices} from './request.services';

import {RoadmapModel} from '../models/roadmap.model';

@Injectable()
export class RoadmapServices {
  constructor(private _req: RequestServices) {}

  // Fetching roadmap data
  fetchRoadmap(): Promise<RoadmapModel> {
    return this._req.get('roadmap', true)
      .then(res => {
        return res;
      })
      .catch(() => {
        return Promise.reject(null);
      });
  }
}
