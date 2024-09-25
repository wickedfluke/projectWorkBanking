import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  constructor(private titleSrv: Title) {}
  ngonOnit() {
    this.titleSrv.setTitle('myBanking');
  }
}
