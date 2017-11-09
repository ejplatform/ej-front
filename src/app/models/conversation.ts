import { Comment } from './comment';

export class Conversation {

    public title: string;
    public description: string;
    public total_approved_comments: number;
    public total_votes: number;
    public response: string;
    public dialog: string;
    public created_at: string;
    public updated_at: string;
    public user_participation_ratio: number;
    public background_image: string;
    public background_color: string;
    public polis_url: string;
    public polis_slug: string;
    public id: number;
    public author: any;
    public position: number;
    public is_new: boolean;

}
