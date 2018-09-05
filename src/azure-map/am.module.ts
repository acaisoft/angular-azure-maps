import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtlasMapComponent } from './atlas-map/atlas-map.component';
import { AtlasPopupDirective } from './directives/atlas-popup.directive';
import {LoadMapService} from './utils/load-map.service';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AtlasMapComponent, AtlasPopupDirective],
  exports: [
    AtlasMapComponent,
    AtlasPopupDirective,
  ],
  bootstrap: [AtlasMapComponent]
})
export class AmModule {
  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: AmModule,
      providers: [
        LoadMapService
      ]
    };
  }
}
