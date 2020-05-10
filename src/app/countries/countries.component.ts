import { Component, OnInit} from '@angular/core';
import stateList from './json-files/state-list.json'; 
import countries from './json-files/country-list.json'; 
import { GovIndiaCityService } from '../services/apicallservices/gov-india-city.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  selectedState:string;
  states:any;// = stateList.states;
  districtList:any; 
  continentData:any;
  countryList: any;// = countries[0]; 
  constructor(private continentService: GovIndiaCityService) { 
    
  }

  ngOnInit(): void {
    this.states = stateList.states;
    this.countryList = countries[0]; 
  } 
  stateUpdate(stateName: HTMLInputElement){ 
    //HTMLInputElement collects data of html attribute
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
