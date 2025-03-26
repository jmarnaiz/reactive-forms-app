import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/pages/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveItems
    .filter((item) => item.title)
    .map((item) => ({
      title: `${item.title}`,
      route: `reactive/${item.path}`,
    }));

  authMenu: MenuItem[] = [
    {
      title: 'Register',
      route: './auth',
    },
  ];

  countryMenu: MenuItem[] = [
    {
      title: 'Countries',
      route: './country',
    },
  ];
}
