import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
class User {
}
let AuthenticationService = class AuthenticationService {
    constructor(http) {
        this.http = http;
        this.ROOT_URL = 'https://pharmafine.herokuapp.com';
    }
    saveToken(token, email) {
        localStorage.setItem('tokenUser', token);
        localStorage.setItem('userEmail', email);
    }
    isLoggedIn() {
        const tokenData = this.getTokenData();
        console.log(tokenData);
        if (tokenData) {
            let resp = tokenData.exp > Date.now() / 1000;
            return resp;
        }
        else {
            return false;
        }
    }
    getTokenData() {
        let payload;
        if (localStorage.getItem('tokenUser') == undefined) {
            payload = localStorage.getItem('tokenUser').split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        }
        else {
            return null;
        }
    }
    login(username, password) {
        const options = {
            headers: new HttpHeaders().append('Content-Type', 'application/json'),
        };
        return this.http.post(this.ROOT_URL + '/login', { email: username, password: password }, options)
            .pipe(map(result => {
            this.saveToken(result.token, username);
        }));
    }
    logout() {
        localStorage.removeItem('tokenUser');
        localStorage.removeItem('userEmail');
    }
};
AuthenticationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map