import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Comment } from '../comments/shared/comment.model';
import { Vote } from '../models/vote';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class VoteService {
  public profile: Profile;

  constructor(private http: HttpClient, private profileService: ProfileService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
  }

  agree(comment: Comment): Observable<Vote> {
    return this.vote(comment, Vote.AGREE);
  }

  disagree(comment: Comment): Observable<Vote> {
    return this.vote(comment, Vote.DISAGREE);
  }

  pass(comment: Comment): Observable<Vote> {
    return this.vote(comment, Vote.PASS);
  }

  private vote(comment: Comment, action: number): Observable<Vote> {
    const vote = new Vote();
    vote.comment = comment.id;
    vote.value = action;

    // Send the vote to the pushTogether backend
    return this.save(vote);
  }

  save(vote: Vote): Observable<Vote> {
    const fullEndpointUrl = `${environment.apiUrl}/api/votes/`;
    return this.http.post<Vote>(fullEndpointUrl, vote);
  }

}
