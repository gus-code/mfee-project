import { Route } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { PostComponent } from './views/post/post.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'post/:id',
    component: PostComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

