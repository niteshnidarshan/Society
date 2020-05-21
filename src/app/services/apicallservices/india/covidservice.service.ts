import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CovidserviceService {

  constructor(private http: HttpClient) { }

  getCityList()
  {
    return this.http.get("https://api.covid19india.org/districts_daily.json");
  }
  getZones()
  {
    return this.http.get("https://api.covid19india.org/zones.json");
  }
  getStateRow()
  {
    return this.http.get("https://api.covid19india.org/states_daily.json");
  }
  getCountries()
  {
    return this.http.get("https://disease.sh/v2/countries/");
  }

}
