import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpService } from '../../../../services/http.service'
import { Airport } from '../../../../model/airport'
import { validationMessages } from './../../../../utilities'

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {

  airport:Airport
  airportForm:FormGroup
  formErrors:any = {}
  id:string

  constructor(
    private router:Router,
    private _router:ActivatedRoute,
    private fb:FormBuilder,
    private http:HttpService
  ) { }

  ngOnInit() {
    this.formValidator()
    this._router.paramMap.subscribe(param => {
      this.id = param.get('id')
      if (this.id) {
        this.getAirport(this.id)
      } else {
        this.airport = {
          label:'',
          iata_code:'',
          icao_code:''
        }
      }
    })
  }

  logFormErrors(group: FormGroup = this.airportForm): void {
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

  getAirport(id:string) {
    this.http.get('airport/by-identity?identity='+id).subscribe((data) => {
      this.editAirport(data.response)
      this.airport = data.response
    })
  }

  editAirport(data:Airport) {
    this.airportForm.patchValue({
      label:data.label,
      iata_code:data.iata_code,
      icao_code:data.icao_code
    })
  }

  mapFormValues() {
    this.airport.identity = this.id
    this.airport.label = this.f.label.value,
    this.airport.iata_code = this.f.iata_code.value
    this.airport.icao_code = this.f.icao_code.value
  }


  get f () {
    return this.airportForm.controls
  }

  formData() {
    return this.airport = {
      label: this.f.label.value,
      iata_code: this.f.iata_code.value,
      icao_code: this.f.icao_code.value
    }
  }

  formValidator() {
    this.airportForm = this.fb.group({
      label:['', Validators.required],
      iata_code:['', Validators.required],
      icao_code:['', Validators.required]
    })
  }

  onSubmit() {
    this.mapFormValues()
    if (this.airport.identity) {
      this.http.post('airport/modify', this.airport).subscribe(
        (data) => {
          if (!data.response) return
          this.router.navigate(['admin/airport/lists'])
        }
      )
    } else {
      this.http.post('airport/create', this.formData()).subscribe(
        (data) => {
          if (!data.response) return
          this.router.navigate(['admin/airport/lists'])
        }
      )
    }

  }

}
