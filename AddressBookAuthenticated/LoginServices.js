var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class LoginService {
    registration(enteredUsername, enteredPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            var registerData = yield fetch("https://localhost:44309/api/Authentication/register", {
                method: "POST",
                body: JSON.stringify({
                    username: enteredUsername,
                    password: enteredPassword
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((Data) => { return Data.json(); });
            return registerData;
        });
    }
    login(enteredUsername, enteredPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = yield fetch("https://localhost:44309/api/Authentication/login", {
                method: "POST",
                body: JSON.stringify({
                    username: enteredUsername,
                    password: enteredPassword
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((Data) => { return Data.json(); });
            //console.log("loaded")
            //console.log(data);
            return data;
        });
    }
}
