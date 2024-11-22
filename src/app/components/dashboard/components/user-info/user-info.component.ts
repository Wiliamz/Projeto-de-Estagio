import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { LoginComponent } from '../../../login/login.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {
  userEmail: string | null | undefined;


  constructor(private authService: AuthService) { }


  ngOnInit(): void {

    this.userEmail = this.authService.getUserEmail();


  }
}
