import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatThemingModule, MatThemingConfig } from '@hysalim/theming';

const theme: MatThemingConfig[] = [
  {name: 'default', dataClass: ''},
  {name: 'test', dataClass: 'test'},
  {name: 'Sans Material', dataClass: 'sans-material'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatThemingModule.forRoot(theme)
  ]
})
export class CoreModule { }
