import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../models/Post';

@Component({
  selector: 'mfee-post-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-grid.component.html',
  styleUrl: './post-grid.component.scss'
})
export class PostGridComponent {
  @Input() posts: Array<Post>;
  @Output() deletePost: EventEmitter<string> = new EventEmitter<string>();
  @Output() editPost: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {}

  public onClick(event, postId: string): void {
    if (
      !event.target.className.includes('mfee-grid-post__actions-item') &&
      !event.target.parentNode.className.includes('mfee-grid-post__actions-item')
    ) {
      this.router.navigate(['/post', postId]);
    }
  }

  public onEditPost(postId: string): void {
    this.editPost.emit(postId);
  }

  public onDeletePost(postId: string): void {
    this.deletePost.emit(postId);
  }
}
