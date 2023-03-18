import {Person} from './Person.js'
import {extructData, selectDetail,saveDetail,updateDetail,deleteDetail,registration, login} from './Services.js'


let addressDetails : any = document.getElementById('ViewDetails');
let addresslist : any = document.getElementById('ContactListItems');
let inputForm : any = document.getElementById('InputForm');
let signForm : any = document.getElementById('Login')
let addButton: any = document.getElementById('SubmitButton');
let saveButton: any = document.getElementById('EditButton');
let loginButton: any = document.getElementById('LoginButton')
let RegisterButton: any = document.getElementById('RegisterButton')
let entryName = (document.getElementById('NameEntry') as HTMLInputElement);
let entryEmail = (document.getElementById('EmailEntry') as HTMLInputElement);
let entryMobile = (document.getElementById('MobileEntry') as HTMLInputElement);
let entryLandline = (document.getElementById('LandlineEntry') as HTMLInputElement);
let entryWebsite = (document.getElementById('WebsiteEntry') as HTMLInputElement);
let entryAddress = (document.getElementById('AddressEntry') as HTMLInputElement);
let entryUserName = (document.getElementById('UserNameEntry') as HTMLInputElement);
let entryPassword = (document.getElementById('UserPasswordEntry') as HTMLInputElement);
let requiredName = (document.getElementById('RequiredName') as HTMLDivElement);
let requiredEmail = (document.getElementById('RequiredEmail') as HTMLDivElement);
let requiredMobile = (document.getElementById('RequiredMobile') as HTMLDivElement);
let requiredLandline = (document.getElementById('RequiredLandline') as HTMLDivElement);
let requiredSite = (document.getElementById('RequiredSite') as HTMLDivElement);
let requiredAddress = (document.getElementById('RequiredAddress') as HTMLDivElement);
let requiredUserName = (document.getElementById('RequiredUserName') as HTMLDivElement);
let requiredPassword = (document.getElementById('RequiredPassword') as HTMLDivElement);

let selectedContact:any;
let validName:boolean=false,validEmail:boolean=false,validMobile:boolean=false,validLandline:boolean=false,validSite:boolean=false,validAddress:boolean=false,validUserName:boolean=false,validPassword:boolean=false;
var globaltoken = "Nothing"
var selectedData = new Person("","",0,0,"","");
var loggedUser = ""

async function dataLoad(token:any){
     await extructData(token).then((objectData)=>{
        let addressData = "";
        objectData.map((values:any)=>{
            //console.log(values)
            addressData +=`<div class="contact-list-item" id=${values.id}>
            <p class="contact-name">${values.name}</p>
            <p class="contact-email">${values.email}</p>
            <p class="contact-mobile">+91 ${values.phone}</p>
        </div>`;
        });
        (document.getElementById("ContactListItems") as HTMLDivElement).innerHTML = addressData; 
        //elements = document.getElementsByClassName("contact-list-item"); 

        document.querySelectorAll('.contact-list-item').forEach(select=>{
            select.addEventListener('click',function(e:Event){
                selectedContact=(e.currentTarget as any).id;

                document.querySelectorAll('.contact-list-item').forEach(each=>{
                    (each as any).style.backgroundColor = 'white';
                });
                (select as any).style.backgroundColor = "#CEE7F2"
                
                selectDetail(selectedContact,token).then((singleObjectData)=>{
                   selectedData = new Person(singleObjectData.name,
                            singleObjectData.email,
                            singleObjectData.phone,
                            singleObjectData.landline,
                            singleObjectData.website,
                            singleObjectData.addressDetails);
                    showDetails(selectedData);
                    inputForm.style.display = 'none';
                    addressDetails.style.display ='block';
                    signForm.style.display = 'none';
                });
                   
            })
        })
          
    });
}
function addingForm(){
    let allAddress : any = addresslist.children;
    for(let i=0;i<allAddress.length;i++)
        {
            allAddress[i].style.backgroundColor = 'white';
        }
    (document.getElementById('Formid') as any).reset(); 
    addressDetails.style.display = 'none';  
    signForm.style.display = 'none';
    addButton.style.display= 'block';
    saveButton.style.display = 'none';
    inputForm.style.display = 'block';
    // (document.getElementById('Formid') as any).reset(); 
}

document.getElementById("AddAddress")?.addEventListener('click',function(){
    if(globaltoken!="Nothing" && loggedUser=='admin'){
        addingForm()
    }
    else{
        alert("Access Denied")
    }  
});

addButton.addEventListener('click',function(){
    if(globaltoken!="Nothing"){
        createContact();
        dataLoad(globaltoken)
    }
    else{
        alert("Access Denied")
    }   
});

