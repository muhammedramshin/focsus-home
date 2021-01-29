import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FeaturesComponent } from './components/features/features.component';
import { NgImageSliderModule } from 'ng-image-slider';
import {FormsModule} from "@angular/forms";
import { SliderModule } from 'angular-image-slider';
import { FooterComponent } from './components/footer/footer.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { EnrolledComponent } from './components/enrolled/enrolled.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FeaturesComponent,
    FooterComponent,
    EnrollComponent,
    EnrolledComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SliderModule,
    BrowserAnimationsModule,
    NgImageSliderModule,
    FormsModule,
    NgxPayPalModule,
    HttpClientModule,
    ToastrModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
