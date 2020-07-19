import { Component, OnInit } from '@angular/core';
import { CovidserviceService } from '../services/apicallservices/india/covidservice.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  worldData: any;

  constructor(private worldService: CovidserviceService) { }

  ngOnInit(): void {
    this.getWorldData();
  }
  getCountry(selectedCountry: HTMLInputElement)
  {
    var country = (< HTMLInputElement > selectedCountry).value; 
  }

  getWorldData()
  {
    this.worldService.getCountries().subscribe(result => {
      this.worldData = result;
      this.fsortResults("cases",false);
    });
  }

  //JSON sorting
  fsortResults(prop, asc) {
    this.worldData.sort((a, b)=> {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    //renderResults();
}


}
