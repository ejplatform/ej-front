import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
// import { environment } from '../../environments/environment';

// import { ConversationService } from '../services/conversation.service';
// import { Conversation } from '../models/conversation';
// import { Profile } from '../models/profile';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {

  pageTitle: String;
  pageContent: String;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let path = this.route.snapshot.url.map(p => p.path).join('/');
    if (path === 'sobre-nos') {
      this.pageTitle = 'Sobre nós';
      this.pageContent = 'Nós somos...';
    } else if (path === 'perguntas-frequentes') {
      this.pageTitle = 'Perguntas frequentes';
      this.pageContent = 'Perguntas mais realizadas...';
    } else if (path === 'termos-de-uso') {
      this.pageTitle = 'Termos de uso';
      this.pageContent = 'Esta página só será utilizada...';
    } else if (path === 'rocket') {
      this.pageTitle = 'Rocket Chat';
      this.pageContent = 'Abriu o chat...';

    }
  }

}