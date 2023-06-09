import {Person} from './Person.js'
import {CRUD} from './Services.js'
import {LoginService} from './LoginServices.js'
import {Helper} from './Helper.js'
let crudObj = new CRUD();
let sessionObj = new LoginService();
let helperObj = new Helper();

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

let selectedContact:any;

var globaltoken = "Nothing"
var selectedData = new Person("","",0,0,"","");
var loggedUser = ""


//Data loading in contact list with select function
async function dataLoad(token:any){
     await crudObj.extructData(token).then((objectData)=>{
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
                
                crudObj.selectDetail(selectedContact,token).then((singleObjectData)=>{
                   selectedData = new Person(singleObjectData.name,
                            singleObjectData.email,
                            singleObjectData.phone,
                            singleObjectData.landline,
                            singleObjectData.website,
                            singleObjectData.addressDetails);
                    helperObj.showDetails(selectedData);
                    inputForm.style.display = 'none';
                    addressDetails.style.display ='block';
                    signForm.style.display = 'none';
                });
                   
            })
        })
          
    });
}

//adding form generation
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

//permission to add
document.getElementById("AddAddress")?.addEventListener('click',function(){
    if(globaltoken!="Nothing"){
        addingForm();
        
        //(document.getElementById('Formid') as any).reset();
    }
    else{
        alert("Access Denied")
    }  
});

//adding to database
addButton.addEventListener('click',function(){
    if(globaltoken!="Nothing"){
        createContact();
        dataLoad(globaltoken)
    }
    else{
        alert("Access Denied")
    }   
});


//opening editing form
(document.getElementById("IconEdit") as HTMLDivElement).addEventListener('click',function(){
    if(globaltoken!="Nothing"){
        editForm(selectedData)
    }  
    else{
        alert("Access Denied")
    } 
});

//permission to edit
saveButton.addEventListener('click',function(){
    if(globaltoken!="Nothing"){
        updateContact();
        dataLoad(globaltoken)
    }
    else{
        alert("Access Denied")
    } 
})

//delete from database
document.getElementById("IconDelete")?.addEventListener('click',function(){
    if(globaltoken!="Nothing"){
        crudObj.deleteDetail(globaltoken,selectedContact);
        alert("Do yo want to delete the contact? Permission:Admin")
        dataLoad(globaltoken);
        addressDetails.style.display ='none';
    }
    else{
        alert("Access Denied")
        dataLoad(globaltoken);
    }
    
})

//loging out the user
document.getElementById("LogoutUser")?.addEventListener('click',function(){
    if(globaltoken!="Nothing"){
        document.location.reload()
    }
    else{
        alert("User not logged in")
    }
})


function createContact(){
    if(helperObj.validName&&helperObj.validEmail&&helperObj.validMobile&&helperObj.validLandline&&helperObj.validSite&&helperObj.validAddress){
        let enteredName = entryName.value;
        let enteredEmail =   entryEmail.value; 
        let enterdedMobile = Number(entryMobile.value); 
        let enteredLandline = Number((entryLandline).value);
        let enteredWebsite =  entryWebsite.value; 
        let enteredAddress =  entryAddress.value;
        crudObj.saveDetail(globaltoken,enteredName,enteredEmail,enterdedMobile,enteredLandline,enteredWebsite,enteredAddress);
        alert("New contact is added")
        inputForm.style.display = 'none';
        
    }
    else{
        alert('Please fill the form properly');
    }
}

function editForm(singleObjectData:any){
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

    crudObj.updateDetail(globaltoken,enteredID,enteredName,enteredEmail,enterdedMobile,enteredLandline,enteredWebsite,enteredAddress)
    alert("Do you want to update the contact? Permission:Admin")
    dataLoad(globaltoken);
    addressDetails.style.display ='none';
    inputForm.style.display = 'none';
}

//First authenticate to use
function authenticate(){
    RegisterButton.addEventListener('click',async function(){
        let username = entryUserName.value;
        let password = entryPassword.value;
        let registerToken =await sessionObj.registration(username,password).then(data=>{return data.message});
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
        let loginToken =await sessionObj.login(username,password).then(data=>{return data.token});
        if(loginToken=="user not found" || loginToken=="password is incorrect"){
            alert(loginToken);
        }
        else{
            globaltoken = loginToken;
            loggedUser = username;
            (document.getElementById("LoginUser") as HTMLElement).innerHTML = "Hello "+ loggedUser;
            dataLoad(loginToken);
            signForm.style.display = "none";
            (document.getElementById("LogOut") as HTMLElement).style.display ='block'
           
            document.getElementById("LoginUser")?.addEventListener('click',function(){
                alert("User Already logged in");
                signForm.style.display='none';
            })

            //refresh the page for logging out after token expired
            setTimeout(function(){
                window.location.reload();
            }, 120000);
            
        }
    })
    
}

//only login and registration will work when user logout
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

//all kind of input validation
entryName.addEventListener('input',function(){
    helperObj.nameValidate();
});
entryEmail.addEventListener('input',function(){
    helperObj.validateEmail();
});
entryMobile.addEventListener('input',function(){
    helperObj.validateMobile();
});
entryLandline.addEventListener('input',function(){
    helperObj.validateLandline();
});
entryWebsite.addEventListener('input',function(){
    helperObj.validateWebsite();
});
entryAddress.addEventListener('input',function(){
    helperObj.validateAddress();
});
entryUserName.addEventListener('input',function(){
    helperObj.validateUserName();
});
entryPassword.addEventListener('input',function(){
    helperObj.validatePassword();
});

function loginValidate(){
    helperObj.validateUserName();
    helperObj.validatePassword();
}

function formValidate(){
    helperObj.nameValidate();
    helperObj.validateEmail();
    helperObj.validateMobile();
    helperObj.validateLandline();
    helperObj.validateWebsite();
    helperObj.validateAddress();
}


//Home content
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
