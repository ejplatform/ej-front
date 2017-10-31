import { ViewContainerRef, Injectable, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {

  public static DEFAULT_ERROR_TITLE = 'notification.error.default.title';
  public static DEFAULT_ERROR_MESSAGE = 'notification.error.default.message';
  public static DEFAULT_SUCCESS_TIMER = 5000;
  public static DEFAULT_INFO_TITLE = 'notification.info.default.title';
  public static DEFAULT_INFO_MESSAGE = 'notification.info.default.message';

  constructor(private translate: TranslateService, private toastr: ToastrService) { }

  error({message = NotificationService.DEFAULT_ERROR_MESSAGE, title = NotificationService.DEFAULT_ERROR_TITLE } = {}, options = {}) {
    this.toastr.error(this.translate.instant(message), this.translate.instant(title), Object.assign(this.toastrOptions(), options));
  }

  httpError(status: number, data: any): boolean {
      // FIXME check other https status and make a generic message
      // not-found, unauthorized, forbidden, server error
      if ([500].indexOf(status) > -1) {
          this.error({ message: `notification.http_error.${status}.message` });
          return true; // return true to indicate that the error was already handled
      } else {
          return false;
      }

  }

  success({title = 'toast.title.success', message = ''}, options = {}) {
    options = Object.assign({ timeOut: NotificationService.DEFAULT_SUCCESS_TIMER });
    this.toastr.success(this.translate.instant(message), this.translate.instant(title),Object.assign(this.toastrOptions(), options));
  }

  confirmation({message = NotificationService.DEFAULT_INFO_MESSAGE, title = NotificationService.DEFAULT_INFO_TITLE} = {}, options = {}) {
    this.toastr.info(this.translate.instant(message), this.translate.instant(title), Object.assign(this.toastrOptions(), options));
  }

  info({message = NotificationService.DEFAULT_INFO_MESSAGE, title = NotificationService.DEFAULT_INFO_TITLE} = {}, options = {}) {
    this.toastr.info(this.translate.instant(message), this.translate.instant(title), Object.assign(this.toastrOptions(), options));
  }

  private toastrOptions(options = {}) {
    return {
      allowHtml: false,
      closeButton: true,
      closeHtml: '<button>&times;</button>',
      extendedTimeOut: 1000,
      iconClasses: {
          error: 'toast-error',
          info: 'toast-info',
          success: 'toast-success',
          warning: 'toast-warning'
      },
      messageClass: 'toast-message',
      // onHidden: null,
      // onShown: null,
      // onTap: null,
      progressBar: false,
      tapToDismiss: true,
      templates: {
          toast: 'directives/toast/toast.html',
          progressbar: 'directives/progressbar/progressbar.html'
      },
      timeOut: 5000,
      titleClass: 'toast-title',
      toastClass: 'toast'
    };
  }
}
