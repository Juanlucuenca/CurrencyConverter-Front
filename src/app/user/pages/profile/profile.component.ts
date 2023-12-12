import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/core/data/interfaces/UserProfile';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { AuthService } from 'src/app/core/services/auth-service.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  usrData!: UserProfile;
  userProfileEntries!: [string, any][];
  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.usrData = data;
        this.userProfileEntries = Object.entries(data);
        this.isAdmin = this.authService.isAdmin();
      },
    })
  }

  logout() {
    this.alertService.showSuccess('Session closed correctly', 'Success');
    this.authService.logout();
  }

}
