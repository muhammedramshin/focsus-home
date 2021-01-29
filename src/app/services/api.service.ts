import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: any;
  constructor(private http: HttpClient,) {
    this.baseUrl = 'https://maths-guru.com/'
   }


   packages() {
    return this.http.get(this.baseUrl + 'api/package_no_auth');
  }

  classes() {
    return this.http.get(this.baseUrl + 'api/class_no_auth');
  }
  
  banners(){
    return this.http.get(this.baseUrl + 'api/banner/all');
    
  }

  fileUpload(image:any) {
    const formdata = new FormData();
    formdata.append('images', image);
    return this.http.post(this.baseUrl + 'api/upload_no_auth', formdata);
  }

  registerStudent(user: any, image: any,transactionId:any,transaction_status:any) {
    
   let temp = {
      name : user.name ,
      email : user.email ,
      name_of_school : user.school ,
      student_phone_no : user.student_num ,
      parent_phone_no : user.parent_num ,
      images :  image ,
      medium :  user.medium,
      branch: user.branch,
      class_ :  user.class ,
      password :user.password ,
      packageId :user.package,
      transactionId :transactionId,
      transaction_status : transaction_status ,
      mode : user.paymenttype ,
      amount : user.price 
 }



    // const formdata = new FormData();
    // formdata.append('name', user.name);
    // formdata.append('email', user.email);
    // formdata.append('name_of_school', user.school);
    // formdata.append('student_phone_no', user.student_num);
    // formdata.append('parent_phone_no', user.parent_num);
    // formdata.append('medium', user.medium);
    // formdata.append('class', user.class);
    // formdata.append('password', user.password);
    // formdata.append('packageId', user.package);
    // formdata.append('transactionId', transactionId);
    // formdata.append('transaction_status', transaction_status);
    // formdata.append('mode', user.paymenttype);
    // formdata.append('amount', user.price);
    
    // if (image != '') {
    //   formdata.append('images', image);
    // }
    // console.log(transactionId+transaction_status)
    return this.http.post(this.baseUrl + 'api/register_web', temp);

  }




}
