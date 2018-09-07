import {Injectable} from '@angular/core';
import {azureMapLazyLoader} from './azure-map-lazy-loader';
import {Observable, of, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';

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
      return of(true);
    }
  }

  observableMap() {
    return this.loadedSubject.asObservable();
  }
}
