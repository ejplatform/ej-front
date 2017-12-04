import { Component, Input, OnInit } from '@angular/core';

import { CommentService } from '../comments/shared/comment.service';
import { Comment } from '../comments/shared/comment.model';
import { Conversation } from '../models/conversation';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nudge',
  templateUrl: './nudge.component.html',
  styleUrls: ['./nudge.component.scss'],
  providers: [CommentService],

})
export class NudgeComponent implements OnInit {

  @Input() conversation: Conversation;
  message: string

  constructor(private commentService: CommentService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let comment = new Comment();
    comment.content = 'nudge comment body for test';
    // comment.title = 'nudge comment title for test';

    // FIXME call the correct service to get the nudge information
    const mockResponse = {anxious: true, remaining_comments: 4 };
    this.commentService.create(comment).subscribe((comment: Comment) => {
      this.checkNudge(mockResponse);
    }, (error) => {
      //FIXME remove this code when the correct endpoint be created
      this.checkNudge(mockResponse);
      console.log(error);
    });
  }

  checkNudge(response: any){
    if(response.anxious){
      this.message = 'Você já fez três comentários e nas próximas 24 horas não poderá fazer novos! Nossa sugestão é você esperar um pouco e acompanhar a conversa para poder comentar mais tarde. Enquanto isso vá opinando nos comentários que já estão na conversa, tem muita coisa interessante lá!';
    }else if(response.remaining_comments <= 0){
      this.message = 'Você já fez seus 6 comentários nessa conversa e não poderá comentar de novo. Agora é acompanhar a conversa e opinar nos comentários que já estão na conversa, tem muita coisa interessante lá!';
    }

  }

}
