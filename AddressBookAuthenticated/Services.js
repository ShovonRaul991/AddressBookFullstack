var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var globaltoken = "";
export function extructData(token) {
    return __awaiter(this, void 0, void 0, function* () {
        var data = yield fetch("https://localhost:44309/Address/get", {
            headers: {
                "Authorization": `bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((Data) => Data.json());
        //console.log("loaded")
        return data;
    });
}
export function selectDetail(id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        var singleData = yield fetch("https://localhost:44309/Address/get/" + id, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `bearer ${token}`,
            }
        }).then((Data) => Data.json());
        console.log(singleData[0]);
        return singleData[0];
    });
}
export function saveDetail(token, enteredName, enteredEmail, enterdedMobile, enteredLandline, enteredWebsite, enteredAddress) {
    let post = () => __awaiter(this, void 0, void 0, function* () {
        return yield fetch("https://localhost:44309/Address/add", {
            method: "POST",
            body: JSON.stringify({
                name: enteredName,
                email: enteredEmail,
                phone: enterdedMobile,
                landline: enteredLandline,
                website: enteredWebsite,
                addressDetails: enteredAddress,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `bearer ${token}`,
            }
        });
    });
    post();
}
export function updateDetail(token, enteredID, enteredName, enteredEmail, enterdedMobile, enteredLandline, enteredWebsite, enteredAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch("https://localhost:44309/Address/update", {
            method: "PUT",
            body: JSON.stringify({
                id: enteredID,
                name: enteredName,
                email: enteredEmail,
                phone: enterdedMobile,
                landline: enteredLandline,
                website: enteredWebsite,
                addressDetails: enteredAddress,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `bearer ${token}`,
            }
        });
    });
}
export function deleteDetail(token, personId) {
    let del = () => __awaiter(this, void 0, void 0, function* () {
        return yield fetch("https://localhost:44309/Address/delete/" + personId, { method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `bearer ${token}`,
            }
        });
    });
    del();
}
export function registration(enteredUsername, enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch("https://localhost:44309/api/Authentication/register", {
            method: "POST",
            body: JSON.stringify({
                username: enteredUsername,
                password: enteredPassword
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        });
    });
}
export function login(enteredUsername, enteredPassword) {
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
