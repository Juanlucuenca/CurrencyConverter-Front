import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/core/data/interfaces/Subscription.interface';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  subscriptions! : Subscription[];

  constructor(
    private subscriptionService: SubscriptionService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.subscriptionService.getAllSubscriptions()
      .subscribe(subscriptions => this.subscriptions = subscriptions)
  }


  setSubscription(subscription: any) {
    this.alertService.showConfirm(`Would you like to subscribe to the ${subscription.name} plan?`, 'Confirmar', () => {
      this.subscriptionService.setSubscription(subscription.id).subscribe({
        next: () => {
          this.alertService.showSuccess(`You have successfully subscribed to the plan ${subscription.name}`, 'Éxito')
        },
        error: (err) => {
          this.alertService.showError(`It has not been subscribed because ${err.error}`, 'Error', true)
        }
      })
    }, () => {
      this.alertService.showError('cancel the subscription', 'Error', true)
    })
  }
}
