import { CommentReport } from './comment-report.model';

export class CommentList {
    public count: number;
    public next: string;
    public previous: string;
    public results: CommentReport[];
}
