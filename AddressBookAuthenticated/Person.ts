export class Person{
    name:string;
    email:string;
    phone:number;
    landline:number;
    website: string;
    addressDetails: string;
    constructor(name:string,email:string,mobile:number,landline:number,website:string,address:string){
        this.name = name;
        this.email = email;
        this.phone = mobile;
        this.landline = landline;
        this.website = website;
        this.addressDetails = address;   
    }
}