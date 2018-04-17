import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
})
export class HowItWorksComponent {

  constructor(private router: Router) { }

  // FIXME get rocket chat url dinamically
  gotoRocket() {
    window.open("https://chat.ejplatform.org/channel/general", "_blank");
  }

  // FIXME get rocket chat url dinamically
  gotoGroups() {
    window.open("https://chat.ejplatform.org/channel/general", "_blank");
  }

  gotoConversations() {
    this.router.navigate(['conversations']);
  }

  // FIXME check some enviroment variable to see if the chat is active
  isChatActive(): boolean {
    return true;
  }

}
