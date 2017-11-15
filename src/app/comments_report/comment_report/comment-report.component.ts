import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentReport } from '../shared/comment-report.model';
import { CommentReportService } from '../shared/comment-report.service';

@Component({
  selector: 'app-comment-report',
  templateUrl: './comment-report.component.html',
  styleUrls: ['./comment-report.component.scss']
})
export class CommentReportComponent implements OnInit {

  @Input() commentReport: CommentReport;
  @Output() onApprovalChange = new EventEmitter();
  
  constructor(private commentReportService: CommentReportService) { }

  ngOnInit() {
  }

  onImageError(){
    console.log('ERRO NA IMAGE');
  }

  approveComment(){
    this.commentReport.approval = CommentReport.APPROVED;
    this.commentReportService.save(this.commentReport).subscribe((commentReport: CommentReport) => {
      // this.comment = comment;
      this.onApprovalChange.next(this.commentReport);
      
    }, (error) =>{ 
      console.log(error);
      this.commentReport.approval = null;
    });
  }

  rejectComment(){
    this.commentReport.approval = CommentReport.REJECTED;
    this.commentReportService.save(this.commentReport).subscribe((commentReport: CommentReport) => {
      // this.comment = comment;
      this.onApprovalChange.next(this.commentReport);
    }, (error) =>{ 
      console.log(error);
      this.commentReport.approval = null;
    });
  }

  isRejected(){
    return this.commentReport.approval ===  CommentReport.REJECTED
  }

  isApproved(){
    return this.commentReport.approval ===  CommentReport.APPROVED
  }

}
