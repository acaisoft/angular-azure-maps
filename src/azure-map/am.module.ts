import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AtlasMapComponent } from './atlas-map/atlas-map.component';
import { AtlasPopupDirective } from './directives/atlas-popup.directive';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: [],
  declarations: [AtlasMapComponent, AtlasPopupDirective],
  exports: [
    AtlasMapComponent,
    AtlasPopupDirective
  ],
  bootstrap: [AtlasMapComponent]
})
export class AmModule {
}
