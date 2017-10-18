import { Observable } from 'rxjs/Observable';

export function getMocks() {
    const mocks = {
        commentService: {
            list: () => {
                return {};
            },
        },
        authService: {
            signIn: () => {
                return {};
            },
            signOut: () => {
                return Observable.of({});
            },
        },
        sessionService: {
            currentProfile: () => {
                return { "id": 1, "name": "admin", "email": "admin@localhost.com" };
            },
            destroy: () => {
            },
            setToken: (token: string) => {
                return '';
            },
        },
        profileService: {
            get: (id: number) => {
                return Observable.of({});
            },
            getProfile: () => {
                return { "id": 1, "name": "admin", "email": "admin@localhost.com" };
            },
            list: () => {
                return Observable.of([{}]);
            },
            profileChangeEvent: {
                subscribe: (fn: Function) => { },
                next: (param: any) => { }
            },
        },
        globalState: {
            subscribe: () => Observable.of({}),
        },
    };
    return mocks;
};

