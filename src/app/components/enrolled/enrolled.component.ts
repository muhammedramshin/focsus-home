import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { from } from 'rxjs';
import{UserService} from 'src/app/services/user.service';
// import jspdf from 'jspdf';
import { jsPDF } from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';


import html2canvas from 'html2canvas';  
@Component({
  selector: 'app-enrolled',
  templateUrl: './enrolled.component.html',
  styleUrls: ['./enrolled.component.scss']
})
export class EnrolledComponent implements OnInit {
id:any;
status:any;
userdata:any;
imgsrc:any ="";

  
@ViewChild("htmlData") htmlData:ElementRef | undefined;

  constructor(private userservice:UserService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("orderid");
    this.status = localStorage.getItem("status");
    this.userdata = this.userservice.userdata;
    console.log("userdataa",this.userdata);
    if(this.userdata){
      this.imgsrc = this.userdata.Images;
    }
    console.log(this.userdata);
    

  }

  

 

  public convetToPDF()
{
var data1:any = document.getElementById('htmlData');
html2canvas(data1).then(canvas => {
// Few necessary setting options
var imgWidth = 208;
var pageHeight = 295;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;
 
const contentDataURL = canvas.toDataURL('image/jpeg', 1.0);
let pdf = new jsPDF('p', 'pt', 'a4'); // A4 size page of PDF
var position = 0;
pdf.addImage(contentDataURL, 'jpg', 0, position, imgWidth, imgHeight,'none');
pdf.save('new-file.pdf'); // Generated PDF
});
}


// public SavePDF(): void {  
//   let content=this.htmlData?.nativeElement;  
//   let doc = new jspdf();  
//   let _elementHandlers =  
//   {  
//     '#editor':function(element,renderer){  
//       return true;  
//     }  
//   };  
//   doc.fromHTML(content.innerHTML,15,15,{  

//     'width':190,  
//     'elementHandlers':_elementHandlers  
//   });  

//   doc.save('test.pdf');  
// }  



openPDF(): void {
  const DATA = this.htmlData?.nativeElement;
  const doc: jsPDF = new jsPDF('p', 'pt', "A4");
  doc.html(DATA, {
    // margin: [20, 10, 20  ,10],
     callback: (doc) => {
      html2canvas(DATA).then(canvas => {
        // var imgWidth = 158;
        // var imgHeight = canvas.height * imgWidth / canvas.width;
        // const contentDataURL = canvas.toDataURL('image/jpg') 
        // var position = 0;
        
        // doc.addImage(contentDataURL, 'jpg', 0, position, imgWidth, imgHeight)
        
      //  doc.output("dataurlnewwindow");
       doc.save('download.pdf');
      });
    },
    x: 100,
    y: 50,
  });
}
 




}
