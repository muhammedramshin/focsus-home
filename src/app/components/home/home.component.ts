import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imageObject = [{
    image: '../../../assets/shot1.png',
    thumbImage: '../../../assets/shot1.png',
    
}, {
  image: '../../../assets/shot1.png',
  thumbImage: '../../../assets/shot2.png',
}, {
  image: '../../../assets/shot1.png',
  thumbImage: '../../../assets/shot3.png',
    
},{
    image: '../../../assets/shot1.png',
    thumbImage: '../../../assets/shot4.png',
    
}, {
  image: '../../../assets/shot1.png',
  thumbImage: '../../../assets/shot5.png',
}];

  constructor() { }

  ngOnInit(): void {
    

  }
 

 
}
