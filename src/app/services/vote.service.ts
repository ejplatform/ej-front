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

  // Send data to the polis URL
  polisSave(vote: number, commentId: number, conversationId: string, profileId: number) {
    const fullEndpointUrl = `https://polis.brasilqueopovoquer.org.br/api/v3/votes`;

    const data = {
      'vote': vote,
      'tid': commentId,
      'pid': 'mypid',
      'conversation_id': conversationId,
      'agid': 1,
      'xid': String(profileId),
    };

    return this.http.post(fullEndpointUrl, data);
  }


  private vote(comment: Comment, action: number): Observable<Vote> {
    const vote = new Vote();
    vote.comment = comment.id;
    vote.value = action;

    let votePolisValue;
    switch (action) {
      case Vote.AGREE: {
        votePolisValue = -1;
        break;
      }
      case Vote.DISAGREE: {
        votePolisValue = 1;
        break;
      }
      default: {
        votePolisValue = 0;
        break;
      }
    }
    this.polisSave(votePolisValue, comment.polis_id, comment.conversationObj.polis_slug, this.profile.id).subscribe();

    // Send the vote to the pushTogether backend
    return this.save(vote);
  }

  save(vote: Vote): Observable<Vote> {
    const fullEndpointUrl = `${environment.apiUrl}/api/votes/`;
    return this.http.post<Vote>(fullEndpointUrl, vote);
  }

}
