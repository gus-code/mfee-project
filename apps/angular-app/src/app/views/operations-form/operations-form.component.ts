import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'mfee-project-operations-form',
  templateUrl: './operations-form.component.html',
  styleUrl: './operations-form.component.scss'
})
export class OperationsFormComponent {
  public empleado: any;
  public num1: number;
  public num2: number;
  public result: number | string ;
  public operationSelected: string;
  constructor(public _operations: OperationsService) {

  }
  ngOnInit(): void {}
  
  onSubmit(frm1: NgForm) {
    this.operationSelected = frm1.value.operationSelected;
    if (frm1.valid) {
      switch (this.operationSelected) {
        case 'add': {
          this.result = this._operations.add(frm1.value.num1, frm1.value.num2);
          break;
        }
        case 'substract': {
          this.result = this._operations.substract(frm1.value.num1, frm1.value.num2);
          break;
        }
        case 'multiply': {
          this.result = this._operations.multiply(frm1.value.num1, frm1.value.num2);
          break;
        }
        case 'divide': {
          this.result = this._operations.divide(frm1.value.num1, frm1.value.num2);
          break;
        }
        default:
          console.warn("no operation selected");
          break;
      }
    } else {
      console.log('algun campo esta vacio');
    }
  }
}