(document.getElementById("IconEdit") as HTMLDivElement).addEventListener('click',function(){
    if(globaltoken!="Nothing"  && loggedUser=='admin'){
        editingForm(selectedData)
    }  
    else{
        alert("Access Denied")
    } 
});

saveButton.addEventListener('click',function(){
    if(globaltoken!="Nothing"){
        updateContact();
        dataLoad(globaltoken)
    }
    else{
        alert("Access Denied")
    } 
})

document.getElementById("IconDelete")?.addEventListener('click',function(){
    if(globaltoken!="Nothing" && loggedUser=='admin'){
        deleteDetail(globaltoken,selectedContact);
        alert("Do yo want to delete the contact?")
        dataLoad(globaltoken);
        addressDetails.style.display ='none';
    }
    else{
        alert("Access Denied")
        dataLoad(globaltoken);
    }
    
})

document.getElementById("LogoutUser")?.addEventListener('click',function(){
    if(globaltoken!="Nothing"){
        document.location.reload()
    }
    else{
        alert("User not logged in")
    }
})


function createContact(){
    if(validName&&validEmail&&validMobile&&validLandline&&validSite&&validAddress){
        let enteredName = entryName.value;
        let enteredEmail =   entryEmail.value; 
        let enterdedMobile = Number(entryMobile.value); 
        let enteredLandline = Number((entryLandline).value);
        let enteredWebsite =  entryWebsite.value; 
        let enteredAddress =  entryAddress.value;
        saveDetail(globaltoken,enteredName,enteredEmail,enterdedMobile,enteredLandline,enteredWebsite,enteredAddress);
        alert("New contact is added")
        inputForm.style.display = 'none';
        
    }
    else{
        alert('Please fill the form properly');
    }
}

function editingForm(singleObjectData:any){
    addressDetails.style.display ='none';
    inputForm.style.display = 'block';
    addButton.style.display = 'none';
    saveButton.style.display = 'block'
    entryName.value = (document.getElementById('PersonName') as HTMLDivElement).innerText;
    entryEmail.value = singleObjectData.email;
    entryMobile.value = singleObjectData.phone;
    entryLandline.value = singleObjectData.landline;
    entryWebsite.value = singleObjectData.website;
    entryAddress.value = singleObjectData.addressDetails;
    formValidate();
}

function updateContact(){
    let enteredID = selectedContact;
    let enteredName = entryName.value;
    let enteredEmail =   entryEmail.value; 
    let enterdedMobile = Number(entryMobile.value); 
    let enteredLandline = Number((entryLandline).value);
    let enteredWebsite =  entryWebsite.value; 
    let enteredAddress =  entryAddress.value;

    updateDetail(globaltoken,enteredID,enteredName,enteredEmail,enterdedMobile,enteredLandline,enteredWebsite,enteredAddress)
    alert("Do you want to update the contact?")
    dataLoad(globaltoken);
    addressDetails.style.display ='none';
    inputForm.style.display = 'none';
}

function authenticate(){
    RegisterButton.addEventListener('click',async function(){
        let username = entryUserName.value;
        let password = entryPassword.value;
        let registerToken =await registration(username,password).then(data=>{return data.message});
        if(registerToken == "user already present"){
            alert(registerToken)
        }
        else{
            alert("User is created")
            document.location.reload();
        }
        
    });
    loginButton.addEventListener('click',async function(){
        let username = entryUserName.value;
        let password = entryPassword.value;
        let loginToken =await login(username,password).then(data=>{return data.token});
        if(loginToken=="user not found" || loginToken=="password is incorrect"){
            alert(loginToken);
        }
        else{
            globaltoken = loginToken;
            loggedUser = username;
            (document.getElementById("LoginUser") as HTMLElement).innerHTML = "Hello "+ loggedUser;
            dataLoad(loginToken);
            signForm.style.display = "none";
            document.getElementById("LoginUser")?.addEventListener('click',function(){
                alert("First log out yourself");
                signForm.style.display='none';
            })
            
        }
    })
    
}

document.addEventListener('DOMContentLoaded', () => {
    // dataLoad()
    authenticate();
    

    document.getElementById("LoginUser")?.addEventListener('click',function(){
        signForm.style.display = 'block';
        addressDetails.style.display = 'none';
        inputForm.style.display = 'none';
        addressDetails.style.display = 'none';
        RegisterButton.style.display = 'none';
        loginButton.style.display = 'block';
        loginValidate();
    });
    
    document.getElementById("RegisterUser")?.addEventListener('click',function(){
        signForm.style.display = 'block';
        addressDetails.style.display = 'none';
        inputForm.style.display = 'none';
        addressDetails.style.display = 'none';
        loginButton.style.display = 'none';
        RegisterButton.style.display = 'block';
        loginValidate();
    });


});


