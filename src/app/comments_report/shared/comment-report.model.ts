import { Author } from '../shared/author-model';
import { Conversation } from '../../models/conversation';

export class CommentReport {
    
    public id: number;
    public author: Author;
    public conversation: Conversation;
    public content: string;
    public total_votes: number;
    public agree_votes: number;
    public disagree_votes: number;
    public pass_votes: number;
    public approval: string;
    public agreement_consensus: boolean;
    public disagreement_consensus: boolean;
    public uncertainty: boolean;
    public created_at: string;
    public rejection_reason: string;

}