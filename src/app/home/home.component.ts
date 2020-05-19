import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { CovidserviceService } from '../services/apicallservices/india/covidservice.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import * as CanvasJS from './canvasjs.min.js';
import * as CanvasToggleJS from './togglechart.js';
//var CanvasJS = require('./canvasjs.min');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cityStatus: any; //Helping variable dependent to stateList
  stateList: any; //Contains all live data in JSON
  states: any; //contains all the state names
  districts: any; //contains all the district names
  districtResponse: any; //To send response over requested district
  districtZone: any;
  selectedDistrictZone: any;
  selectedDistrict: string;
  stateDataRow: any;
  stateData: any[];
  datepipe: DatePipe = new DatePipe('en-US');
  District: any;
  incremented: number;
  constructor(private cityService: CovidserviceService) { }

  ngOnInit(): void {
    this.getCityStatus();
    this.getZones();
    this.getStateDataRow();
  }
  districtMethod(events) {
    //If user press enter key
    var district = (< HTMLInputElement > events).value; 

    //To capitalize first char on enter key event
    if (!district) {
      district = '';
    } else {
      district =  district.replace(/\b\w/g, first => first.toLocaleUpperCase()) 
    } 

    this.selectedDistrict = district;
    this.getDistrictData(this.selectedDistrict);
    //if (event.keyCode === 13) {
      //alert('you just pressed the enter key'+events);
      // rest of your code
    //}
  }

  getCityStatus()
  {
    //This method calls to load data from source API at the time of loading.

    this.cityService.getCityList().subscribe(result => {
      this.cityStatus = result;
      this.stateList = this.cityStatus.districtsDaily;

      var st=[]; //To store states
      var dist=[]; //To store districts

      //collecting state names
      for (var key in this.stateList) {
        if (this.stateList.hasOwnProperty(key)) {
          //key = states names
          st.push(key.toString());
        }
      }
      //collecting district names
      for(var d in st)
      {
        for (var key in this.stateList[st[d]]) {
          if (this.stateList[st[d]].hasOwnProperty(key)) {
            //key = dist names 
            dist.push(key.toString());
          }
        }
      }
      this.states = st; //collecting states
      this.districts = dist; //collection districts
    });
     
  }

  getDataForDistrict(selectedCity: HTMLInputElement)
  {
    // If user selects value from data list drop down
    var district = (< HTMLInputElement > selectedCity).value; 
    this.selectedDistrict = district;
    this.getDistrictData(this.selectedDistrict);
  }

  getDistrictData(district: string)
  {
    this.districtResponse = this.lookup(this.stateList,district)[1];

    this.getZoneDetails(district);
    
    // Sending current date record only
    this.districtResponse = this.districtResponse;
    
    //this.getChart(this.districtResponse,this.selectedDistrictZone.zone); //type: "bar"/ line/ column 
    this.getLineChart(this.districtResponse, this.selectedDistrict)
    this.incremented = this.districtResponse[this.districtResponse.length-1].active - this.districtResponse[this.districtResponse.length-2].active;
    
    return (this.districtResponse[0]); 
  }

  getZones()
  {
    this.cityService.getZones().subscribe(res => {
      this.districtZone = res;
    });

  }

  getZoneDetails(district: string)
  {
      for(let i = 0; i<this.districtZone.zones.length; i++)
      {
        if(this.districtZone.zones[i].district === district)
        {
          this.selectedDistrictZone = this.districtZone.zones[i];
          //alert(this.selectedDistrictZone.lastupdated);
          //alert(this.datepipe.transform(this.selectedDistrictZone.lastupdated,'dd-MMM-yy'));
          //this.getStateData(district, this.selectedDistrictZone.statecode, this.datepipe.transform(this.selectedDistrictZone.lastupdated,'dd-MMM-yy'));
        }
      }
  }

  getStateDataRow()
  {
    this.cityService.getStateRow().subscribe(res => {
      this.stateDataRow = res;
    });
  }

  getStateData(district, stateCd, lastUpdateDate)
  {
    for(let i = 0; i<this.stateDataRow.states_daily.length; i++)
    {
      if(this.stateDataRow.states_daily[i].date === lastUpdateDate)
      {
        this.stateData.push({
          status: this.stateDataRow.states_daily[i].status,
          number: this.stateDataRow.states_daily[i].stateCd
        });
        //this.stateData = this.stateDataRow.states_daily[i];
        //alert(JSON.stringify(this.selectedDistrictZone.statecode));
        //this.getStateData(district, this.selectedDistrictZone.statecode, this.datepipe.transform(this.selectedDistrictZone.lastupdated,'dd-MMM-yy'));
      }
    }
  }

  /***
   * 
   * lookup(obj, k) travers whole JSON to find key
   * 
   *  obj = source JSON object
   *  k   = key string what you want to search
   * 
   */
  lookup(obj, k) {
    //Can travers any JSON object
    for (let key in obj) {
  
      let value = obj[key];
      if (k == key) return [k, value];
  
      if (typeof value === "object") {
        var y = this.lookup(value, k);
        if (y && y[0] == k) return y;
      }
      if (Array.isArray(value)) {
        // for..in doesn't work the way you want on arrays in some browsers
        //
        for (var i = 0; i < value.length; ++i) {
          var x = this.lookup(value[i], k);
          if (x && x[0] == k) return x;
        }
      }
    }
  
    return null;
  }
  getChart(dataJson, zoneColor)
  {
    //var rowValues: any;
    
    /*------Start to integrate row data to chart----------*/
    var myData = [];
    dataJson.forEach(element => {
      myData.push({
        y: element.active,
        label: element.date
      });
    });
    /*------End to integrate row data to chart----------*/

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      axisX:{
        interval: 1
      },
      axisY2:{
        interlacedColor: "rgba(1,77,101,.2)",
        gridColor: "rgba(1,77,101,.1)",
        title: "Number of active cases"
      },
      data: [{
        type: "column",
        name: "active",
		    axisYType: "secondary",
		    color: zoneColor,
        dataPoints: myData
      }]
    });
    chart.render();
    }
  getLineChart(dataJson, selectedCity)
  {
    /*------Start to integrate row data to chart----------*/
    var activeData = [];
    var recoveredData = [];
    dataJson.forEach(element => {
      activeData.push({
        y: element.active,
        x: new Date(element.date)
      });
      recoveredData.push({
        y: element.recovered,
        x: new Date(element.date)
      });
    });
    /*------End to integrate row data to chart----------*/

    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title:{
        text: "COVID-19 Traffic in "+selectedCity
      },
      axisX:{
        valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Number of patients",
        crosshair: {
          enabled: true
        }
      },
      toolTip:{
        shared:true
      },  
      legend:{
        cursor:"pointer",
        verticalAlign: "top",
        horizontalAlign: "left",
        dockInsidePlotArea: true,
        itemclick: CanvasToggleJS.toogleDataSeries
      },
      data: [{
        type: "line",
        showInLegend: true,
        name: "Active",
        markerType: "square",
        xValueFormatString: "DD MMM, YYYY",
        color: "#F08080",
        dataPoints: activeData
      },
      {
        type: "line",
        showInLegend: true,
        name: "Recovered",
        lineDashType: "dash",
        dataPoints: recoveredData
      }]
    });
    chart.render();
  }

}
