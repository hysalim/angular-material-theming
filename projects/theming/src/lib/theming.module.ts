import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatThemingConfig, MatThemingService } from '../public-api';
import { ThemingComponent } from './theming.component';

@NgModule({
  declarations: [
    ThemingComponent
  ],
  imports: [
  ],
  exports: [
    ThemingComponent
  ]
})
export class MatThemingModule {
  static forRoot(config: MatThemingConfig[]): ModuleWithProviders<MatThemingModule> {
    return {
      ngModule: MatThemingModule,
      providers: [
        MatThemingService,
        {provide: 'config', useValue: config}
      ]
    };
  }
}
