// Import Angular core features
import { Component, OnInit } from '@angular/core';   // Component decorator + lifecycle hook interface
import { CommonModule } from '@angular/common';      // Provides common Angular directives like *ngIf and *ngFor
import { ActivatedRoute } from '@angular/router';    // Gives access to route parameters (e.g., /posts/:id)
import { MatCardModule } from '@angular/material/card'; // Angular Material module for card UI components

// ✅ Import PostService and PostDto (not old Post model)
import { PostService, PostDto } from '../post.service'; // Service + DTO interfaces

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './post-detail.html',
  styleUrls: ['./post-detail.css']
})
export class PostDetailComponent implements OnInit {
  post: PostDto | null = null; // ✅ use PostDto

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPostById(id).subscribe({
      next: (data) => this.post = data,
      error: (err) => console.error('Error fetching post', err)
    });
  }
}
