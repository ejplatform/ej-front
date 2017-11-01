import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Comment } from '../models/comment';
import { Vote } from '../models/vote';

@Injectable()
export class VoteService {

  constructor(private http: HttpClient) { }

  agree(comment: Comment): Observable<Vote> {
    let vote = new Vote();
    vote.comment=comment.id
    vote.value=Vote.AGREE;
    return this.save(vote);
  }

  disagree(comment: Comment): Observable<Vote> {
    let vote = new Vote();
    vote.comment=comment.id
    vote.value=Vote.DISAGREE;
    return this.save(vote);
  }

  pass(comment: Comment): Observable<Vote> {
    let vote = new Vote();
    vote.comment=comment.id
    vote.value=Vote.PASS;
    return this.save(vote);
  }

  save(vote: Vote): Observable<Vote> {
    let fullEndpointUrl = `${environment.apiUrl}/api/votes`;
    return this.http.post<Vote>(fullEndpointUrl, vote);
  }
}
