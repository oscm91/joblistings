import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JobService } from './job.service';
import { JobModel } from '../models/job.model';

describe('JobService', () => {
  let service: JobService;
  let httpTestingController: HttpTestingController;
  const mockJobs: JobModel[] = [
    // Aquí puedes poner algunos trabajos de prueba
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobService],
    });

    service = TestBed.inject(JobService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all jobs', () => {
    service.getAllJobs().subscribe((jobs) => {
      expect(jobs).toEqual(mockJobs);
    });

    const req = httpTestingController.expectOne('assets/data.json');
    expect(req.request.method).toEqual('GET');
    req.flush(mockJobs);
  });

  it('should handle error when getting all jobs', () => {
    service.getAllJobs().subscribe(
      () => fail('should have failed with 500 error'),
      (error: any) => {
        expect(error.status).toEqual(500);
      }
    );

    const req = httpTestingController.expectOne('assets/data.json');
    req.flush('500 error', { status: 500, statusText: 'Server Error' });
  });
});
