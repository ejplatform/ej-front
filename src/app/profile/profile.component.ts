import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  
  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router) {

    this.profile = this.profileService.getProfile();
    console.log(this.profile);
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnInit() {
  }

  save() {
    // public onSubmit(empForm: any, event: Event) {
      // event.preventDefault();
    this.profileService.save(this.profile).subscribe( profile => {
        // this.router.navigate(['/']);
        // this.notificationService.success({ title: "account.register.success.title", message: "account.register.success.message" });
        console.log('Profile saved');
        // this.router.navigate(['/profile']);
        this.router.navigate(['profile']);
        // return false;
      }, error => {
        console.log('Something wrong happened...');
      });
      // return false;
  }

}
