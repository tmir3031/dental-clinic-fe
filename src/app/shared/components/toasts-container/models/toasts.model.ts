export enum NotificationType {
    ERROR = 'Error',
    WARNING = 'Warning',
    INFO = 'Info',
    SUCCESS = 'Success',
    STANDARD = 'Standard',
}

export class NotificationToast {
    message!: string;
    type!: NotificationType;
    delay?: number;
    className?: string;
}