entryName.addEventListener('input',function(){
    nameValidate();
});
entryEmail.addEventListener('input',function(){
    validateEmail();
});
entryMobile.addEventListener('input',function(){
    validateMobile();
});
entryLandline.addEventListener('input',function(){
    validateLandline();
});
entryWebsite.addEventListener('input',function(){
    validateWebsite();
});
entryAddress.addEventListener('input',function(){
    validateAddress();
});
entryUserName.addEventListener('input',function(){
    validateUserName();
});
entryPassword.addEventListener('input',function(){
    validatePassword();
});



/* form validation */

function nameValidate(){
    validName = false;
    let tempName =entryName.value;
    if(tempName.length==0){
        requiredName.innerHTML = 'Name is required';
    }
    else if(tempName.length>0){
    requiredName.innerHTML = '';
    validName=true;
    }
}

function validateEmail(){
    validEmail = false;
    let tempEmail = entryEmail.value;
    if(tempEmail.length===0){
        requiredEmail.innerHTML = 'Email is required';
    }
    else if(tempEmail.length>0){
        let valideMail = /^[0-9a-z.\s+_]+@[0-9a-z-.+]+\.[a-z]{2,4}$/;
        if(tempEmail.match(valideMail)){
            requiredEmail.innerHTML = '';
            validEmail = true;
        }
        else{
            requiredEmail.innerHTML = 'Email is incorrect';
        }
    }
}

function validateMobile(){
    validMobile = false;
    let tempMobile: any = entryMobile.value;
    if(tempMobile.length==0){
        requiredMobile.innerHTML = 'Mobile is required';
    }
    else if(tempMobile.length!=10 || (Number(tempMobile)%1)!=0){
        
            requiredMobile.innerHTML = 'Mobile is incorrect';
        }
    else{
        requiredMobile.innerHTML = '';
        validMobile = true;
    }

}

function validateLandline(){
    validLandline = false;
    let tempLandline : any = entryLandline.value;
    if(tempLandline.length==0){
        requiredLandline.innerHTML = 'Landline is required';
    }
    else if(tempLandline.length!=10 || (Number(tempLandline)%1)!=0){
        requiredLandline.innerHTML = 'Landline is incorrect';
    }
    else{
        requiredLandline.innerHTML = '';
        validLandline = true;
    }
}

function validateWebsite(){
    validSite = false;
    let tempSite =entryWebsite.value;
    if(tempSite.length==0){
        requiredSite.innerHTML = 'Website is required';
    }
    else if(tempSite.length>0){
    requiredSite.innerHTML = '';
    validSite=true;
    }
}

function validateAddress(){
    validAddress = false;
    let tempAddress =entryAddress.value;
    if(tempAddress.length==0){
        requiredAddress.innerHTML = 'Address is required';
    }
    else if(tempAddress.length>0){
    requiredAddress.innerHTML = '';
    validAddress=true;
    }
}

function validateUserName(){
    validUserName = false;
    let tempUserName =entryUserName.value;
    if(tempUserName.length==0){
        requiredUserName.innerHTML = 'username is required';
    }
    else if(tempUserName.length>0){
        requiredUserName.innerHTML = '';
        validUserName = true;
    
    }
}

function validatePassword(){
    validPassword = false;
    let tempPassword =entryPassword.value;
    if(tempPassword.length<5){
        requiredPassword.innerHTML = 'password should be minimum 5 charracter';
    }
    else if(tempPassword.length>0){
        requiredPassword.innerHTML = '';
        validPassword = true;
    
    }
}

function loginValidate(){
    validateUserName();
    validatePassword();
}

function formValidate(){
    nameValidate();
    validateEmail();
    validateMobile();
    validateLandline();
    validateWebsite();
    validateAddress();
}


function showDetails(obj: Person){
    
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

(document.getElementById('Home') as HTMLElement).addEventListener('click',function(){
    let allAddress : any = addresslist.children;
    for(let i=0;i<allAddress.length;i++)
        {
            allAddress[i].style.backgroundColor = 'white';
            allAddress[i].style.overflowX = 'hidden';
        }
    addressDetails.style.display= 'none';
    inputForm.style.display = 'none';
    signForm.style.display = 'none';
        
});

/*
function goToHome(){
    let allAddress : any = addresslist.children;
    for(let i=0;i<allAddress.length;i++)
        {
            allAddress[i].style.backgroundColor = 'white';
            allAddress[i].style.overflowX = 'hidden';
        }
    addressDetails.style.display= 'none';
    inputForm.style.display = 'none'; 
}
*/
/* Extra functions added lastly after the feedback */
/*
function makeScroll(element:any){
    if(overflow(element)){
        selectedContact.style.overflowX = "scroll"
    }
}

function overflow(tempElement:any) {
    return tempElement.scrollHeight > tempElement.clientHeight || tempElement.scrollWidth > tempElement.clientWidth;
}
*/