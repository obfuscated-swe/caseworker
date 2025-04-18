import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform one GET request', () => {
    const mockData = { data: 'test' };
    service.get('/test').subscribe((data) => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('/test');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
