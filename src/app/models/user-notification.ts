class Notification {
    public sender: string;
    public title: string;
    public short_description: string;
}

export class UserNotification {
    public id: number;
    public notification: Notification;
    public status: string;
}

