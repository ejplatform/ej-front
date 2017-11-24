export class Profile { 
    
    [x: string]: string|number|boolean;

    public id: number;
    public pk: number;
    public token: string;
    public name: string;
    public is_superuser: boolean;
    public image: any;
    public imageFile: any;
    public imageData: any;
    public password: string;
    public passwordConfirmation: string;
    public new_password1: string;
    public new_password2: string;
    public email: string;
    public first_name: string;
    public last_name: string;
    public username: string;
    public city: string;
    public state: string;
    public country: string;
    public race: string;
    public gender: string;
    public age: string;
    public biography: string;
    public occupation: string;   
    
}
