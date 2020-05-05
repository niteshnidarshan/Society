import { Component, OnInit} from '@angular/core';
import stateList from './json-files/state-list.json'; 
import { GovIndiaCityService } from '../services/apicallservices/gov-india-city.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  selectedState:string;
  states:any = stateList.states;
  districtList:any; 
  continentData:any;
  constructor(private continentService: GovIndiaCityService) { 
    
  }

  ngOnInit(): void {
  } 
  stateUpdate(stateName: HTMLInputElement){ 
    this.selectedState = (< HTMLInputElement > stateName).value;  
    for(var i=0; i<this.states.length; i++)
    {
      if(this.states[i].state === this.selectedState)
      {
        this.districtList = this.states[i].districts;
      }
    }
  }

  getContinentData(continent:string){
    this.continentService.getAllCitiesData(continent).subscribe(data=>{
      this.continentData = data;
    });
  }
}
