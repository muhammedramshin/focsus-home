import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  banners:any;
  allbanners:any=[];
  sliderObj: Array<{image: string, thumbImage: string}> = [
    {
      image: '',
      thumbImage: '',
    },
    
  ];
  imageObject = [{
    image: 'assets/shot1.png',
    thumbImage: 'assets/shot1.png',
    
}, {
  image: 'assets/shot1.png',
  thumbImage: 'assets/shot2.png',
}, {
  image: 'assets/shot1.png',
  thumbImage: 'assets/shot3.png',
    
},{
    image: 'assets/shot1.png',
    thumbImage: 'assets/shot4.png',
    
}, {
  image: 'assets/shot1.png',
  thumbImage: 'assets/shot5.png',
}];

  constructor( private service: ApiService) { }

  ngOnInit(): void {
    
    
      this.service.banners().subscribe(
        (data:any)=>{
          this.banners= data['data'];
          console.log(this.banners)
          this.banners.forEach(element => {
            console.log("banner")
            console.log(element['banner_url']);

            let tempObj = {
              image: element['banner_url'],
              thumbImage: element['banner_url'],
            }
            
            this.sliderObj.push(tempObj);
            
          });
          console.log(this.sliderObj);
        }
       
      );
      

      // let temp:any =[];
      // this.banners.forEach(element => {
        
      //   let tempobj = {
      //     image: element['banner_url'],
      //     thumbImage: element['banner_url'],
      //   }
      //   temp.push(tempobj);
      //   this.allbanners = temp;
      
      //   console.log(this.allbanners);

      // });
      
      // this.banners.forEach(element => {
      //   let tempobj = {
      //     'Category Id': element['cat_id'],
      //     'Category Name': element['cat_name'],
      //     'Description': element['cat_description']
      //   }
      //   tempdata.push(tempobj);
      // });

      

  }
 
 
  

 
}
