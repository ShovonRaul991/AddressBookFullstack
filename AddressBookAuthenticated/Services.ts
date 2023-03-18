var globaltoken:any="";

export async function extructData(token:any){
    
    var data = await fetch("https://localhost:44309/Address/get",{
        headers:{
            "Authorization" : `bearer ${token}`,
            "Content-type" : "application/json; charset=UTF-8",
            
        },
    }).then((Data)=>
    Data.json()
    );
    //console.log("loaded")
    return data;
}

export async function selectDetail(id:any,token:any){
    var singleData = await fetch("https://localhost:44309/Address/get/"+id,{
        headers:{
            "Content-type" : "application/json; charset=UTF-8",
            "Authorization" : `bearer ${token}`,
        }
    }).then((Data)=>
    Data.json()
    );
    console.log(singleData[0]);
    return singleData[0];
}

export function saveDetail(token:any,enteredName:string,enteredEmail:string,enterdedMobile:number,enteredLandline:number,enteredWebsite:string,enteredAddress:string){
    let post=async()=>await fetch("https://localhost:44309/Address/add",{
        method: "POST",
        body: JSON.stringify({
            name:enteredName,
            email: enteredEmail,
            phone: enterdedMobile,
            landline:enteredLandline,
            website: enteredWebsite,
            addressDetails: enteredAddress,
        }),
        headers:{
            "Content-type" : "application/json; charset=UTF-8",
            "Authorization" : `bearer ${token}`,
        }
    });
    post();
    
}

export async function updateDetail(token:any,enteredID:string,enteredName:string,enteredEmail:string,enterdedMobile:number,enteredLandline:number,enteredWebsite:string,enteredAddress:string){
    await fetch("https://localhost:44309/Address/update",{
        method: "PUT",
        body: JSON.stringify({
            id:enteredID,
            name:enteredName,
            email: enteredEmail,
            phone: enterdedMobile,
            landline:enteredLandline,
            website: enteredWebsite,
            addressDetails: enteredAddress,
        }),
        headers:{
            "Content-type" : "application/json; charset=UTF-8",
            "Authorization" : `bearer ${token}`,
        }
    });
}

export function deleteDetail(token:any,personId:string){
    let del=async()=>await fetch("https://localhost:44309/Address/delete/"+personId, { method: 'DELETE' ,
    headers:{
        "Content-type" : "application/json; charset=UTF-8",
        "Authorization" : `bearer ${token}`,
    }
});
    del();
}

export async function registration(enteredUsername:string,enteredPassword:string){
    var registerData = await fetch("https://localhost:44309/api/Authentication/register",{
        method: "POST",
        body: JSON.stringify({
            username:enteredUsername,
            password:enteredPassword
        }),
        headers:{
            "Content-type" : "application/json; charset=UTF-8",
        }
    }).then((Data)=>{return Data.json()});
    return registerData;
}

export async function login(enteredUsername:string,enteredPassword:string){
    var data = await fetch("https://localhost:44309/api/Authentication/login",{
        method: "POST",
        body: JSON.stringify({
            username:enteredUsername,
            password:enteredPassword
        }),
        headers:{
            "Content-type" : "application/json; charset=UTF-8",
        }
    }).then((Data)=>{return Data.json()})
    
    //console.log("loaded")
    //console.log(data);
    return data;
    
}