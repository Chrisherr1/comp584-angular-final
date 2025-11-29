import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { PostService, PostDto } from '../post.service'; // ✅ use PostDto from service

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './post-list.html',
  styleUrls: ['./post-list.css']
})
export class PostListComponent implements OnInit {
  posts: PostDto[] = []; // ✅ use PostDto[]

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (data) => this.posts = data,
      error: (err) => console.error('Error fetching posts', err)
    });
  }

  onEdit(post: PostDto): void {
    console.log('Edit post:', post);
    // TODO: Implement edit logic (e.g. navigate to edit form)
  }

  onDelete(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.posts = this.posts.filter(p => p.id !== postId);
          console.log('Post deleted successfully');
        },
        error: (err) => console.error('Error deleting post', err)
      });
    }
  }
}
