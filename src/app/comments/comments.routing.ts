// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TabsModule } from 'ngx-bootstrap';

// import { CommentComponent } from './comment/comment.component';



// @NgModule({
//   imports: [
//     CommonModule,
//     TabsModule.forRoot()
//   ],
//   declarations: [CommentsComponent, CommentComponent]
// })
// export class CommentsModule { }

// app/characters/characters.routing.ts
// ...
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { CommentsComponent } from './comments.component';

const routes: Routes = [  
  { path: 'comments', component: CommentsComponent },
  // { path: 'character/:id', component: CharactersDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }

// export const routedComponents = [CharactersListComponent, CharactersDetailComponent];  
export const routedComponents = [CommentsComponent];  