import { TestBed } from '@angular/core/testing';
import { CountryService } from './country.service';
describe('CountryService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CountryService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=country.service.spec.js.map