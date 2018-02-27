import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { BadgeService } from '../gamification/shared/badge.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  profile: Profile;

  @ViewChild('password') password;
  @ViewChild('passwordConfirmation') passwordConfirmation;


  @ViewChild('passwordErrors') passwordErrors;
  @ViewChild('passwordConfirmationErrors') passwordConfirmationErrors;
  @ViewChild('politicalMovementErrors') politicalMovementErrors;
  @ViewChild('biographyErrors') biographyErrors;
  @ViewChild('occupationErrors') occupationErrors;
  @ViewChild('raceErrors') raceErrors;
  @ViewChild('genderErrors') genderErrors;
  @ViewChild('countryErrors') countryErrors;
  @ViewChild('stateErrors') stateErrors;
  @ViewChild('cityErrors') cityErrors;
  @ViewChild('emailErrors') emailErrors;
  @ViewChild('nameErrors') nameErrors;

  genderOptions = [
    { id: 'FEMALE', name: 'Mulher' },
    { id: 'MALE', name: 'Homem' },
    { id: 'CIS_FEMALE', name: 'Mulher Cis' },
    { id: 'CIS_MALE', name: 'Homem Cis' },
    { id: 'AGENDER', name: 'Agênero'},
    { id: 'GENDERQUEER', name: 'Genderquer' },
    { id: 'GENDERFLUID', name: 'Gênero Fluído' },
    { id: 'NON-CONFORMIST_GENDER', name: 'Gênero Não-conformista' },
    { id: 'VARIANT_GENDER', name: 'Gênero Variante' },
    { id: 'INTERSEX', name: 'Intersex' },
    { id: 'NON-BINARY', name: 'Não-binário' },
    { id: 'TRANSGENDERED', name: 'Transgênero' },
    { id: 'PANGENDER', name: 'Pangênero' },
    { id: 'TRANSSEXUAL_WOMAN', name: 'Mulher Transexual' },
    { id: 'TRANSSEXUAL_MAN', name: 'Homem Transexual' },
    { id: 'TRANSFEMINAL', name: 'Transfeminino' },
    { id: 'TRANSMASCULINE', name: 'Transmasculino' },
    { id: 'DO_NOT_KNOW', name: 'Não sei' },
    { id: 'NONE', name: 'Nenhum' },
    { id: 'OTHER', name: 'Outro' },
  ];

  raceColorOptions = [
    { id: 'BLACK', name: 'Preta' },
    { id: 'BROWN', name: 'Parda' },
    { id: 'WHITE', name: 'Branca' },
    { id: 'YELLOW', name: 'Amarela' },
    { id: 'INDIGENOUS', name: 'Indíena' },
    { id: 'DO_NOT_KNOW', name: 'Não sei' },
    { id: 'UNDECLARED', name: 'Não declarada' },
  ];

  userBadges = [];

  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router,
    private toastService: ToastService, private badgeService: BadgeService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
    this.initializeFields(this.profile);
    this.selectBadges();
  }

  selectBadges() {
    this.badgeService.list().subscribe(badges => {
      const userBadges = [];
      badges.forEach(function (badge) {
        let userBadgeLevel = -1;
        badge.levels.forEach((level) => {
          if (level.user_has && level.level > userBadgeLevel) {
            userBadgeLevel = level.level;
          }
        });
        if (userBadgeLevel >= 0) {
          userBadges.push({ id: badge.slug, level: userBadgeLevel + 1 });
        }
      });
      this.userBadges = userBadges;
    }, error => {
      // handle request errors here
    });
  }

  save() {
    this.profileService.save(this.profile).subscribe(profile => {
      this.toastService.success({ title: 'profile.save.success.title', message: 'profile.save.success.message' });
      this.profileService.setProfile(profile);
      this.router.navigate(['profile']);

    }, error => {
      this.handleError(error);
      console.log(error);
    });
  }

  saveImage(file) {
    this.profile.imageFile = file;
    this.profileService.saveImage(this.profile).subscribe(profile => {
      this.toastService.success({ title: 'profile.save.image.success.title', message: 'profile.save.image.success.message' });
      this.profileService.setProfile(profile);
      this.router.navigate(['profile']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    const profile = <Profile>{};
    this.initializeFields(profile);
    this.profile = Object.assign(profile, this.profileService.getProfile());

  }

  changePassword() {
    this.profileService.changePassword(this.profile).subscribe(profile => {
      this.toastService.success({ title: 'profile.password.success.title', message: 'profile.password.success.message' });
      this.password.reset();
      this.passwordConfirmation.reset();

    }, error => {
      this.handleError(error);
      console.log(error);
    });
  }

  initializeFields(profile: Profile) {
    if (_.isNil(profile.gender)) {
      profile.gender = '';
    }
    if (_.isNil(profile.race)) {
      profile.race = '';
    }
    return profile;
  }

  handleError(error: any) {
    const errors = _.isObject(error.error) ? error.error : JSON.parse(error.error);

    this.passwordErrors.setErrors(errors['password']);
    this.passwordConfirmationErrors.setErrors(errors['new_password1']);
    this.passwordConfirmationErrors.setErrors(errors['new_password2']);

    this.politicalMovementErrors.setErrors(errors['political_movement']);
    this.biographyErrors.setErrors(errors['biography']);
    this.occupationErrors.setErrors(errors['occupation']);
    this.raceErrors.setErrors(errors['race']);
    this.genderErrors.setErrors(errors['gender']);
    this.countryErrors.setErrors(errors['country']);
    this.stateErrors.setErrors(errors['state']);
    this.cityErrors.setErrors(errors['city']);
    this.emailErrors.setErrors(errors['email']);
    this.nameErrors.setErrors(errors['name']);
    this.occupationErrors.setErrors(errors['non_field_errors']);
  }

}
