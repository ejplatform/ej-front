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
    let vote = new Vote();
    vote.comment=comment.id
    vote.value=action;
    
    // Send the vote to the pushTogether backend
    return this.save(vote);
  }

  save(vote: Vote): Observable<Vote> {
    let fullEndpointUrl = `${environment.apiUrl}/api/votes/`;
    return this.http.post<Vote>(fullEndpointUrl, vote);
  }

}
