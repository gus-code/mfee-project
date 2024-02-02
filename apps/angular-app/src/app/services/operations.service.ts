import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  num1: number;
  num2: number;

  constructor() {}

  add(num1, num2) {
    let result = num1 + num2;
    console.log(`the add result is: ${num1 + num2}`);
    return result;
  }

  substract(num1, num2) {
    let result = num1 - num2;
    console.log(`the substract result is: ${num1 - num2}`);
    return result;
  }

  multiply(num1, num2) {
    let result = num1 * num2;
    console.log(`the multiply result is: ${num1 * num2}`);
    return result;
  }

  divide(num1, num2) {
    if (num2 != 0) {
      let result = num1 / num2;
      console.log(`the divide result is: ${num1 / num2}`);
      return result;
    } else {
      return 'we can not divide by 0';
    }
  }
}
