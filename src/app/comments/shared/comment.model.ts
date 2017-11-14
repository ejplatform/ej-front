import { Author } from '../shared/author-model';

export class Comment {

    static APPROVED = 'APPROVED'
    static UNMODERATED = 'UNMODERATED'
    static REJECTED = 'REJECTED'
   
    public id: number;
    public author: Author;
    public content: string;
    public conversation: number;
    public polis_id: number;
    public approval: string;    

}
