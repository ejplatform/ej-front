import { Observable } from 'rxjs/Observable';

export function getMocks() {
    const mocks = {
        restangular: {
            one: () => {
                return {
                    get: () => {
                        return Observable.of({});
                    }
                };
            },
            all: () => {
                return {
                    getList: () => {
                        return Observable.of({});
                    }
                };
            },
        },
        commentService: {
            list: () => {
                return {};
            },
        },
        profileService: {
            get: (id: number) => {
                return Observable.of({});
            },
            list: () => {
                return Observable.of([{}]);
            }
        }
    };
    return mocks;
};

