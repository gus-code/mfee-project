import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Observable, ReplaySubject, firstValueFrom, switchMap, take, takeUntil, tap } from 'rxjs';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category/category.service';
import { PostService } from '../../services/post/post.service';
import { urlValidator } from '../../shared/url-validator';
import { PostModalService } from './post-modal.service';

@Component({
  selector: 'mfee-post-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-modal.component.html',
  styleUrl: './post-modal.component.scss'
})
export class PostModalComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public categories$: Observable<Category[]>;

  postForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', [Validators.required, urlValidator]]
  });

  constructor(
    public postModalService: PostModalService,
    private categoryService: CategoryService,
    private postService: PostService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories(false);

    this.postModalService.post$.pipe(takeUntil(this.destroyed$)).subscribe((post) => {
      this.postForm.setValue({
        title: post?.title ?? '',
        description: post?.description ?? '',
        category: post?.category.id ?? '',
        image: post?.image ?? ''
      });
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  close(): void {
    this.postModalService.close();
  }

  async onSubmit(): Promise<void> {
    await firstValueFrom(
      this.postModalService.post$.pipe(
        take(1),
        switchMap((post) => {
          const payload = {
            ...this.postForm.value
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any;

          return this.postService.upsertPost(post ? { ...post, ...payload } : payload);
        }),
        tap(() => {
          console.log('Update posts');
          // TODO : Update posts
        })
      )
    );

    this.postForm.reset();
    this.close();
  }

  get title() {
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }

  get category() {
    return this.postForm.get('category');
  }

  get image() {
    return this.postForm.get('image');
  }
}
