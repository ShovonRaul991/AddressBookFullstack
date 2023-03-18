let requiredName = document.getElementById('RequiredName');
let requiredEmail = document.getElementById('RequiredEmail');
let requiredMobile = document.getElementById('RequiredMobile');
let requiredLandline = document.getElementById('RequiredLandline');
let requiredSite = document.getElementById('RequiredSite');
let requiredAddress = document.getElementById('RequiredAddress');
let requiredUserName = document.getElementById('RequiredUserName');
let requiredPassword = document.getElementById('RequiredPassword');
let entryName = document.getElementById('NameEntry');
let entryEmail = document.getElementById('EmailEntry');
let entryMobile = document.getElementById('MobileEntry');
let entryLandline = document.getElementById('LandlineEntry');
let entryWebsite = document.getElementById('WebsiteEntry');
let entryAddress = document.getElementById('AddressEntry');
let entryUserName = document.getElementById('UserNameEntry');
let entryPassword = document.getElementById('UserPasswordEntry');
export class Helper {
    constructor() {
        /* form validation */
        this.validName = false;
        this.validEmail = false;
        this.validMobile = false;
        this.validLandline = false;
        this.validSite = false;
        this.validAddress = false;
        this.validUserName = false;
        this.validPassword = false;
    }
    nameValidate() {
        this.validName = false;
        let tempName = entryName.value;
        if (tempName.length == 0) {
            requiredName.innerHTML = 'Name is required';
        }
        else if (tempName.length > 0) {
            requiredName.innerHTML = '';
            this.validName = true;
        }
    }
    validateEmail() {
        this.validEmail = false;
        let tempEmail = entryEmail.value;
        if (tempEmail.length === 0) {
            requiredEmail.innerHTML = 'Email is required';
        }
        else if (tempEmail.length > 0) {
            let valideMail = /^[0-9a-z.\s+_]+@[0-9a-z-.+]+\.[a-z]{2,4}$/;
            if (tempEmail.match(valideMail)) {
                requiredEmail.innerHTML = '';
                this.validEmail = true;
            }
            else {
                requiredEmail.innerHTML = 'Email is incorrect';
            }
        }
    }
    validateMobile() {
        this.validMobile = false;
        let tempMobile = entryMobile.value;
        if (tempMobile.length == 0) {
            requiredMobile.innerHTML = 'Mobile is required';
        }
        else if (tempMobile.length != 10 || (Number(tempMobile) % 1) != 0) {
            requiredMobile.innerHTML = 'Mobile is incorrect';
        }
        else {
            requiredMobile.innerHTML = '';
            this.validMobile = true;
        }
    }
    validateLandline() {
        this.validLandline = false;
        let tempLandline = entryLandline.value;
        if (tempLandline.length == 0) {
            requiredLandline.innerHTML = 'Landline is required';
        }
        else if (tempLandline.length != 10 || (Number(tempLandline) % 1) != 0) {
            requiredLandline.innerHTML = 'Landline is incorrect';
        }
        else {
            requiredLandline.innerHTML = '';
            this.validLandline = true;
        }
    }
    validateWebsite() {
        this.validSite = false;
        let tempSite = entryWebsite.value;
        if (tempSite.length == 0) {
            requiredSite.innerHTML = 'Website is required';
        }
        else if (tempSite.length > 0) {
            requiredSite.innerHTML = '';
            this.validSite = true;
        }
    }
    validateAddress() {
        this.validAddress = false;
        let tempAddress = entryAddress.value;
        if (tempAddress.length == 0) {
            requiredAddress.innerHTML = 'Address is required';
        }
        else if (tempAddress.length > 0) {
            requiredAddress.innerHTML = '';
            this.validAddress = true;
        }
    }
    validateUserName() {
        this.validUserName = false;
        let tempUserName = entryUserName.value;
        if (tempUserName.length == 0) {
            requiredUserName.innerHTML = 'username is required';
        }
        else if (tempUserName.length > 0) {
            requiredUserName.innerHTML = '';
            this.validUserName = true;
        }
    }
    validatePassword() {
        this.validPassword = false;
        let tempPassword = entryPassword.value;
        if (tempPassword.length < 5) {
            requiredPassword.innerHTML = 'password should be minimum 5 charracter';
        }
        else if (tempPassword.length > 0) {
            requiredPassword.innerHTML = '';
            this.validPassword = true;
        }
    }
    showDetails(obj) {
        let _name = document.getElementById('PersonName');
        _name.innerText = obj.name;
        let _email = document.getElementById('DetailEmail');
        _email.innerText = "Email: " + obj.email;
        let _mobile = document.getElementById('DetailMobile');
        _mobile.innerText = "Mobile: " + '+91 ' + obj.phone;
        let _landline = document.getElementById('DetailLandline');
        _landline.innerText = "Landline: " + obj.landline;
        let _website = document.getElementById('DetailSite');
        _website.innerText = "Website: " + 'https://' + obj.website;
        let _address = document.getElementById('DetailAddress');
        _address.innerText = "Address: " + obj.addressDetails;
    }
}
