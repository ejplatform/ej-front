import { Observable } from 'rxjs/Observable'; 

export function getMocks() {
    let mocks = {
        commentService: {
            list: () => { return {} },
        }
    };
    return mocks;
};

