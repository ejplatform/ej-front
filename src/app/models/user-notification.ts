class Notification {
    public sender: string;
    public title: string;
    public short_description: string;
    public shorter_description: string;
    public image: string;
    public created: Date;
    public modified: Date;
}

export class UserNotification {
    public id: number;
    public notification: Notification;
    public status: string;
}

