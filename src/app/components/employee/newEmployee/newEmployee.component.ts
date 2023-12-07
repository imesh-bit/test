import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { AllowanceService } from 'src/app/service/allowance-service/allowance.service';
import { BankService } from 'src/app/service/bank-service/bank.service';
import { DeductionService } from 'src/app/service/deduction-service/deduction.service';
import { DesignationService } from 'src/app/service/designation-service/designation.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { OccupationalGroupService } from 'src/app/service/occupational-service/occupationalGroup.service';
import { PositionService } from 'src/app/service/position-service/position.service';
import { WageboardService } from 'src/app/service/wageBoard-service/wageboard.service';
import Swal from 'sweetalert2';

interface LoadData {
  name: any;
  code: any;
}
@Component({
  selector: 'app-newEmployee',
  templateUrl: './newEmployee.component.html',
  styleUrls: ['./newEmployee.component.scss']
})
export class NewEmployeeComponent implements OnInit {


  date!: any;
  empcode?: any = 0;
  empid?: any = 0;
  titel!: any;
  initials!: any;
  surname!: any;
  empfullname!: any;
  empinitialname!: any;
  nic!: any;
  datebirth!: any;
  gender!: any;
  empaddress1!: any;
  empaddress2!: any;
  tele!: any;
  email!: any;
  dateappointment!: any;
  status!: any;
  probationenddate!: any;
  epfstartdate: any = '';
  categoryid!: any;
  typofemp!: any;
  division!: any;
  designation!: any;
  salarytyp: any = 'normal';
  epfno?: any;
  remarks!: any;
  active!: any;
  comcode: any = 'ABC';
  user!: any;
  imgfilename!: any;
  basicsalary!: any;
  budgetallowance1!: any;
  budgetallowance2!: any;
  allow1!: any; // Initialize with a default value of 0
  allow2!: any;
  allow3!: any;
  allow4!: any;
  allow5!: any;
  deduct1!: any; // Initialize with a default value of 0
  deduct2!: any;
  deduct3!: any;
  deduct4!: any;
  deduct5!: any;
  bankid1!: any;
  accno1!: any;
  amount1!: any;
  bankid2!: any;
  accno2!: any;
  amount2!: any;
  groupid: any;
  selectedFile: any;
  imageSrc!: any;
  epfAuto: any = false;




  totalNetSalary: any = 0;
  selectedOption: any;
  certName: any;
  selectedCert!: any; // Property to store the selected certificate
  certificateOptions: any[] = ['Certificate 1', 'Certificate 2', 'Certificate 3']; // Replace with your options
  wageBoardOption: LoadData[] = []; // Replace with your options
  designationOption: LoadData[] = []; // Replace with your options
  typeOfEmpOption: LoadData[] = []; // Replace with your options
  occupationOption: LoadData[] = []; // Replace with your options
  divisionOption: LoadData[] = []; // Replace with your options
  statusonOption: any[] = ['Permanent', 'Probation', 'Outsource', 'Contract', 'Trainee']; // Replace with your options
  paymentOption: LoadData[] = []; // Replace with your options
  titles: any[] = ['MR', 'MRS', 'MiSS', 'DR']
  genders: any[] = ['Male', 'Female']

  labelD1 = 'Deduction 1';
  labelD2 = 'Deduction 2';
  labelD3 = 'Deduction 3';
  labelD4 = 'Deduction 4';
  labelD5 = 'Deduction 5';

  labelA1 = 'Allowance 1';
  labelA2 = 'Allowance 2';
  labelA3 = 'Allowance 3';
  labelA4 = 'Allowance 4';
  labelA5 = 'Allowance 5';
  isLoading = false;

  filteredWages: Observable<any[]>;
  wageControl: FormControl<any>;
  filteredOccupational: Observable<any[]>;
  occupationalControl: FormControl<any>;
  filteredDivision: Observable<any[]>;
  divisionControl: FormControl<any>;
  filteredDesignation: Observable<any[]>;
  designationControl: FormControl<any>;
  filteredTypeOfEmp: Observable<any[]>;
  typeOfEmpControl: FormControl<any>;
  filteredBank: Observable<any[]>;
  bank1Control: FormControl<any>;
  filteredBank2: Observable<any[]>;
  bank2Control: FormControl<any>;
  checkAutoEpf: boolean = false;

  allow1_status?: boolean = false;
  allow2_status?: boolean = false;
  allow3_status?: boolean = false;
  allow4_status?: boolean = false;
  allow5_status?: boolean = false;

