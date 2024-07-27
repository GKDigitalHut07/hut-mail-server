export class Notification{
    emailTo!:string[];
	cc!:string[];
	bcc!:string[];
	subject!:string;
	body!:string;
	html!:boolean
    constructor(){}
}

export interface NotificationResponse{
    message:string;
    errorCode:string;
    errorDescription:string;
}