import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessCountComponent } from './access-count.component';

describe('AccessCountComponent', () => {
  let component: AccessCountComponent;
  let fixture: ComponentFixture<AccessCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
