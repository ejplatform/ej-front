import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Comment } from '../comments/shared/comment.model';
import { Vote } from '../models/vote';

@Injectable()
export class VoteService {

  constructor(private http: HttpClient) { }

  agree(comment: Comment): Observable<Vote> {
    let vote = new Vote();
    vote.comment=comment.id
    vote.value=Vote.AGREE;

    // Send the vote to the pushTogether backend
    return this.save(vote);
  }

  disagree(comment: Comment): Observable<Vote> {
    let vote = new Vote();
    vote.comment=comment.id
    vote.value=Vote.DISAGREE;

    // Send the vote to the pushTogether backend
    return this.save(vote);
  }

  pass(comment: Comment): Observable<Vote> {
    let vote = new Vote();
    vote.comment=comment.id
    vote.value=Vote.PASS;

    // Send the vote to the pushTogether backend
    return this.save(vote);
  }

  save(vote: Vote): Observable<Vote> {
    let fullEndpointUrl = `${environment.apiUrl}/api/votes/`;
    return this.http.post<Vote>(fullEndpointUrl, vote);
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
}
