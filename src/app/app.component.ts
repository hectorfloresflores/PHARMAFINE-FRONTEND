import { Component } from '@angular/core';
//import { cloudinary }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PharmaFine';

  /* ngAfterViewInit(){

    cloudinary.openUploadWidget({
      cloudName: cloudName,
      apiKey : apiKey,
      inlineContainer:document.getElementById('my-widget-container'),
    }, (err, result)=>{
      console.log(err)
      console.log(result)
    })
  
  } */
}
