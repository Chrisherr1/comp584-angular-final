import { Injectable } from '@angular/core';                  // Marks this class as injectable
import { HttpClient } from '@angular/common/http';           // Angular's HTTP client
import { Observable } from 'rxjs';                           // RxJS Observable type
import { Post } from '../models/post';                       // Strongly typed Post interface

@Injectable({
  providedIn: 'root'                                         // Service available app-wide
})
export class PostService {
  private apiUrl = 'http://localhost:5000/api/posts';        // Base URL for your backend API

  constructor(private http: HttpClient) {}                   // Inject HttpClient

  // Fetch all posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  // Fetch a single post by ID
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  // ✅ Create a new post
  createPost(post: Post): Observable<Post> {
    // Sends a POST request to the backend with the new post data
    // The backend should return the created Post (with an assigned ID)
    return this.http.post<Post>(this.apiUrl, post);
  }

  // (Optional) Update an existing post
  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  // (Optional) Delete a post
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