  constructor(private route: ActivatedRoute, private bankService: BankService, private occupationGroupService: OccupationalGroupService, private positionService: PositionService, private designationService: DesignationService, private wageBoardService: WageboardService, private router: Router, private employeeService: EmployeeService, private allowanceService: AllowanceService, private dedudctionService: DeductionService) {
    // this.selectedOption = this.availableOptions[0];
    this.wageControl = new FormControl();
    this.filteredWages = this.wageControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterWages(value))
    );
    this.occupationalControl = new FormControl();
    this.filteredOccupational = this.occupationalControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOccupational(value))
    );
    this.divisionControl = new FormControl();
    this.filteredDivision = this.divisionControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDivision(value))
    );
    this.designationControl = new FormControl();
    this.filteredDesignation = this.designationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDesignation(value))
    );
    this.typeOfEmpControl = new FormControl();
    this.filteredTypeOfEmp = this.typeOfEmpControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filtertypeofEmp(value))
    );
    this.bank1Control = new FormControl();
    this.filteredBank = this.bank1Control.valueChanges.pipe(
      startWith(''),
      map(value => this._filterBank(value))
    );
    this.bank2Control = new FormControl();
    this.filteredBank2 = this.bank2Control.valueChanges.pipe(
      startWith(''),
      map(value => this._filterBank(value))
    );
  }
  private _filterWages(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.wageBoardOption
      .filter(wage => wage.name.toLowerCase().includes(filterValue))
      .map(wage => wage.name);
  }
  private _filterOccupational(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.occupationOption
      .filter(ocuu => ocuu.name.toLowerCase().includes(filterValue))
      .map(ocuu => ocuu.name);
  }
  private _filterDivision(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.divisionOption
      .filter(divi => divi.name.toLowerCase().includes(filterValue))
      .map(divi => divi.name);
  }
  private _filterDesignation(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.designationOption
      .filter(desi => desi.name.toLowerCase().includes(filterValue))
      .map(desi => desi.name);
  }
  private _filtertypeofEmp(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.typeOfEmpOption
      .filter(emp => emp.name.toLowerCase().includes(filterValue))
      .map(emp => emp.name);
  }
  private _filterBank(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.paymentOption
      .filter(bank => bank.name.toLowerCase().includes(filterValue))
      .map(bank => bank.name);
  }

  valEmail = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]);

  getValidateEmail() {
    // if (this.valEmail.hasError('required')) {
    //   return 'Please enter a valid email.';
    // }
    if (this.valEmail.hasError('pattern')) {
      return true;
      this.showAlert('Invalid email format.', 'error', 'red')

    }
    return false;
  }

  teleFormat =/^(?:\+947|07)\d{8}$/;

  // Use Validators.pattern with the regex for validation
  teleFormControl = new FormControl('', [Validators.required, Validators.pattern(this.teleFormat)]);

  // Function to check telephone number validity
  isTeleValid(): boolean {
    if (this.teleFormControl.hasError('pattern')) {
      return true;

    }
    return false;
  }
  async ngOnInit() {
    //  const data = history.state.data;



    this.imageSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyuNFyw05KSucqjifL3PhDFrZLQh7QAS-DTw&usqp=CAU";
    this.getAllAllowances()
    this.getAllDeductions()
    this.getAllWage()
    await this.loadDataForSelectors();
    if (localStorage.getItem('systemId') && localStorage.getItem('systemId') !== '') {
      console.clear()

      console.log('systemId :', localStorage.getItem('systemId'));
      this.getEmpById(localStorage.getItem('systemId'))
    } else {

      console.log('systemId null :', localStorage.getItem('systemId'));

    }


    // const data = history.state.data;
    // if (data) {
    //   console.clear()
    //   console.table('element : ', data);
    // }

  }

  epfAutoSet() {
    if (this.epfAuto) {
      this.empcode = '<<Auto>>';
    } else {
      this.empcode = 0;

    }
  }
  setNetSalary() {

    // Calculate the total allowances
    const allowTot = [this.allow1, this.allow2, this.allow3, this.allow4, this.allow5]
      .filter(value => !isNaN(value))
      .reduce((total, value) => total + value, 0);

    // Calculate the total deductions
    const deducTot = [this.deduct1, this.deduct2, this.deduct3, this.deduct4, this.deduct5]
      .filter(value => !isNaN(value))
      .reduce((total, value) => total + value, 0);

    // Calculate the total net salary
    this.totalNetSalary = [
      this.basicsalary, this.budgetallowance1, this.budgetallowance2, allowTot
    ]
      .filter(value => !isNaN(value))
      .reduce((total, value) => total + value, 0) - deducTot;
    this.totalNetSalary = +this.totalNetSalary.toFixed(2);
    console.log("Allowance Total:", allowTot);
    console.log("Deduction Total:", deducTot);
    console.log("Total Net Salary:", this.totalNetSalary);

  }

  async loadDataForSelectors(): Promise<void> {
    try {
      const wageBoards = await this.wageBoardService.getwageboardList().toPromise();
      console.log(wageBoards);
      if (wageBoards) {


        this.wageBoardOption = wageBoards.map((data: any) => ({
          name: data.categoryname,
          code: data.categoryid,
        }));
        // this.showAlert('Wage Boards data loaded successfully!', 'success','green');

      } else {
        this.showAlert('Wage Boards data loaded UnSuccesFull!', 'error', 'red');
        window.location.reload();


      }


      const positions = await this.positionService.getPositionsList().toPromise();
      console.log(positions);
      if (positions) {


        this.divisionOption = positions.map((data: any) => ({
          name: data.division,
          code: data.id,
        }));


        // this.showAlert('Positions data loaded successfully!', 'success','green');
      } else {
        this.showAlert('Positions data loaded UnSuccesFull!', 'error', 'red');


      }


      const occupations = await this.occupationGroupService.getOccupationList().toPromise();
      console.log('occupation list', occupations);
      if (occupations) {


        this.occupationOption = occupations.map((data: any) => ({
          name: data.groupname,
          code: data.groupid,
        }));


        // this.showAlert('Occupations data loaded successfully!', 'success','green');
      } else {
        this.showAlert('Occupations data loaded UnSuccesFull!', 'error', 'red');


      }
      const designations = await this.designationService.getDesignationList().toPromise();
      console.table('designation list', designations);
      if (designations) {


        this.designationOption = designations.map((data: any) => ({
          name: data.designation,
          code: data.id,
        }));


        // this.showAlert('Designations data loaded successfully!', 'success','green');
      } else {
        this.showAlert('Designations data loaded UnSuccesFull!', 'error', 'red');


      }
      const bank = await this.bankService.getBankList().toPromise();
      console.log(bank);
      if (bank) {


        this.paymentOption = bank.map((data: any) => ({
          name: data.bankname + ' - ' + data.branchname,
          code: data.id,
        }));


        // this.showAlert('Bank data loaded successfully!', 'success','green');
      } else {
        this.showAlert('Bank data loaded UnSuccesFull!', 'error', 'red');


      }
      // this.getAllWage();
      return Promise.resolve();
    } catch (error) {
      // console.error("Error fetching data from loading selectors :", error);
      this.showAlert('Error loading data!', 'error', 'red');
      return Promise.reject();
    }
  }
  getEmpById(id: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {


      this.employeeService.getSelectedEmployee(id, this.comcode).subscribe(
        (data: any) => {
          console.clear()
          console.log('selected emp :', data[0]);
          if (data[0]) {

            this.accno1 = data[0].accno1;
            this.accno2 = data[0].accno2;
            this.active = data[0].active;
            this.allow1 = data[0].allow1;
            this.allow2 = data[0].allow2;
            this.allow3 = data[0].allow3;
            this.allow4 = data[0].allow4;
            this.allow5 = data[0].allow5;
            this.amount1 = data[0].amount1;
            this.amount2 = data[0].amount2;
            this.bank1Control.setValue(this.retrieveData('bank', data[0].bankid1))
            this.bank2Control.setValue(this.retrieveData('bank', data[0].bankid2))

            this.basicsalary = data[0].basicsalary;
            this.budgetallowance1 = data[0].budgetallowance1;
            this.budgetallowance2 = data[0].budgetallowance2;

            this.wageControl.setValue(this.retrieveData('wage', data[0].categoryid))
            this.comcode = data[0].comcode;
            this.convertDate('appoinment', data[0].dateappointment)

            this.convertDate('birth', data[0].datebirth);

            this.deduct1 = data[0].deduct1;
            this.deduct2 = data[0].deduct2;
            this.deduct3 = data[0].deduct3;
            this.deduct4 = data[0].deduct4;
            this.deduct5 = data[0].deduct5;
            // this.retrieveData('desig', data[0].designation)
            this.designationControl.setValue(data[0].designation)
            // this.retrieveData('divi', data[0].division)
            this.divisionControl.setValue(data[0].division)
            this.occupationalControl.setValue(this.retrieveData('occu', data[0].groupid))
            // this.division
            this.email = data[0].email;
            this.empaddress1 = data[0].empaddress;
            this.empcode = data[0].empcode;
            this.empfullname = data[0].empfullname;
            this.empid = data[0].empid;
            this.epfno = data[0].epfno;
            if (data[0].gender === 1) {
              this.gender = "Male"
            } else if (data[0].gender === 0) {
              this.gender = "Female"

            }
            this.groupid = data[0].groupid
            this.imgfilename = data[0].imgfilename;
            this.initials = data[0].initials;
            this.nic = data[0].nic;

            this.convertDate('probation', data[0].probationenddate)
            // this.probationenddate = new Date(year, month, day);
            // this.probationenddate = new Date(data[0].probationenddate);
            this.remarks = data[0].remarks;
            this.salarytyp = data[0].salarytyp;
            this.status = data[0].status;
            this.surname = data[0].surname;
            this.tele = data[0].tele;
            this.titel = data[0].titel;
            this.typeOfEmpControl.setValue(data[0].typofemp);
            this.user = data[0].user
            this.setNetSalary();
            if (this.empcode > 0) {
              this.checkAutoEpf = true;
            }
          }
          console.table(data[0]);
          localStorage.setItem('systemId', '')
          resolve();
        },
        (error: any) => {
          console.error("Error fetching locations:", error);
          reject();
        }
      );
    });
  }

  retrieveData(type: any, code: any): any {

    if (type === 'bank') {


      const match = this.paymentOption.find(item => item.code === code);
      console.log('match ', match);

      console.log("bank name : ", match ? match.name : '');

      return match ? match.name : '';
    }

    if (type === 'bankCode') {


      const match = this.paymentOption.find(item => item.name === code);
      console.log('match ', match);

      console.log("bank code : ", match ? match.code : '');

      return match ? match.code : '';
    }
    if (type === 'wage') {


      const match = this.wageBoardOption.find(item => item.code === code);
      console.log('match ', match);

      console.log("wage name : ", match ? match.name : '');

      return match ? match.name : '';
    }
    if (type === 'wageCode') {


      const match = this.wageBoardOption.find(item => item.name === code);
      console.log('match ', match);

      console.log("wage code : ", match ? match.code : '');

      return match ? match.code : '';
    }
    if (type === 'desig') {


      const match = this.designationOption.find(item => item.code === code);
      console.log('match ', match);

      console.log("designation name : ", match ? match.name : '');

      return match ? match.name : '';
    }
    if (type === 'occu') {


      const match = this.occupationOption.find(item => item.code === code);
      console.log('match ', match);

      console.log("occupation name : ", match ? match.name : '');

      return match ? match.name : '';
    }
    if (type === 'occuCode') {
      console.log('occuCode', code);


      const match = this.occupationOption.find(item => item.name === code);
      console.log('match ', match);

      console.log("occupation code : ", match ? match.code : '');

      return match ? match.code : '';
    }
    if (type === 'divi') {


      const match = this.divisionOption.find(item => item.code === code);
      console.log('match ', match);

      console.log("division name : ", match ? match.name : '');

      return match ? match.name : '';
    }
    return '';
  }

  convertDate(type: any, date: any) {
    const dateString = date;
    const dateParts = dateString.split('-');
    const year = +dateParts[2];
    const month = +dateParts[1] - 1;
    const day = +dateParts[0];
    if (type === 'probation') {
      this.probationenddate = new Date(year, month, day);

    }
    if (type === 'appoinment') {
      this.dateappointment = new Date(year, month, day);
    }
    if (type === 'birth') {
      this.datebirth = new Date(year, month, day);
    }
  }

  getAllWage(): Promise<void> {
    return new Promise<void>((resolve, reject) => {


      this.employeeService.getAllEmpTypeList(this.comcode).subscribe(
        (data: any) => {
          console.log(data);
          this.typeOfEmpOption = []
          this.typeOfEmpOption = data
            .map((data: any) => ({
              name: data.emptyp,
              code: data.id
            }));
          // console.table(this.wageBoardOption);

          resolve();
        },
        (error: any) => {
          console.error("Error fetching locations:", error);
          reject();
        }
      );
    });
  }
  // onRadioButtonClick(gender: any) {
  //   if (gender === 'male') {
  //     this.gender = 1;
  //   } else if (gender = 'female') {
  //     this.gender = 0;
  //   }
  //   console.log(this.gender);

  // }
  getAllAllowances(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        const data = this.route.snapshot.paramMap.get('data');

        if (data) {
          console.clear();
          console.table(data);
        }
        let reps = this.allowanceService.getAllowanceList();
        reps.subscribe((data: any) => {
          console.log('allowances list : ', data);
          console.log(data[0]);


          // if (data[0] != null) {
          //   if (data[0].allow1 != null || data[0].allow1 != '') {
          //     this.labelA1 = data[0].allow1
          //     this.allow1_status = data[0].allow1_status
          //   } else {
          //     this.labelA1 = "Allow 1";

          //   } if (data[0].allow2 != null || data[0].allow2 != '') {
          //     this.labelA2 = data[0].allow2
          //     this.allow2_status = data[0].allow2_status

          //   } else {
          //     this.labelA2 = "Allow 2";
          //   } if (data[0].allow3 != null || data[0].allow2 != '') {
          //     this.labelA3 = data[0].allow3
          //     this.allow3_status = data[0].allow3_status

          //   } else {
          //     this.labelA3 = "Allow 4";
          //   }
          //   if (data[0].allow4 != null || data[0].allow4 != '') {
          //     this.labelA4 = data[0].allow4
          //     this.allow4_status = data[0].allow4_status

          //   } else {
          //     this.labelA4 = "Allow 5";
          //   }
          //   if (data[0].allow5 != null || data[0].allow5 != "") {
          //     this.labelA5 = data[0].allow5
          //     this.allow5_status = data[0].allow5_status

          //   } else {
          //     this.labelA5 = "Allow 5"
          //   }
          // }
          if (data[0] !== null) {
            this.labelA1 = data[0].allow1 !== '' ? data[0].allow1 : 'Allow 1';
            this.allow1_status = data[0].allow1_status !== null ? data[0].allow1_status : false;

            this.labelA2 = data[0].allow2 !== '' ? data[0].allow2 : 'Allow 2';
            this.allow2_status = data[0].allow2_status !== null ? data[0].allow2_status : false;

            this.labelA3 = data[0].allow3 !== '' ? data[0].allow3 : 'Allow 3';
            this.allow3_status = data[0].allow3_status !== null ? data[0].allow3_status : false;

            this.labelA4 = data[0].allow4 !== '' ? data[0].allow4 : 'Allow 4';
            this.allow4_status = data[0].allow4_status !== null ? data[0].allow4_status : false;

            this.labelA5 = data[0].allow5 !== '' ? data[0].allow5 : 'Allow 5';
            this.allow5_status = data[0].allow5_status !== null ? data[0].allow5_status : false;
          }


        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  getAllDeductions(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        let reps = this.dedudctionService.getDeductionList();
        reps.subscribe((data: any) => {
          console.log('deduction list : ', data);
          console.log(data[0]);

          if (data[0] != null) {
            this.labelD1 = data[0].deduct1 !== null && data[0].deduct1 !== '' ? data[0].deduct1 : 'Deduct 1';

            this.labelD2 = data[0].deduct2 !== null && data[0].deduct2 !== '' ? data[0].deduct2 : 'Deduct 2';

            this.labelD3 = data[0].deduct3 !== null && data[0].deduct3 !== '' ? data[0].deduct3 : 'Deduct 3';

            this.labelD4 = data[0].deduct4 !== null && data[0].deduct4 !== '' ? data[0].deduct4 : 'Deduct 4';

            this.labelD5 = data[0].deduct5 !== null && data[0].deduct5 !== '' ? data[0].deduct5 : 'Deduct 5';
          }

        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as any;
    }
    reader.readAsDataURL(this.selectedFile);
  }
  uploadProfileImage(event: any) {
    const file = event.target.files[0]; // Get the selected file

    if (file && file.type.startsWith('image/')) {
      // Process the image upload here
      console.log('Image file selected:', file);
      // You can call a service or perform any other necessary actions to upload the image
    } else {
      // Handle the case where a non-image file is selected
      console.error('Invalid file type. Please select an image file.');
    }
  }


  cancelRegisterEmployee() {
    this.router.navigate(['home/employee']);
    localStorage.setItem('label', 'Employee Profile')

  }


  registerEmployee(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {


        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        let imageName;
        if (!this.selectedFile) {
          imageName = '';

        } else {
          imageName = this.selectedFile.name;

        }

        if (formattedDate == null) {
          alert("formattedDate is null");
          return;
        }
        if (this.empfullname == null) {

          this.showAlert("Fill Employee Full Name Field", 'error', 'red')
          return;
        }
        if (this.titel == null) {
          this.showAlert("Select a Title", 'error', 'red')

          return;
        }

        if (this.initials == null) {
          this.showAlert("Fill Initials Field", 'error', 'red')

          return;
        }

        if (this.surname == null) {
          this.showAlert("Fill Surname Field", '', 'red')

          return;
        }
        if (this.gender == null) {
          this.showAlert("Select a Gender ", '', 'red')

          return;
        }

        if (this.empaddress1 == null) {
          this.showAlert("Fill Address Field", '', 'red')

          return;
        }
        if (this.nic == null) {
          this.showAlert("Fill NIC Field", '', 'red')

          return;
        }

        if (this.datebirth == null) {
          this.showAlert("Select a Date OF Birth ", '', 'red')
          return;
        }





        if (this.tele == null) {
          this.showAlert("Fill Tel No Field", '', 'red')
          return;
        } else if (this.isTeleValid()) {
          this.showAlert("Invalid Tel No Format", '', 'red')
          return;
        }

        if (this.email == null) {
          this.showAlert("Fill Email Field", '', 'red')
          return;
        } else if (this.getValidateEmail()) {
          this.showAlert("Invalid Email Format", '', 'red')
          return;
        }





        if (!this.wageControl.value) {
          this.showAlert("Select a Wage ", '', 'red')

          return;
        } else {

          this.categoryid = this.retrieveData('wageCode', this.wageControl.value)
          console.log('wage code ', this.categoryid);
        }
        if (!this.occupationalControl.value) {
          this.showAlert("Select a Occupation ", '', 'red')

          return;
        } else {

          this.groupid = this.retrieveData('occuCode', this.occupationalControl.value)
          console.log('Occupation code ', this.groupid);
        }

        // if (this.groupid == null) {
        //   this.showAlert("Select a Occupation ", '', 'red')

        //   return;
        // }


        if (!this.typeOfEmpControl.value) {
          this.showAlert("Select a Type Of Employee ", '', 'red')
          return;
        } else {
          this.typofemp = this.typeOfEmpControl.value
          console.log('typofemp code ', this.typofemp);

        }
        if (!this.designationControl.value) {
          this.showAlert("Select a Type Of Designation ", '', 'red')
          return;
        } else {
          this.designation = this.designationControl.value
          console.log('Designation code ', this.designation);

        }
        // if (this.designation == null) {
        //   this.showAlert("Select a Designation ", '', 'red')

        //   return;
        // }
        if (!this.divisionControl.value) {
          this.showAlert("Select a Type Of Division ", '', 'red')
          return;
        } else {
          this.division = this.divisionControl.value
          console.log('Division code ', this.division);

        }
        // if (this.division == null) {
        //   this.showAlert("Select a Division ", '', 'red')

        //   return;
        // }


        if (this.status == null) {
          this.showAlert("Select a Satus ", '', 'red')
          return;
        }

        if (this.dateappointment == null) {
          this.showAlert("Select a Appoinment Date   ", '', 'red')
          return;
        }

        if (this.probationenddate == null) {
          this.showAlert("Select a Probation End Date ", '', 'red')
          return;
        }
        if (this.salarytyp == null) {
          this.showAlert("Salary Type Null ", '', 'red')

          return;
        }

        if (this.basicsalary == null) {
          this.showAlert("Fill Basic Salary Field", '', 'red')
          return;
        }

        if (this.budgetallowance1 == null) {
          this.showAlert("Fill Budgetary Allownce 1 Field", '', 'red')
          return;
        }

        if (this.budgetallowance2 == null) {
          this.showAlert("Fill Budgetary Allownce 2 Field", '', 'red')
          return;
        }

        // if (this.epfno == null) {
        //   this.showAlert("Fill EPF No  ", '', 'red')

        //   return;
        // }
        if (this.empcode === '<<Auto>>' || this.epfAuto) {
          this.epfAuto = true;
          this.empcode = 0;
        } else {
          this.epfAuto = false;
        }
        let employee = {}

        if (this.bank1Control.value || this.bank2Control.value) {
          if (this.bank1Control.value && this.bank2Control.value) {
            this.bankid1 = this.retrieveData('bankCode', this.bank1Control.value)
            this.bankid2 = this.retrieveData('bankCode', this.bank2Control.value)
            if (this.totalNetSalary > (this.amount1 + this.amount2) && this.totalNetSalary != (this.amount1 + this.amount2)) {
              if ((this.amount1 !== 0 && this.amount2 == 0) || (this.amount1 == 0 && this.amount2 !== 0)) {
                if (this.accno1 && this.accno2) {
                  employee = {
                    epfauto: this.epfAuto,
                    empid: this.empid,
                    date: formattedDate,
                    empcode: this.empcode,
                    titel: this.titel,
                    initials: this.initials,
                    surname: this.surname,
                    empfullname: this.empfullname,
                    empinitialname: this.initials + ' ' + this.surname,
                    nic: this.nic,
                    datebirth: this.datebirth,
                    gender: this.gender,
                    empaddress: this.empaddress1,
                    tele: this.tele,
                    email: this.email,
                    status: this.status,
                    dateappointment: this.dateappointment,
                    probationenddate: this.probationenddate,
                    groupid: this.groupid,
                    categoryid: this.categoryid,
                    typofemp: this.typofemp,
                    division: this.division,
                    designation: this.designation,
                    salarytyp: this.salarytyp,
                    basicsalary: this.basicsalary,
                    budgetallowance1: this.budgetallowance1,
                    budgetallowance2: this.budgetallowance2,
                    allow1: this.allow1,
                    allow2: this.allow2,
                    allow3: this.allow3,
                    allow4: this.allow4,
                    allow5: this.allow5,
                    deduct1: this.deduct1,
                    deduct2: this.deduct2,
                    deduct3: this.deduct3,
                    deduct4: this.deduct4,
                    deduct5: this.deduct5,
                    epfno: this.epfno,
                    remarks: this.remarks,
                    active: 1,
                    comcode: this.comcode,
                    user: '',
                    imgfilename: imageName,
                    bankid1: this.bankid1,
                    accno1: this.accno1,
                    amount1: this.amount1,
                    bankid2: this.bankid2,
                    accno2: this.accno2,
                    amount2: this.amount2
                  };
                  console.table(employee);

                  let resp = this.employeeService.saveEmployeeProfile(employee);
                  resp.subscribe((data: any) => {
                    console.log(data);
                    if (data.type === 'sucess') {
                      this.showAlert(data.message, '', 'green')
                      this.clearForm()
                      this.router.navigate(['home/employee']);

                    }
                    else {
                      this.showAlert(data.message, '', 'red')

                    }

                  })
                } else {
                  this.showAlert("Account Numbers are Empty ", '', 'red')
                  return;
                }

              } else {
                this.showAlert("Both amounts are could not be zero ", '', 'red')
                return;
              }
            } else {
              this.showAlert("Amount is Larger Than Net Salary or Colud not be Equal With Net Salary", '', 'red')
              return;
            }
          } else {
            if (this.bank1Control.value && this.amount1 == 0 && this.accno1) {
              this.bankid1 = this.retrieveData('bankCode', this.bank1Control.value)
              this.bankid2 = 0;

              employee = {
                epfauto: this.epfAuto,
                empid: this.empid,
                date: formattedDate,
                empcode: this.empcode,
                titel: this.titel,
                initials: this.initials,
                surname: this.surname,
                empfullname: this.empfullname,
                empinitialname: this.initials + ' ' + this.surname,
                nic: this.nic,
                datebirth: this.datebirth,
                gender: this.gender,
                empaddress: this.empaddress1,
                tele: this.tele,
                email: this.email,
                status: this.status,
                dateappointment: this.dateappointment,
                probationenddate: this.probationenddate,
                groupid: this.groupid,
                categoryid: this.categoryid,
                typofemp: this.typofemp,
                division: this.division,
                designation: this.designation,
                salarytyp: this.salarytyp,
                basicsalary: this.basicsalary,
                budgetallowance1: this.budgetallowance1,
                budgetallowance2: this.budgetallowance2,
                allow1: this.allow1,
                allow2: this.allow2,
                allow3: this.allow3,
                allow4: this.allow4,
                allow5: this.allow5,
                deduct1: this.deduct1,
                deduct2: this.deduct2,
                deduct3: this.deduct3,
                deduct4: this.deduct4,
                deduct5: this.deduct5,
                epfno: this.epfno,
                remarks: this.remarks,
                active: 1,
                comcode: this.comcode,
                user: '',
                imgfilename: imageName,
                bankid1: this.bankid1,
                accno1: this.accno1,
                amount1: this.amount1,
                bankid2: this.bankid2,
                accno2: this.accno2,
                amount2: this.amount2
              };
              console.table(employee);

              let resp = this.employeeService.saveEmployeeProfile(employee);
              resp.subscribe((data: any) => {
                console.log(data);
                if (data.type === 'sucess') {
                  this.showAlert(data.message, '', 'green')
                  this.clearForm()
                  this.router.navigate(['home/employee']);

                }
                else {
                  this.showAlert(data.message, '', 'red')

                }

              })
            } else if (this.bank2Control && this.amount2 == 0 && this.accno2) {
              this.bankid1 = 0;
              this.bankid2 = this.retrieveData('bankCode', this.bank2Control.value)

              employee = {
                epfauto: this.epfAuto,
                empid: this.empid,
                date: formattedDate,
                empcode: this.empcode,
                titel: this.titel,
                initials: this.initials,
                surname: this.surname,
                empfullname: this.empfullname,
                empinitialname: this.initials + ' ' + this.surname,
                nic: this.nic,
                datebirth: this.datebirth,
                gender: this.gender,
                empaddress: this.empaddress1,
                tele: this.tele,
                email: this.email,
                status: this.status,
                dateappointment: this.dateappointment,
                probationenddate: this.probationenddate,
                groupid: this.groupid,
                categoryid: this.categoryid,
                typofemp: this.typofemp,
                division: this.division,
                designation: this.designation,
                salarytyp: this.salarytyp,
                basicsalary: this.basicsalary,
                budgetallowance1: this.budgetallowance1,
                budgetallowance2: this.budgetallowance2,
                allow1: this.allow1,
                allow2: this.allow2,
                allow3: this.allow3,
                allow4: this.allow4,
                allow5: this.allow5,
                deduct1: this.deduct1,
                deduct2: this.deduct2,
                deduct3: this.deduct3,
                deduct4: this.deduct4,
                deduct5: this.deduct5,
                epfno: this.epfno,
                remarks: this.remarks,
                active: 1,
                comcode: this.comcode,
                user: '',
                imgfilename: imageName,
                bankid1: this.bankid1,
                accno1: this.accno1,
                amount1: this.amount1,
                bankid2: this.bankid2,
                accno2: this.accno2,
                amount2: this.amount2
              };
              console.table(employee);

              let resp = this.employeeService.saveEmployeeProfile(employee);
              resp.subscribe((data: any) => {
                console.log(data);
                if (data.type === 'sucess') {
                  this.showAlert(data.message, '', 'green')
                  this.clearForm()
                  this.router.navigate(['home/employee']);

                }
                else {
                  this.showAlert(data.message, '', 'red')

                }

              })
            } else {
              this.showAlert("Fill at least one Bank Details", '', 'red')
              return;
            }
          }



        } else {
          this.showAlert("Select at least one Bank ", '', 'red')
          return;
        }




        Promise.resolve();

      } catch (error) {
        console.error('Error during employee registration:', error);
        this.showAlert('Error during employee registration:', 'error', 'red')
        // Reject the promise with an error to notify the caller
        return reject(error);
      }

    })

  }
  showAlert(massage: any, type: any, color: any) {
    Swal.fire({

      text: massage,
      position: 'top-right',
      heightAuto: true,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1500,
      width: 'auto',
      color: color,
      // icon: type,
      // customClass: {
      //   container: 'custom-alert-container',
      //   icon: 'custom-alert-icon',
      // },
      // backdrop:''

    });

  }

  clearForm() {
    // this.epfAuto = null;
    // this.empid = null;
    // // Set other properties to null or appropriate initial values
    // this.date = null;
    // this.empcode = null;
    // this.titel = null;
    // this.initials = null;
    // this.surname = null;
    // this.empfullname = null;
    // this.nic = null;
    // this.datebirth = null;
    // this.gender = null;
    // this.empaddress1 = null;
    // this.tele = null;
    // this.email = null;
    // this.status = null;
    // this.dateappointment = null;
    // this.probationenddate = null;
    // this.groupid = null;
    // this.categoryid = null;
    // this.typofemp = null;
    // this.division = null;
    // this.designation = null;
    // this.salarytyp = null;
    // this.basicsalary = null;
    // this.budgetallowance1 = null;
    // this.budgetallowance2 = null;
    // this.allow1 = null;
    // this.allow2 = null;
    // this.allow3 = null;
    // this.allow4 = null;
    // this.allow5 = null;
    // this.deduct1 = null;
    // this.deduct2 = null;
    // this.deduct3 = null;
    // this.deduct4 = null;
    // this.deduct5 = null;
    // this.epfno = null;
    // this.remarks = null;
    // this.comcode = null;
    // this.bankid1 = null;
    // this.accno1 = null;
    // this.amount1 = null;
    // this.bankid2 = null;
    // this.accno2 = null;
    // this.amount2 = null;
    window.location.reload();
  }

}
