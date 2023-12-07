import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dashBoard',
  templateUrl: './dashBoard.component.html',
  styleUrls: ['./dashBoard.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DashBoardComponent implements OnInit {

  
  ageRangeChartData = [
    { name: '13-17', value: 0 },
    { name: '18-24', value: 120 },
    { name: '25-34', value: 220 },
    { name: '35-44', value: 180 },
    { name: '45-54', value: 150 },
    { name: '55+', value: 100 }
  ];

  pieChartData = [
    {
      name: 'Category A',
      value: 300
    },
    {
      name: 'Category B',
      value: 500
    },
    {
      name: 'Category C',
      value: 200
    },
    {
      name: 'Category D',
      value: 200
    }
  ];

  
  totalValue: number = 0;
  selectedDate: Date | undefined;
  


 
  constructor(private router: Router) {
    
    this.calculateTotalValue()
  }


  calculateTotalValue() {
    this.totalValue = this.pieChartData.reduce((sum, data) => sum + data.value, 0);


    // Calculate the sum of all values
    const totalValue = this.ageRangeChartData.reduce((sum, data) => sum + data.value, 0);

    // Update each value as a rounded percentage of the total value
    this.ageRangeChartData.forEach(data => {
      data.value = Math.round((data.value / totalValue) * 100);
    });
  }

  ngOnInit() {
  }


  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  changePassword() {
    throw new Error('Method not implemented.');
  }
}
