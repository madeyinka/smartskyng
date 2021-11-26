import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpService } from './../../../../services/http.service'
import { Booking } from './../../../../model/booking'
import { validationMessages } from './../../../../utilities'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  booking:Booking
  quoteForm:FormGroup
  addData:any
  id:string
  formErrors:any={}

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router:Router,
    private _router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formValidator()
    this._router.paramMap.subscribe(param => {
      this.id = param.get('id')
      this.http.get('booking/by-identity?identity='+this.id).subscribe(data => {
        this.booking = data.response
      })
    })
    this.quoteForm.valueChanges.subscribe(() => this.logFormErrors())
  }

  logFormErrors(group: FormGroup = this.quoteForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logFormErrors(abstractControl)
      }else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid
         && (abstractControl.touched || abstractControl.dirty)) {
             const messages = validationMessages[key];
             for (const errorKey in abstractControl.errors) {
               if (errorKey) {
                 this.formErrors[key] += messages[errorKey] + ' ';
               }
            }
          }
      }
    });
  }

  get f () {
    return this.quoteForm.controls;
  }

  formData(){
    return this.addData = {
      identity: this.id,
      item: this.f.item.value,
      description: this.f.description.value
    }
  }

  formValidator(){
    this.quoteForm = this.fb.group({
      item: ['', Validators.required],
      description:['']
    })
  }

  onSubmit(){
    this.http.post('invoice/generate-invoice', this.formData()).subscribe(
      (data) => {
        if (data && !data.error) {
          this.router.navigate(['user/booking/confirm', this.id])
        } else {
          console.log(data.message)
        }
      }, (err) => console.log(err)
    )
  }

}
