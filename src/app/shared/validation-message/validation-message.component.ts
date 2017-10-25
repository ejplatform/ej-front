import { Component, Input } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { SlugifyPipe } from 'ngx-pipes/src/app/pipes/string/slugify';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: "validation-message",
    templateUrl: './validation-message.component.html',
    providers: [SlugifyPipe]
})
export class ValidationMessageComponent {

    @Input() field: NgModel;
    @Input() prefix: string;
    @Input() form: NgForm;

    constructor(private slugifyPipe: SlugifyPipe, private translate: TranslateService) { }

    setErrors(errorObjects: any) {
        console.log('errorssss', errorObjects);
        
        if (!errorObjects) return;
        let errors = {};
        for (let errorObj of errorObjects) {
            errors[errorObj] = true;
        }
        console.log(errors);
        this.field.control.setErrors(errors);
    }

    setErrorsArray(errorArray: any) {
        if (!errorArray) return;
        let errors = {};
        for (let error of errorArray) {
            errors[error] = true;
        }
        this.field.control.setErrors(errors);
    }

    getErrors() {
        if (!this.field || !this.field.errors) return null;
        return Object.keys(this.field.errors).map(key => {
            const translationKey = this.prefix + "." + this.slugifyPipe.transform(key);
            let error = this.translate.instant(translationKey);
            return error !== translationKey ? error : key;
        });
    }
}
