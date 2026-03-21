import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Info } from '../info/info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Info],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  question = "What’s your name?";
  answer = "unknown";

  appForm = new FormGroup({
    answer: new FormControl("")
  });

  onSubmit(data: Partial<{ answer: string | null }>) {
    this.answer = data.answer!;
    console.log("your name is " + this.answer);
  }
}
