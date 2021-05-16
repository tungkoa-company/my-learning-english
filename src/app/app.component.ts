import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;
  readonly VAPID_PUBLIC_KEY =
    'BEBrKFsVuTqBmwlOTtIaTWlzNtWlf41hSMELFi8dsNXa2ixaJlOl77MLnQBBVMSLQ8MS1wnzY3O9t0AWUq5Y9Ck';
  constructor(private swPush: SwPush) {
    this.subscribeToNotifications();
  }
  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => console.log(sub))
      .catch((err) =>
        console.error('Could not subscribe to notifications', err)
      );
  }
}
