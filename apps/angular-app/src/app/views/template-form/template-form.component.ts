import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'mfee-project-template-form',
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss'
})
export class TemplateFormComponent {
  public empleado: any;
  constructor() {
    this.empleado = {
      nombre: '',
      edad: '',
      puesto: ''
    };
  }
  ngOnInit(): void {}
  onSubmit(frm1: NgForm) {
    if (frm1.valid) {
      console.log(frm1.value);
    } else {
      console.log('algun campo esta vacio');
    }
  }
}
