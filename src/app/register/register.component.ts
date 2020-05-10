import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/employee/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formdata: any;
  emplist: any;
  updateemp: any;
  id: any;
  ename: string;
  salary: any;
  register_update_btn: string = "Register";

  constructor(private reg: RegisterService) { }

  ngOnInit(): void {
      this.getEmployee(0); //To show data grid onload
  }
  clearFields()
  {
    this.register_update_btn  = "Register";
    this.id = '';
    this.ename= '';
    this.salary='';
    this.getEmployee(0);
  }
  getEmployee(empID: number)
  {
    // service call to get db data
    // if empID == 0, means all record else a particular record
    this.reg.getUser(empID).subscribe(res=>{
      this.emplist=res;
      if(empID!=0)
      {
        this.id = this.emplist.id;
        this.ename = this.emplist.ename;
        this.salary = this.emplist.salary;
        this.updateRow(this.id);
      }
    });
  }
  insertEmployee()
  {
    if(this.id==undefined || this.id < 1)
    {
      alert("enter valid ID");
      return;
    }
    if(this.register_update_btn == "Update")
    { 
      // Update the existing selected record
      // If user selects 'Register' button after 'update' from data grid, Register will acts like an 'Update'
      this.register_update_btn = "Register";

      this.updateemp = {id:this.id, ename:this.ename, salary:this.salary};
      this.reg.updateEmployee(this.updateemp).subscribe(result=>{
        this.getEmployee(0); //To reload updated data grid
      });
      success => alert("Done!");
    }
    else
    {
      //Register a new record
      this.formdata = {id:this.id, ename:this.ename, salary:this.salary};
      this.reg.insertEmployeeService(this.formdata).subscribe(res=>{
        this.getEmployee(0); //To reload updated data grid
      });
    }
  } 
  updateRow(userId:number)
  {
    //selected record value population
    this.register_update_btn = "Update";
    this.id=userId;
    this.getEmployeeById(this.id);
  }
  deleteRow(userId:number)
  { 
    //To delete the selected record.
    this.reg.deleteEmpById(userId).subscribe(res=>{
      this.getEmployee(0); //To reload updated data grid
    });
  }
  searchEmployee()
  {
    // To search a particular id record
    this.getEmployee(this.id);
  }
  getEmployeeById(userId:number)
  {
      this.reg.getEmpById(userId).subscribe(res=>{
        this.emplist  = res;
        this.id       = this.emplist.id;
        this.ename    = this.emplist.ename;
        this.salary   = this.emplist.salary;
      });
  }
}
