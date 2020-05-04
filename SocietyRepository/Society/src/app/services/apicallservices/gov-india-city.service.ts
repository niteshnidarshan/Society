import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GovIndiaCityService {

  constructor(private httpAjaxApiCall: HttpClient) { }
  getAllCitiesData(continent:string)
  {
    //return details of all the related countries within the continent
    //API - https://restcountries.eu/rest/v2/region/{continent_name}
    return this.httpAjaxApiCall.get("https://restcountries.eu/rest/v2/region/"+continent);
  }
}
