import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMainContentComponent } from './project-main-content.component';

describe('ProjectMainContentComponent', () => {
  let component: ProjectMainContentComponent;
  let fixture: ComponentFixture<ProjectMainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMainContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
