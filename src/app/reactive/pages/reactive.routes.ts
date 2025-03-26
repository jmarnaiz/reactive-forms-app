import { Routes } from '@angular/router';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { DynamicPageComponent } from './dynamic-page/dynamic-page.component';
import { SwitchesPageComponent } from './switches-page/switches-page.component';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basics',
        component: BasicPageComponent,
      },
      {
        path: 'dynamic',
        title: 'Basics',
        component: DynamicPageComponent,
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchesPageComponent,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];
