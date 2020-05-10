import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  getUser(empId:number)
  {
    //service to read data from json server
    if(empId==0)
    {
      return this.http.get("http://localhost:3000/emp"); 
    }
    else
    {
      return this.http.get("http://localhost:3000/emp/"+empId); 
      
    }
  }
  insertEmployeeService(empformdata: any)
  {
    //Service to post data to json server
    return this.http.post("http://localhost:3000/emp",empformdata);
    
  }
  updateEmployee(empdata: any)
  {
    //service to update specific data in json server by id
    return this.http.put("http://localhost:3000/emp/"+empdata.id, empdata); 
  }
  getEmpById(userId:any)
  {
    //service to read specific data from json server 
    return this.http.get("http://localhost:3000/emp/"+userId); 
  }
  deleteEmpById(userId: number)
  {
    return this.http.delete("http://localhost:3000/emp/"+userId);
  }
}

