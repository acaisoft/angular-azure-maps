import {Injectable} from '@angular/core';
import {azureMapLazyLoader} from './azure-map-lazy-loader';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {Subject} from 'rxjs';

@Injectable()
export class LoadMapService {

  mapPromise: Promise<any>;

  public isLoaded = false;

  loadedSubject = new Subject<boolean>();

  constructor() {
  }

  load() {
    if (!this.isLoaded) {
      this.mapPromise = azureMapLazyLoader().then(() => {
        this.isLoaded = true;
        this.loadedSubject.next(true);
      })
      return fromPromise(this.mapPromise);
    }
  }
}
