import {Person} from './Person.js'

let requiredName = (document.getElementById('RequiredName') as HTMLDivElement);
let requiredEmail = (document.getElementById('RequiredEmail') as HTMLDivElement);
let requiredMobile = (document.getElementById('RequiredMobile') as HTMLDivElement);
let requiredLandline = (document.getElementById('RequiredLandline') as HTMLDivElement);
let requiredSite = (document.getElementById('RequiredSite') as HTMLDivElement);
let requiredAddress = (document.getElementById('RequiredAddress') as HTMLDivElement);
let requiredUserName = (document.getElementById('RequiredUserName') as HTMLDivElement);
let requiredPassword = (document.getElementById('RequiredPassword') as HTMLDivElement);
let entryName = (document.getElementById('NameEntry') as HTMLInputElement);
let entryEmail = (document.getElementById('EmailEntry') as HTMLInputElement);
let entryMobile = (document.getElementById('MobileEntry') as HTMLInputElement);
let entryLandline = (document.getElementById('LandlineEntry') as HTMLInputElement);
let entryWebsite = (document.getElementById('WebsiteEntry') as HTMLInputElement);
let entryAddress = (document.getElementById('AddressEntry') as HTMLInputElement);
let entryUserName = (document.getElementById('UserNameEntry') as HTMLInputElement);
let entryPassword = (document.getElementById('UserPasswordEntry') as HTMLInputElement);

export class Helper{
    /* form validation */
    validName:boolean=false;
    validEmail:boolean=false;
    validMobile:boolean=false;
    validLandline:boolean=false;
    validSite:boolean=false;
    validAddress:boolean=false;
    validUserName:boolean=false;
    validPassword:boolean=false;
    nameValidate(){
        this.validName = false;
        let tempName =entryName.value;
        if(tempName.length==0){
            requiredName.innerHTML = 'Name is required';
        }
        else if(tempName.length>0){
        requiredName.innerHTML = '';
        this.validName=true;
        }
    }

    validateEmail(){
        this.validEmail = false;
        let tempEmail = entryEmail.value;
        if(tempEmail.length===0){
            requiredEmail.innerHTML = 'Email is required';
        }
        else if(tempEmail.length>0){
            let valideMail = /^[0-9a-z.\s+_]+@[0-9a-z-.+]+\.[a-z]{2,4}$/;
            if(tempEmail.match(valideMail)){
                requiredEmail.innerHTML = '';
                this.validEmail = true;
            }
            else{
                requiredEmail.innerHTML = 'Email is incorrect';
            }
        }
    }

    validateMobile(){
        this.validMobile = false;
        let tempMobile: any = entryMobile.value;
        if(tempMobile.length==0){
            requiredMobile.innerHTML = 'Mobile is required';
        }
        else if(tempMobile.length!=10 || (Number(tempMobile)%1)!=0){
            
                requiredMobile.innerHTML = 'Mobile is incorrect';
            }
        else{
            requiredMobile.innerHTML = '';
            this.validMobile = true;
        }

    }

    validateLandline(){
        this.validLandline = false;
        let tempLandline : any = entryLandline.value;
        if(tempLandline.length==0){
            requiredLandline.innerHTML = 'Landline is required';
        }
        else if(tempLandline.length!=10 || (Number(tempLandline)%1)!=0){
            requiredLandline.innerHTML = 'Landline is incorrect';
        }
        else{
            requiredLandline.innerHTML = '';
            this.validLandline = true;
        }
    }

    validateWebsite(){
        this.validSite = false;
        let tempSite =entryWebsite.value;
        if(tempSite.length==0){
            requiredSite.innerHTML = 'Website is required';
        }
        else if(tempSite.length>0){
        requiredSite.innerHTML = '';
        this.validSite=true;
        }
    }

    validateAddress(){
        this.validAddress = false;
        let tempAddress =entryAddress.value;
        if(tempAddress.length==0){
            requiredAddress.innerHTML = 'Address is required';
        }
        else if(tempAddress.length>0){
        requiredAddress.innerHTML = '';
        this.validAddress=true;
        }
    }

    validateUserName(){
        this.validUserName = false;
        let tempUserName =entryUserName.value;
        if(tempUserName.length==0){
            requiredUserName.innerHTML = 'username is required';
        }
        else if(tempUserName.length>0){
            requiredUserName.innerHTML = '';
            this.validUserName = true;
        
        }
    }

    validatePassword(){
        this.validPassword = false;
        let tempPassword =entryPassword.value;
        if(tempPassword.length<5){
            requiredPassword.innerHTML = 'password should be minimum 5 charracter';
        }
        else if(tempPassword.length>0){
            requiredPassword.innerHTML = '';
            this.validPassword = true;
        
        }
    }


    showDetails(obj: Person){
        
        let _name : any = document.getElementById('PersonName');
        _name.innerText = obj.name;
        let _email : any = document.getElementById('DetailEmail');
        _email.innerText = "Email: "+ obj.email;
        let _mobile : any = document.getElementById('DetailMobile');
        _mobile.innerText = "Mobile: "+'+91 '+obj.phone;
        let _landline : any = document.getElementById('DetailLandline');
        _landline.innerText = "Landline: "+obj.landline;
        let _website : any = document.getElementById('DetailSite');
        _website.innerText = "Website: "+'https://'+obj.website;
        let _address : any = document.getElementById('DetailAddress');
        _address.innerText = "Address: "+ obj.addressDetails;
        
    }
}