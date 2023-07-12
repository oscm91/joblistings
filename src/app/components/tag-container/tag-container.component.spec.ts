import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { JobService } from 'src/app/shared/services/job.service';
import { TagContainerComponent } from './tag-container.component';

describe('TagContainerComponent', () => {
  let component: TagContainerComponent;
  let fixture: ComponentFixture<TagContainerComponent>;
  let jobService: JobService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagContainerComponent],
      providers: [
        {
          provide: JobService,
          useValue: {
            languageSelected: of('JavaScript'),
            existingTags: { next: jest.fn() },
            clearedTags: { next: jest.fn() },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TagContainerComponent);
    component = fixture.componentInstance;
    jobService = TestBed.inject(JobService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new tag on init', () => {
    component.ngOnInit();
    expect(component.currentTags).toContain('JavaScript');
  });

  it('should remove a tag', () => {
    component.currentTags = ['JavaScript', 'TypeScript'];
    component.removeFromTag(0);
    expect(component.currentTags).not.toContain('JavaScript');
  });

  it('should clear all tags', () => {
    component.currentTags = ['JavaScript', 'TypeScript'];
    component.clearTags();
    expect(component.currentTags.length).toBe(0);
  });
});
