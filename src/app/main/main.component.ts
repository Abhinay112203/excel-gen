
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkBook, WorkSheet, read, utils, writeFile } from 'xlsx';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  
}
