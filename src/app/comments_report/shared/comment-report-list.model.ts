import { CommentReport } from './comment-report.model';

export class CommentReportList {
    public count: number;
    public next: string;
    public previous: string;
    public results: CommentReport[];
}
