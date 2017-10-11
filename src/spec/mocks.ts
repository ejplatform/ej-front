import { Observable } from 'rxjs/Observable'; 

export function getMocks() {
    let mocks = {
        commentService: {
            list: () => { return {} },
        },
        profileService: {
            get: (id: number) => { return {} },
        }
    };
    return mocks;
};

