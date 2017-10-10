import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  currentRate = 8;
  time = {hour: 13, minute: 30};
  
  constructor() { }

  ngOnInit() {
  }

}
