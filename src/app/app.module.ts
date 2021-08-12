import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FormsModule } from '@angular/forms';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';




@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    FilterPipePipe,   
    CarFilterComponent, FavoriteComponent, CreditCardComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass:"toast-top-left"}),
    
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
