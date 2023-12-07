import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locaion',
  templateUrl: './locaion.component.html',
  styleUrls: ['./locaion.component.scss']
})
export class LocaionComponent implements OnInit {
  location: any;
userName: any;
  onLogin() {
    throw new Error('Method not implemented.');
  }
  selectedGroup: any;
  userGroups: string[] = [
'ssss'
  ];
  constructor() { }

  ngOnInit() {
  }

}
