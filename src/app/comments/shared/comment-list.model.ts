import { Comment } from './comment.model';

export class CommentList {
    public count: number;
    public next: string;
    public previous: string;
    public results: Comment[];
}
