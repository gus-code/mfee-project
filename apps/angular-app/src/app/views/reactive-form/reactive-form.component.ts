import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mfee-project-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})
export class ReactiveFormComponent {
  profileForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    edad: new FormControl('', [Validators.required])
  });
  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    } else {
      console.log(' Algun campo no es valido');
    }
  }
}
