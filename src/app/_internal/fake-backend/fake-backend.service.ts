/*
 * Copyright (c) 2018 Dematic, Corp.
 * Licensed under the MIT Open Source: https://opensource.org/licenses/MIT
 */

import {of as observableOf, Observable} from 'rxjs';

import {dematerialize, delay, materialize, mergeMap} from 'rxjs/operators';
// The following is used to simulate a backend in a static application without one.
// Read this article for more information:
// http://jasonwatmore.com/post/2017/12/15/angular-5-mock-backend-example-for-backendless-development

import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS
} from '@angular/common/http';

// Get fake data
import {configuration} from '../configuration/configuration';
import {FakeUser} from './data/user';
import {FooterItems} from './data/footeritems';
import {NavigationItems} from './data/navigation';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    simulatedDelay = 1000; // delay, in milliseconds, used to simulate network latency
    users: any[] = [];
    storageKey: string = configuration.id + '_users';

    constructor() {
        // Get array of users from local storage for registered users
        this.users = JSON.parse(localStorage.getItem(this.storageKey)) || [];

        // If there are no users in local storage, create a default user
        if (!this.users.length) {
            this.createUser(FakeUser);
        }
    }

    createUser(newUser: any) {
        // save new user
        newUser.id = this.users.length + 1;
        this.users.push(newUser);
        localStorage.setItem(this.storageKey, JSON.stringify(this.users));

        // respond 200 OK
        return observableOf(new HttpResponse({status: 200}));
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // wrap in delayed observable to simulate server api call
        return observableOf(null).pipe(mergeMap(() => {

                /***** NAVIGATION *****/
                // get navigation items
                if (request.url.endsWith('/api/navigation') && request.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real
                    // application
                    return observableOf(new HttpResponse({
                        status: 200,
                        body: {
                            data: NavigationItems
                        }
                    }));
                }

                /***** SIDEBAR FOOTER ITEMS *****/
                // get sidebar footer items
                if (request.url.endsWith('/api/footer') && request.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real
                    // application
                    return observableOf(new HttpResponse({status: 200, body: {data: FooterItems}}));
                }

                /***** PASS THROUGH *****/
                // pass through any requests not handled above
                return next.handle(request);
            }),

            // call materialize and dematerialize to ensure delay even if an error is thrown
            // (https://github.com/Reactive-Extensions/RxJS/issues/648)
            materialize(),
            delay(this.simulatedDelay),
            dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
