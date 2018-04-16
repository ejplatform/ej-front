import { Conversation } from "../../models/conversation";
import { Nudge } from "../../nudge/shared/nudge-model";

export class Comment {

    static APPROVED = 'APPROVED'
    static UNMODERATED = 'UNMODERATED'
    static REJECTED = 'REJECTED'
    
    public id: number;
    public content: string;
    public conversation: number;
    public conversationObj: Conversation;
    public nudge: Nudge;
    public approval: string;
    public rejection_reason: string;

}
