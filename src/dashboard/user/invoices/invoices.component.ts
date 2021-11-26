import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { HttpService } from '../../../services/http.service'

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices:any

  constructor(
    private router: Router,
    private http: HttpService
  ) { }


  ngOnInit() {
    this.getInvoices()
  }

  getInvoices() {
    const user = this.http.getUser()
    if (user) {
      this.http.get('invoice/all-invoices?user='+user).subscribe(
        (data) => {
          if (!data.error) {
            if (data.total > 0) {
              this.invoices = data.response
            } else{
              this.invoices = null
            }
          }else{
            this.router.navigate(['main/index'])
          }
        }, (err) => {
          this.router.navigate(['main/index'])
        }
      )
    }
  }

}
// amount: 50000,
//     email: 'user@mail.com',
//     ref: `${Math.ceil(Math.random() * 10e10)}`
