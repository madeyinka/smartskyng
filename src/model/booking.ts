export interface Booking {
  id:string;
  order_id:number;
  origin:string;
  destination:string;
  service_type:string;
  shiping_date:string;
  location:string;
  reciever: {
    name:string;
    email:string;
    phone: string;
    address:string;
    alt_phone?:string
  };
  length:number;
  width:number;
  height:number;
  weight:number;
  quantity:number;
  express?:string;
  insurance?:string;
  packaging?:string;
  dim_weight:number;
  act_weight:number;
  charge_weight:number;
  cost:number;
  item?:string;
  description?:string;
  status:string;
  date_added?:string;
  date_modified?:string
}
