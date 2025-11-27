import { Routes } from '@angular/router';             // Angular routing system
import { PostListComponent } from './posts/post-list/post-list'; // List view
import { PostDetailComponent } from './posts/post-detail/post-detail'; // Detail view
import { PostFormComponent } from './posts/post-form/post-form';

export const routes: Routes = [
    { path: '', component: PostListComponent },           // Default route shows the list of posts
    { path: 'posts/:id', component: PostDetailComponent },// Route with dynamic 'id' shows a single post
    { path: 'create', component: PostFormComponent }  
];
