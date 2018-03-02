import { CategoryCustomization } from './category-customization';

export class Category {

    public id: number;
    public name: string;
    public image: string;
    public image_caption: string;
    public customizations: CategoryCustomization;
    public has_tour: boolean;
    public is_login_required: boolean;
    public slug: string;

    public getStyle(): string {
        return (this.customizations) ? this.customizations.styles : null;
    }

}

