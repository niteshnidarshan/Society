import { __decorate } from "tslib";
import { Component } from '@angular/core';
import stateList from './json-files/state-list.json';
let CountriesComponent = class CountriesComponent {
    constructor() {
        this.states = stateList.states;
    }
    ngOnInit() {
    }
    stateUpdate() {
        console.log("Jay Ram G ki");
        //stateList.array.forEach(element => {
        //if(element.state == state)
        //{
        //this.districtList = element;
        //}
        //});
    }
};
CountriesComponent = __decorate([
    Component({
        selector: 'app-countries',
        templateUrl: './countries.component.html',
        styleUrls: ['./countries.component.css']
    })
], CountriesComponent);
export { CountriesComponent };
//# sourceMappingURL=countries.component.js.map