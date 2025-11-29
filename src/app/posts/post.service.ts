import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Request DTO: what we send when creating/updating a post
export interface CreatePostDto {
  title: string;
  content: string;
}

// Response DTO: what the backend returns
export interface PostDto {
  id: number;
  title: string;
  content: string;
  authorName: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5163/api/posts'; // Adjust if your backend runs on a different port

  constructor(private http: HttpClient) {}

  // Helper to build headers with JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // token should be stored after login
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Fetch all posts (public endpoint)
  getPosts(): Observable<PostDto[]> {
    return this.http.get<PostDto[]>(this.apiUrl);
  }

  // Fetch a single post by ID (public endpoint)
  getPostById(id: number): Observable<PostDto> {
    return this.http.get<PostDto>(`${this.apiUrl}/${id}`);
  }

  // Create a new post (requires auth)
  createPost(dto: CreatePostDto): Observable<PostDto> {
    return this.http.post<PostDto>(this.apiUrl, dto, { headers: this.getAuthHeaders() });
  }

  // Update an existing post (requires auth)
  updatePost(id: number, dto: CreatePostDto): Observable<PostDto> {
    return this.http.put<PostDto>(`${this.apiUrl}/${id}`, dto, { headers: this.getAuthHeaders() });
  }

  // Delete a post (requires auth)
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
