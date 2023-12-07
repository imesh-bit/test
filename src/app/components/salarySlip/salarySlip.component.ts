import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SalarySlipService } from 'src/app/service/salary-slip/salarySlip.service';
import { SalaryMonthService } from 'src/app/service/salarymonth-service/salaryMonth.service';
interface LoadData {
  name: any;
  code: any;
  runpayroll: any;
  stopallowance: any;
  stopattendance: any;
}
@Component({
  selector: 'app-salarySlip',
  templateUrl: './salarySlip.component.html',
  styleUrls: ['./salarySlip.component.scss']
})
export class SalarySlipComponent implements OnInit {
  slip: any;

  constructor(private salarymonthService: SalaryMonthService, private sanitizer: DomSanitizer, private salarySlipSerivce: SalarySlipService) { }
  selectedMonth: any;
  months: LoadData[] = [];
  pdfUrl?: SafeResourceUrl;
  empId: any;
  pdfSrc: SafeResourceUrl | undefined;

  ngOnInit() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();
    const monthsN = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    const currentMonth = monthsN[currentMonthIndex];
    const monthCode = `${currentMonth}-${currentYear}`;

    console.log(currentMonth);
    console.log(currentYear);
    console.log(monthCode);
    this.selectedMonth = monthCode

    this.getAllSalaryMonths()
    const dataString = localStorage.getItem('data');
    console.log(dataString);

    // this.empId = 4924
    // this.getSalarySlip()
  }
  // loadPdf() {
  //   this.salarySlipSerivce.getPdf().subscribe((pdfBlob: Blob) => {
  //     const url = URL.createObjectURL(pdfBlob);
  //     this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //   });
  // }
  getSalarySlip(): void {
    console.log(this.selectedMonth);
    
    this.salarySlipSerivce.getSalarySlip(this.selectedMonth).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        console.log('blob : ',blob);
        
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
      },
      (error: any) => {
        console.error('Error fetching salary slip:', error);
        // Handle error if needed
      }
    );
  }
  
  downloadFile(data: Blob): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const pdfURL = URL.createObjectURL(blob);
    window.open(pdfURL, '_blank');
  }
  getAllSalaryMonths(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.salarymonthService.getSalaryMonthList().subscribe(
        (data: any) => {
          console.log('salary months:', data);
          this.months = data.map((item: any) => {

            return {
              name: item.monthcode,
              code: item.monthcode,
              runpayroll: item.runpayroll,
              stopallowance: item.stopallowance,
              stopattendance: item.stopattendance
            };

          });
          console.log(this.months);
          resolve(); // Resolve the Promise when the data is processed
        },
        (error: any) => {
          console.error('Error fetching salary months:', error);
          reject(error); // Reject the Promise if there's an error
        }
      );
    });
  }
  onActionAnable(month: any) {
    console.log('month ', month);
    this.getSalarySlip()
    const filteredMonths = this.months.filter(item => item.code === month);

    if (filteredMonths.length > 0) {
      console.log('Match found:', filteredMonths[0]);
      console.log("emp name:", filteredMonths[0].name);
      if (filteredMonths[0].runpayroll && filteredMonths[0].stopallowance) {
        console.log('action disable');
      } else {
        console.log('action anable');
      }
    } else {
      console.log('No match found.');
    }
  }
}
