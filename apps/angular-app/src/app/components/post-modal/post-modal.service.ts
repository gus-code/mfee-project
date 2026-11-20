import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Post } from '../../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostModalService {
  private display: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public display$: Observable<boolean> = this.display.asObservable();

  private title: BehaviorSubject<string> = new BehaviorSubject('');
  public title$: Observable<string> = this.title.asObservable();

  private post: BehaviorSubject<Post> = new BehaviorSubject(null);
  public post$: Observable<Post> = this.post.asObservable();

  constructor() {}

  open(): void {
    this.display.next(true);
  }

  close(): void {
    this.display.next(false);
  }

  setInfo(title: string, post: Post = null): void {
    this.title.next(title);
    this.post.next(post);
  }
}
