import { Component, OnInit } from '@angular/core';   // Component decorator + lifecycle hook interface
import { CommonModule } from '@angular/common';      // Provides common Angular directives like *ngFor and *ngIf
import { MatCardModule } from '@angular/material/card'; // Angular Material module for card UI components

import { PostService } from '../post.service';       // Import the PostService we just created
import { Post } from '../../models/post';            // Import the Post interface for strong typing

@Component({
  selector: 'app-post-list',                         // The HTML tag used to render this component
  standalone: true,                                  // Marks this as a standalone component (no NgModule needed)
  imports: [CommonModule, MatCardModule],            // Declare which modules this component depends on
  templateUrl: './post-list.html',                   // External HTML template file
  styleUrls: ['./post-list.css']                     // External CSS file for styling
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];                                // Local property to hold the list of posts

  constructor(private postService: PostService) {}   // Inject PostService so we can fetch posts

  ngOnInit(): void {
    // Lifecycle hook runs once when the component is initialized
    this.postService.getPosts().subscribe({
      next: (data) => this.posts = data,             // Assign fetched posts to local property
      error: (err) => console.error('Error fetching posts', err) // Log errors if API call fails
    });
  }
}
