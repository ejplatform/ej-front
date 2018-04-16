import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor() {}

  // FIXME remove this hadrcoded content
  pageTitle = 'Um lugar para crianças e adolescentes debaterem e ajudarem a melhorar o Brasil';
  pageSubtitle = 'Participando de grupos de discussão em diferentes temas, apresentando propostas e votando em ideias para melhorar  a vida de crianças e adolescentes';

  //FIXME get rocket chat url dinamically
  gotoRocket(){
    window.open("https://chat.ejplatform.org/channel/general", "_blank");
  }

  //FIXME check some enviroment variable to see if the chat is active
  isChatActive(): boolean{
    return true;
  }

}
