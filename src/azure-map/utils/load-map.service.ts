import {Injectable} from '@angular/core';
import {azureMapLazyLoader} from './azure-map-lazy-loader';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoadMapService {

  mapPromise: Promise<any>;

  public isLoaded = false;

  loadedSubject = new Subject<boolean>();

  constructor() {
  }

  load(): Observable<boolean> {
    if (!this.isLoaded) {
      return fromPromise(azureMapLazyLoader().then(() => {
        this.isLoaded = true;
        return this.isLoaded;
      }));
    } else {
      return Observable.of(true);
    }
  }

  observableMap() {
    return this.loadedSubject.asObservable();
  }
}
