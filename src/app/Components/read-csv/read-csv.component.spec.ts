import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCSVComponent } from './read-csv.component';

describe('ReadCSVComponent', () => {
  let component: ReadCSVComponent;
  let fixture: ComponentFixture<ReadCSVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadCSVComponent]
    });
    fixture = TestBed.createComponent(ReadCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
