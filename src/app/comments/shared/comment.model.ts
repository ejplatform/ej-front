import { Conversation } from "../../models/conversation";

export class Comment {

    static APPROVED = 'APPROVED'
    static UNMODERATED = 'UNMODERATED'
    static REJECTED = 'REJECTED'
    
    public id: number;
    public content: string;
    public conversation: number;
    public conversationObj: Conversation;
    public polis_id: number;
    public approval: string;
    public rejection_reason: string;

}
