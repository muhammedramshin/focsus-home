import { Component, OnInit,Input } from '@angular/core';
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import {Router} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import{UserService} from 'src/app/services/user.service'
import { from } from 'rxjs';
@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit {
 
  @Input() data: any;
  constructor(private router: Router,
    private service: ApiService,
    private toast:ToastrService,
    private userservice:UserService
    ) { }
  formdata:any;
  newpakloading:any;
  imageUploaded:boolean =false;
  path:any;
  packages:any;
  packages_selected:any;
  classes:any;
  userImagePath:any;
  name: any = '';
  school:any='';
  student_num:any = '';
  parent_num:any='';
  medium:any='';
  class:any ='';
  email:any='';
  branch:any ='';
  package:any ='';
  packageName:any ='';
  paymenttype:any ='';
  price:any ="0";
  password:any='';
  transactionId:any='Not generated';
  transaction_status:any="Not Paid";
  payed:boolean = false;
  np:number=100;
  Brcode:any;
  Mcode:any;
  Ccode:any;
  Uid:any;
  Rand:any;   


  public payPalConfig ? : IPayPalConfig;
 
    ngOnInit(): void {
        this.initConfig();
        console.log(this.name);
        this.getPackages();
        this.getClass();
      //  this.filterPackage(this.class) 
      //  this.selectedPackage(class);
       
    }

    uploadImage(data:any) {
      console.log("called");
      this.newpakloading = true;
      this.service.fileUpload(data[0]).subscribe(
        (dat:any) => {
          this.newpakloading = false;
          this.imageUploaded = true;
          this.userImagePath = dat['path'];
          console.log("ok")
          console.log(dat);
          this.toast.success('Image uploaded', 'successfully');
          
        },
        (err) => {
          this.newpakloading = false;
          console.log("error")
          // this.toastService.danger('Upload Failed', 'Alert');
        }
      )
  
    }
  
    getPackages(){
      this.service.packages().subscribe(
        (data:any)=>{
          this.packages = data;
          console.log('pakages',this.packages);
        },
        (err)=>{
          console.log(err)
        }
      );
    }

    getClass(){
      this.service.classes().subscribe(
        (data:any)=>{
          this.classes = data;
          
          console.log("class",this.classes);
        },
        (err)=>{
          console.log(err)
        }
      );
    }

    filterPackage(val) {
    this.packages_selected = this.packages.filter((ele) => ele.class_name == val);
    console.log("hello",this.packages_selected)
    this.package = this.packages_selected[0]['id'];
    this.price = this.packages_selected[0]['package_cost'];
    this.packageName =  this.packages_selected[0]['package_name'];
    
     }

   


   selectedPackage(val){
    let x = this.packages_selected.filter((ele) => ele.id == val);
    console.log("valof x",x);
    this.price = x[0]['package_cost'];
    this.packageName =   x[0]['package_name'];
    console.log('price',this.price);
  
   }
  

    private initConfig(): void {
      this.payPalConfig = {
        currency: 'USD',
        clientId: 'AepUn_WXLtFAwry59ARxMA5iwrpEA4KekeTu2aAf2U-8Az-k3nFkiKxm0MvU2u0ambhGOL3EydoNoFAv', // add paypal clientId here
        createOrderOnClient: (data) => <ICreateOrderRequest> {
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: this.price,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.price,
                }
              }
            },
            items: [{
              name: this.package,
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value:this.price,
              },
            }]
          }]
        },
        advanced: {
          commit: 'true'
        },
        style: {
          label: 'paypal',
          layout: 'vertical',
          size: 'small',
          color: 'blue',
          shape: 'rect'
        },
        onApprove:(data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details: any) => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
            this.transactionId = details['id'];
            this.transaction_status = details['status'];
            console.log("id generated",this.transactionId+".."+this.transaction_status);
            
          });
          this.toast.success('Amount: ₹'+ this.price, 'Payment Approved');
  
        },
        onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          this.toast.success('Amount: ₹'+ this.price, 'Payment '+ data.status);
          localStorage.setItem("orderid",data.id)
          localStorage.setItem("status",data.status)
          this.transactionId = data['id'];
            this.transaction_status = data['status'];
            console.log("id generated",this.transactionId+".."+this.transaction_status);
          this.payed = true;
        },
        onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
  
        },
        onError: err => {
          console.log('OnError', err);
        },
        onClick: (data, actions) => {
          console.log('onClick', data, actions);
          console.log(this.name);
        }
      };
    }


    paychange(val){
      if(val === 'online'){
        this.payed = false;
      }
      else{
        this.payed = true;
      }
    }

  onEnroll(myForm:any){
    console.log(myForm.value);
    this.formdata = myForm.value;   
     
      switch(this.branch){
        case'Kottakal':
        this.Brcode = 'KL';
        break;
        case 'kottor':
          this.Brcode ='KR';
          break;
        case 'Malappuram':
          this.Brcode ='MP';
          break;
        case 'Parappur':
          this.Brcode ='PR';
          break;
        case 'Other':
          this.Brcode ='OT';
          break;
    
      }
    
      switch(this.medium){
        case 'English':
          this.Mcode = 'EN';
          break;
        case 'Malayalam':
          this.Mcode = 'ML';
      }
      this.Ccode = this.class.split(" ").join("");
      this.Rand=Math.floor((Math.random() * 10000) + 1);
    
      this.Uid = this.Brcode+this.Ccode+this.Mcode+this.Rand;
      console.log("genrated id",this.Uid);
      
    
      

            this.userservice.userdata ={
              name: this.name,
              email:this.Uid,
              name_of_school : this.school, 
              student_phone_no : this.student_num,
              parent_phone_no : this.parent_num,
              medium : this.medium,
              class : this.class,
              password : this.password,
              packageId : this.package,
              packageName:this.packageName,
              branch: this.branch,
              transactionId : this.transactionId ,
              transaction_status : this.transaction_status,
              mode : this.paymenttype,
              amount : this.price,
              Images: this.userImagePath

            }
       
        this.service.registerStudent(this.formdata, this.userImagePath,this.transactionId,this.transaction_status).subscribe(
          (resp) => {
            
            console.log("enrolled",resp)
            this.router.navigateByUrl('/enrolled');
            
          },
          (err) => {
            
          },
        );

  }



}
