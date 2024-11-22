import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTokenComponent } from './notification-token.component';

describe('NotificationTokenComponent', () => {
  let component: NotificationTokenComponent;
  let fixture: ComponentFixture<NotificationTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationTokenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
