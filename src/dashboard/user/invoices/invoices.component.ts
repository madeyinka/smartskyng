import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { HttpService } from '../../../services/http.service'
import { PaystackOptions } from 'angular4-paystack';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices:any
  public title = 'My app';
  public showEmbed = false;
  options: PaystackOptions = {
    amount: 50000,
    email: 'user@mail.com',
    ref: `${Math.ceil(Math.random() * 10e10)}`
  };

  constructor(
    private router: Router,
    private http: HttpService
  ) { }



  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
  }

  paymentCancel() {
    this.title = 'Payment failed';
    console.log(this.title);
  }

  ngOnInit() {
    this.getInvoices()
  }

  getInvoices() {
    const user = this.http.getUser()
    if (user) {
      this.http.get('utility/get-invoices?user='+user).subscribe(
        (data) => {
          if (!data.error) {
            if (data.total > 0) {
              this.invoices = data.response
            } else{
              this.invoices = null
            }
          }else{
            this.router.navigate(['main/auth/login'])
          }
        }, (err) => {
          this.router.navigate(['main/auth/login'])
        }
      )
    }
  }

}
