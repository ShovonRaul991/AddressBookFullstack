export class LoginService{
    async registration(enteredUsername:string,enteredPassword:string){
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
    
    async login(enteredUsername:string,enteredPassword:string){
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
}