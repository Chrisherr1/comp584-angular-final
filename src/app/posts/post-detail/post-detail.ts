// Import Angular core features
import { Component, OnInit } from '@angular/core';   // Component decorator + lifecycle hook interface
import { CommonModule } from '@angular/common';      // Provides common Angular directives like *ngIf and *ngFor
import { ActivatedRoute } from '@angular/router';    // Gives access to route parameters (e.g., /posts/:id)
import { MatCardModule } from '@angular/material/card'; // Angular Material module for card UI components

// Import your PostService and Post model
import { PostService } from '../post.service';       // Service that fetches posts from the backend
import { Post } from '../../models/post';            // Strongly typed Post interface

@Component({
  selector: 'app-post-detail',                       // HTML tag used to render this component
  standalone: true,                                  // Marks this as a standalone component (no NgModule needed)
  imports: [CommonModule, MatCardModule],            // Declare which modules this component depends on
  templateUrl: './post-detail.html',                 // External HTML template file
  styleUrls: ['./post-detail.css']                    // External CSS file for styling
})
export class PostDetailComponent implements OnInit {
  post?: Post;                                       // Local property to hold the single post (optional until loaded)

  constructor(
    private route: ActivatedRoute,                   // Inject ActivatedRoute to read route parameters
    private postService: PostService                 // Inject PostService to fetch post data
  ) {}

  ngOnInit(): void {
    // Extract the "id" parameter from the current route (e.g., /posts/5 → id = 5)
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Use PostService to fetch the post by ID
    this.postService.getPostById(id).subscribe({
      next: (data) => this.post = data,              // Assign the fetched post to local property
      error: (err) => console.error('Error fetching post', err) // Log errors if API call fails
    });
  }
}
