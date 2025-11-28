import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list';
import { PostDetailComponent } from './posts/post-detail/post-detail';
import { PostFormComponent } from './posts/post-form/post-form';
import { Login } from './auth/login/login';
import { authGuard } from './auth.guard'; 
import { Register } from './auth/register/register';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'signup', component: Register },
    { path: '', component: PostListComponent,canActivate: [authGuard] },
    { path: 'posts/:id',component: PostDetailComponent,canActivate: [authGuard] },
    { path: 'create',component: PostFormComponent,canActivate: [authGuard]  }
];