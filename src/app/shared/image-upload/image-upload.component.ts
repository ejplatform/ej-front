import { EventEmitter, Output, Input, Component } from '@angular/core';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  @Input() image;
  @Input() imageData;
  @Input() editionEnabled = true;
  @Output() imageDataChange = new EventEmitter();
  @Output() onChange = new EventEmitter();

  fileChange($event: any) {
    let fileList: FileList = event.target['files'];
    if (fileList.length > 0) {
      const reader = new FileReader();
      let file: File = fileList[0];
      reader.onload = (e: any) => {
        this.imageData = { name: file.name, content: e.target.result };
        this.imageDataChange.next(this.imageData);
        this.onChange.next(this.imageData);
      };
      reader.readAsDataURL(file);
    }
  }
}
