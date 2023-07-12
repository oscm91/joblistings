import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { JobService } from './shared/services/job.service';
import { JobModel } from './shared/models/job.model';
import { Component } from '@angular/core';

@Component({selector: 'joblistings-tag-container', template: ''})
class JobListingsTagContainerStubComponent {}

@Component({selector: 'joblistings-language', template: ''})
class JobListingsLanguageStubComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let jobService: JobService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let httpTestingController: HttpTestingController;

  const mockJobs: JobModel[] = [
    {
      id: 1,
      company: 'Test Company',
      logo: 'Test Logo',
      new: true,
      featured: true,
      position: 'Test Position',
      role: 'Frontend',
      level: 'Senior',
      postedAt: '1d ago',
      contract: 'Full Time',
      location: 'Remote',
      languages: ['JavaScript', 'React'],
      tools: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, JobListingsTagContainerStubComponent, JobListingsLanguageStubComponent],
      imports: [HttpClientTestingModule],
      providers: [JobService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    jobService = TestBed.inject(JobService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter jobs based on existing tags', () => {
    jest.spyOn(jobService, 'getAllJobs').mockReturnValue(of(mockJobs));

    component.ngOnInit();

    expect(component.JobsCopy).toEqual(mockJobs);
  });
});
