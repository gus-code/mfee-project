import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, catchError, of, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { AddPostComponent } from '../../components/add-post/add-post.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { PostGridComponent } from '../../components/post-grid/post-grid.component';
import { PostModalComponent } from '../../components/post-modal/post-modal.component';
import { PostModalService } from '../../components/post-modal/post-modal.service';
import { Category } from '../../models/Category';
import { Post } from '../../models/Post';
import { CategoryService } from '../../services/category/category.service';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'mfee-home',
  standalone: true,
  imports: [CommonModule, AddPostComponent, CategoriesComponent, PostGridComponent, PostModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public categories$: Observable<Category[]>;
  public posts$: Observable<Post[]>;

  private selectedCategory = new BehaviorSubject<string>('all');
  public selectedCategory$ = this.selectedCategory.asObservable();

  constructor(private postService: PostService, private categoryService: CategoryService, private postModalService: PostModalService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();

    this.posts$ = this.selectedCategory$.pipe(switchMap((selectedCategory) => this.postService.getPosts(selectedCategory)));
  }

  public onCategoryChange(categoryId: string): void {
    this.selectedCategory.next(categoryId);
  }

  public onAddPost(): void {
    this.postModalService.setInfo('Create Post');
    this.postModalService.open();
  }

  public onEditPost(postId: string): void {
    this.postService.getPost(postId).subscribe((post) => {
      this.postModalService.setInfo('Edit Post', post);
      this.postModalService.open();
    });
  }

  public onDeletePost(postId: string): void {
    this.postService
      .deletePost(postId)
      .pipe(
        take(1),
        withLatestFrom(this.selectedCategory$),
        tap(([, selectedCategory]) => {
          this.onCategoryChange(selectedCategory);
        }),
        catchError(() => {
          // TODO : Show an error message to the user
          return of(null);
        })
      )
      .subscribe();
  }
}
