import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';

import { Comment, CommentResponse } from '../../models/Comment';
import { GetPostResponse, GetPostsResponse, Post } from '../../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsApiUrl = 'http://localhost:4200/api/posts';

  constructor(private http: HttpClient) {}

  public getPosts(selectedCategory: string): Observable<Array<Post>> {
    const url = selectedCategory === 'all' ? this.postsApiUrl : `${this.postsApiUrl}/category/${selectedCategory}`;

    return this.http.get<GetPostsResponse[]>(url).pipe(
      take(1),
      map((posts) =>
        posts.map((p) => ({
          id: p._id,
          title: p.title,
          image: p.image,
          description: p.description,
          category: {
            id: p.category._id,
            name: p.category.name
          },
          comments: {
            count: p.comments.length
          }
        }))
      )
    );
  }

  public getPost(postId: string): Observable<Post> {
    return this.http.get<GetPostResponse>(`${this.postsApiUrl}/${postId}`).pipe(
      take(1),
      map((post) => ({
        id: post._id,
        title: post.title,
        image: post.image,
        description: post.description,
        category: {
          id: post.category._id,
          name: post.category.name
        },
        comments: {
          count: post.comments.length,
          data: post.comments.map((c) => ({
            id: c._id,
            author: c.author,
            content: c.content
          }))
        }
      }))
    );
  }

  public upsertPost(post: Partial<Post>): Observable<Post> {
    const format = (post: GetPostResponse) => ({
      id: post._id,
      title: post.title,
      image: post.image,
      description: post.description,
      category: {
        id: post.category._id,
        name: post.category.name
      },
      comments: {
        count: post.comments.length,
        data: post.comments.map((c) => ({
          id: c._id,
          author: c.author,
          content: c.content
        }))
      }
    });

    if (post.id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, comments, ...payload } = post;
      // Edit post
      return this.http.patch<GetPostResponse>(`${this.postsApiUrl}/${post.id}`, payload).pipe(
        take(1),
        map((post) => format(post))
      );
    }

    // Create post
    return this.http.post<GetPostResponse>(this.postsApiUrl, post).pipe(
      take(1),
      map((post) => format(post))
    );
  }

  public deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.postsApiUrl}/${postId}`).pipe(take(1));
  }

  public addComment(postId: string, comment: string): Observable<Comment> {
    const payload = {
      author: 'Anonymous',
      content: comment
    };
    return this.http.post<CommentResponse>(`${this.postsApiUrl}/${postId}/comments`, payload).pipe(
      take(1),
      map((comment) => ({
        id: comment._id,
        author: comment.author,
        content: comment.content
      }))
    );
  }
}
