// Angular core imports
import { Component } from '@angular/core';                 // Component decorator
import { CommonModule } from '@angular/common';            // Provides directives like *ngIf and *ngFor
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// FormsModule + ReactiveFormsModule enable template-driven and reactive forms
// FormBuilder helps build form groups easily
// Validators provide built-in validation rules
import { Router } from '@angular/router';                  // Router for navigation

// Angular Material imports for form UI
import { MatCardModule } from '@angular/material/card';    // Card container
import { MatFormFieldModule } from '@angular/material/form-field'; // Form field wrapper
import { MatInputModule } from '@angular/material/input';  // Input fields
import { MatButtonModule } from '@angular/material/button';// Buttons

// Import PostService and Post model
import { PostService } from '../post.service';
import { Post } from '../../models/post';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-post-form',                               // HTML tag for this component
  standalone: true,                                        // Standalone component (no NgModule)
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './post-form.html',               // External HTML template
  styleUrls: ['./post-form.css']                 // External CSS styles
})
export class PostFormComponent {
  postForm: FormGroup;                                     // Reactive form group to hold form controls

  constructor(
    private fb: FormBuilder,                               // Inject FormBuilder to create form groups
    private postService: PostService,                      // Inject PostService to send data to backend
    private router: Router                                 // Inject Router for navigation
  ) {
    // Initialize the form with controls and validators
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]], // Title field, required, min length 3
      content: ['', [Validators.required, Validators.minLength(10)]] // Content field, required, min length 10
    });
  }

  // Method called when form is submitted
  onSubmit(): void {
    if (this.postForm.valid) {                             // Only proceed if form passes validation
      const newPost: Post = {
        id: 0,                                             // ID will be assigned by backend
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        author: { id: 1, username: 'currentUser', role: 'User' }, // Example author (replace with real user)
        comments: []                                       // New post starts with no comments
      };

      // Call PostService to send new post to backend
      this.postService.createPost(newPost).subscribe({
        next: (response) => {
          console.log('Post created:', response);
          // Navigate back to root after successful post creation
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error creating post', err)
      });
    }
  }
}