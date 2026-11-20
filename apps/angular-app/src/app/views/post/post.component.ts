import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Post } from '../../models/Post';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'mfee-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  public post$: Observable<Post>;

  commentForm = this.fb.group({
    comment: ['', Validators.required]
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(switchMap(({ id }) => this.postService.getPost(id)));
  }

  onSubmit(postId: string) {
    this.postService.addComment(postId, this.commentForm.value.comment).subscribe((comment) => {
      // TODO : Add comment to UI
      console.log(comment);
    });
    this.commentForm.reset();
  }

  get comment() {
    return this.commentForm.get('comment');
  }
}
