import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './info.html',
  styleUrl: './info.css',
})

export class Info implements OnInit {
  @Input() name: string = '';

  quantity = 0;
  products: string[] = [];
  selectedProduct = 'Star Wars';

  ngOnInit() {
    this.quantity = 0;
    this.products = ['Star Wars', 'The Empire Strikes Back', 'Return of the Jedi'];
    this.selectedProduct = 'Star Wars';
  }

  newInfo() {
    this.quantity = 0;
    this.products = ['Star Wars', 'The Empire Strikes Back', 'Return of the Jedi'];
    this.selectedProduct = 'Star Wars';
    console.log('in newInfo() and resetting Info');
  }

  onSubmit() {
    console.log(
      'in onSubmit() with quantity of ' +
      this.quantity +
      ' and movie selected is ' +
      this.selectedProduct
    );
  }
}
