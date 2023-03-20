var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
import { Person } from './Person.js';
import { CRUD } from './Services.js';
import { LoginService } from './LoginServices.js';
import { Helper } from './Helper.js';
let crudObj = new CRUD();
let sessionObj = new LoginService();
let helperObj = new Helper();
let addressDetails = document.getElementById('ViewDetails');
let addresslist = document.getElementById('ContactListItems');
let inputForm = document.getElementById('InputForm');
let signForm = document.getElementById('Login');
let addButton = document.getElementById('SubmitButton');
let saveButton = document.getElementById('EditButton');
let loginButton = document.getElementById('LoginButton');
let RegisterButton = document.getElementById('RegisterButton');
let entryName = document.getElementById('NameEntry');
let entryEmail = document.getElementById('EmailEntry');
let entryMobile = document.getElementById('MobileEntry');
let entryLandline = document.getElementById('LandlineEntry');
let entryWebsite = document.getElementById('WebsiteEntry');
let entryAddress = document.getElementById('AddressEntry');
let entryUserName = document.getElementById('UserNameEntry');
let entryPassword = document.getElementById('UserPasswordEntry');
let selectedContact;
var globaltoken = "Nothing";
var selectedData = new Person("", "", 0, 0, "", "");
var loggedUser = "";
//Data loading in contact list with select function
function dataLoad(token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield crudObj.extructData(token).then((objectData) => {
            let addressData = "";
            objectData.map((values) => {
                //console.log(values)
                addressData += `<div class="contact-list-item" id=${values.id}>
            <p class="contact-name">${values.name}</p>
            <p class="contact-email">${values.email}</p>
            <p class="contact-mobile">+91 ${values.phone}</p>
        </div>`;
            });
            document.getElementById("ContactListItems").innerHTML = addressData;
            //elements = document.getElementsByClassName("contact-list-item"); 
            document.querySelectorAll('.contact-list-item').forEach(select => {
                select.addEventListener('click', function (e) {
                    selectedContact = e.currentTarget.id;
                    document.querySelectorAll('.contact-list-item').forEach(each => {
                        each.style.backgroundColor = 'white';
                    });
                    select.style.backgroundColor = "#CEE7F2";
                    crudObj.selectDetail(selectedContact, token).then((singleObjectData) => {
                        selectedData = new Person(singleObjectData.name, singleObjectData.email, singleObjectData.phone, singleObjectData.landline, singleObjectData.website, singleObjectData.addressDetails);
                        helperObj.showDetails(selectedData);
                        inputForm.style.display = 'none';
                        addressDetails.style.display = 'block';
                        signForm.style.display = 'none';
                    });
                });
            });
        });
    });
}
//adding form generation
function addingForm() {
    let allAddress = addresslist.children;
    for (let i = 0; i < allAddress.length; i++) {
        allAddress[i].style.backgroundColor = 'white';
    }
    document.getElementById('Formid').reset();
    addressDetails.style.display = 'none';
    signForm.style.display = 'none';
    addButton.style.display = 'block';
    saveButton.style.display = 'none';
    inputForm.style.display = 'block';
    // (document.getElementById('Formid') as any).reset(); 
}
//permission to add
(_a = document.getElementById("AddAddress")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    if (globaltoken != "Nothing") {
        addingForm();
    }
    else {
        alert("Access Denied");
    }
});
//adding to database
addButton.addEventListener('click', function () {
    if (globaltoken != "Nothing") {
        createContact();
        dataLoad(globaltoken);
    }
    else {
        alert("Access Denied");
    }
});
//opening editing form
document.getElementById("IconEdit").addEventListener('click', function () {
    if (globaltoken != "Nothing") {
        editForm(selectedData);
    }
    else {
        alert("Access Denied");
    }
});
//permission to edit
saveButton.addEventListener('click', function () {
    if (globaltoken != "Nothing") {
        updateContact();
        dataLoad(globaltoken);
    }
    else {
        alert("Access Denied");
    }
});
//delete from database
(_b = document.getElementById("IconDelete")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    if (globaltoken != "Nothing") {
        crudObj.deleteDetail(globaltoken, selectedContact);
        alert("Do yo want to delete the contact? Permission:Admin");
        dataLoad(globaltoken);
        addressDetails.style.display = 'none';
    }
    else {
        alert("Access Denied");
        dataLoad(globaltoken);
    }
});
//loging out the user
(_c = document.getElementById("LogoutUser")) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    if (globaltoken != "Nothing") {
        document.location.reload();
    }
    else {
        alert("User not logged in");
    }
});
function createContact() {
    if (helperObj.validName && helperObj.validEmail && helperObj.validMobile && helperObj.validLandline && helperObj.validSite && helperObj.validAddress) {
        let enteredName = entryName.value;
        let enteredEmail = entryEmail.value;
        let enterdedMobile = Number(entryMobile.value);
        let enteredLandline = Number((entryLandline).value);
        let enteredWebsite = entryWebsite.value;
        let enteredAddress = entryAddress.value;
        crudObj.saveDetail(globaltoken, enteredName, enteredEmail, enterdedMobile, enteredLandline, enteredWebsite, enteredAddress);
        alert("New contact is added");
        inputForm.style.display = 'none';
    }
    else {
        alert('Please fill the form properly');
    }
}
function editForm(singleObjectData) {
    addressDetails.style.display = 'none';
    inputForm.style.display = 'block';
    addButton.style.display = 'none';
    saveButton.style.display = 'block';
    entryName.value = document.getElementById('PersonName').innerText;
    entryEmail.value = singleObjectData.email;
    entryMobile.value = singleObjectData.phone;
    entryLandline.value = singleObjectData.landline;
    entryWebsite.value = singleObjectData.website;
    entryAddress.value = singleObjectData.addressDetails;
    formValidate();
}
function updateContact() {
    let enteredID = selectedContact;
    let enteredName = entryName.value;
    let enteredEmail = entryEmail.value;
    let enterdedMobile = Number(entryMobile.value);
    let enteredLandline = Number((entryLandline).value);
    let enteredWebsite = entryWebsite.value;
    let enteredAddress = entryAddress.value;
    crudObj.updateDetail(globaltoken, enteredID, enteredName, enteredEmail, enterdedMobile, enteredLandline, enteredWebsite, enteredAddress);
    alert("Do you want to update the contact? Permission:Admin");
    dataLoad(globaltoken);
    addressDetails.style.display = 'none';
    inputForm.style.display = 'none';
}
//First authenticate to use
function authenticate() {
    RegisterButton.addEventListener('click', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let username = entryUserName.value;
            let password = entryPassword.value;
            let registerToken = yield sessionObj.registration(username, password).then(data => { return data.message; });
            if (registerToken == "user already present") {
                alert(registerToken);
            }
            else {
                alert("User is created");
                document.location.reload();
            }
        });
    });
    loginButton.addEventListener('click', function () {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let username = entryUserName.value;
            let password = entryPassword.value;
            let loginToken = yield sessionObj.login(username, password).then(data => { return data.token; });
            if (loginToken == "user not found" || loginToken == "password is incorrect") {
                alert(loginToken);
            }
            else {
                globaltoken = loginToken;
                loggedUser = username;
                document.getElementById("LoginUser").innerHTML = "Hello " + loggedUser;
                dataLoad(loginToken);
                signForm.style.display = "none";
                (_a = document.getElementById("LoginUser")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                    alert("First log out yourself");
                    signForm.style.display = 'none';
                });
                //refresh the page for logging out after token expired
                setTimeout(function () {
                    window.location.reload();
                }, 120000);
            }
        });
    });
}
//only login and registration will work when user logout
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b;
    // dataLoad()
    authenticate();
    (_a = document.getElementById("LoginUser")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        signForm.style.display = 'block';
        addressDetails.style.display = 'none';
        inputForm.style.display = 'none';
        addressDetails.style.display = 'none';
        RegisterButton.style.display = 'none';
        loginButton.style.display = 'block';
        loginValidate();
    });
    (_b = document.getElementById("RegisterUser")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        signForm.style.display = 'block';
        addressDetails.style.display = 'none';
        inputForm.style.display = 'none';
        addressDetails.style.display = 'none';
        loginButton.style.display = 'none';
        RegisterButton.style.display = 'block';
        loginValidate();
    });
});
//all kind of input validation
entryName.addEventListener('input', function () {
    helperObj.nameValidate();
});
entryEmail.addEventListener('input', function () {
    helperObj.validateEmail();
});
entryMobile.addEventListener('input', function () {
    helperObj.validateMobile();
});
entryLandline.addEventListener('input', function () {
    helperObj.validateLandline();
});
entryWebsite.addEventListener('input', function () {
    helperObj.validateWebsite();
});
entryAddress.addEventListener('input', function () {
    helperObj.validateAddress();
});
entryUserName.addEventListener('input', function () {
    helperObj.validateUserName();
});
entryPassword.addEventListener('input', function () {
    helperObj.validatePassword();
});
function loginValidate() {
    helperObj.validateUserName();
    helperObj.validatePassword();
}
function formValidate() {
    helperObj.nameValidate();
    helperObj.validateEmail();
    helperObj.validateMobile();
    helperObj.validateLandline();
    helperObj.validateWebsite();
    helperObj.validateAddress();
}
//Home content
document.getElementById('Home').addEventListener('click', function () {
    let allAddress = addresslist.children;
    for (let i = 0; i < allAddress.length; i++) {
        allAddress[i].style.backgroundColor = 'white';
        allAddress[i].style.overflowX = 'hidden';
    }
    addressDetails.style.display = 'none';
    inputForm.style.display = 'none';
    signForm.style.display = 'none';
});
