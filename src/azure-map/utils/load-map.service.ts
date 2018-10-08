import {Injectable} from '@angular/core';
import {azureMapLazyLoader} from './azure-map-lazy-loader';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {b} from '@angular/core/src/render3';

@Injectable()
export class LoadMapService {


  public isLoaded = false;

  public isComponentLoaded = false



  loadedSubject = new Subject<boolean>();
  loadedComponenet = new BehaviorSubject(false)

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

  observableComponent() {
    return this.loadedSubject.asObservable();
  }
}
