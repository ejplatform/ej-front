import { Component, Input } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { ThemeFooterComponent } from '../theme-footer/theme-footer.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  styles: any = null;

  constructor(private categoryService: CategoryService) {
    categoryService.categoryChangeEvent.subscribe( (category: Category) => {
      this.styles = category ? category.getStyle() : null;
    });
  }

}
