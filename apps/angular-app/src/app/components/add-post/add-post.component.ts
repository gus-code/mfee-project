import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mfee-add-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  @Output() clickAction: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  public addPost(): void {
    this.clickAction.emit();
  }
}
