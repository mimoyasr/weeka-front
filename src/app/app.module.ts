//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {RatingModule} from "ngx-rating";
//App component
import { AppComponent } from './app.component';
import { HomeGuestComponent } from './home-guest/home-guest.component';
import { FooterComponent } from './footer/footer.component';
import { MealCardComponent } from './meal-card/meal-card.component';
import { StarRatingModule } from 'angular-star-rating';
import { BecomeAcookerComponent } from './become-acooker/become-acooker.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { LoginComponent } from './login/login.component';

//services
import { QueryService } from './query.service';

const appRoutes: Routes = [
  { path: '',component:HomeGuestComponent },
  { path: 'becomeacooker',component:BecomeAcookerComponent},
  { path: 'login',component:LoginComponent} 
];

@NgModule({
  declarations: [
    AppComponent,
    HomeGuestComponent,
    FooterComponent,
    MealCardComponent,
    BecomeAcookerComponent,
    LoginComponent,
    SingleItemComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    StarRatingModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RatingModule
  ],
  providers: [QueryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
