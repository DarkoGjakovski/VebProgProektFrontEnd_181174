export class User {
    id: number;
    emailId: string;
    username: string;
    password: string;
    constructor(id: number,emailId: string,username: string, password: string){
        this.id = id;
        this.emailId = emailId;
        this.username = username;
        this.password = password;
    }
}