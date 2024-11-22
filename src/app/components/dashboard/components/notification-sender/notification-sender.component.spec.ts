import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSenderComponent } from './notification-sender.component';

describe('NotificationComponent', () => {
  let component: NotificationSenderComponent;
  let fixture: ComponentFixture<NotificationSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationSenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
