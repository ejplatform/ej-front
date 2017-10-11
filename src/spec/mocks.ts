import { Observable } from 'rxjs/Observable'; 

export function getMocks() {
    let mocks = {
        restangular: {
            one: () => { return {} },
            all: () => { return {} },
        }
    };
    return mocks;
};

