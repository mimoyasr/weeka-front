//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RatingModule } from "ngx-rating";
//App component
import { AppComponent } from './app.component';
import { HomeGuestComponent } from './home-guest/home-guest.component';
import { FooterComponent } from './footer/footer.component';
import { MealCardComponent } from './meal-card/meal-card.component';
import { StarRatingModule } from 'angular-star-rating';
import { BecomeAcookerComponent } from './become-acooker/become-acooker.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MealCommentComponent } from './meal-comment/meal-comment.component';


//services
import { QueryService } from './query.service';

const appRoutes: Routes = [
<<<<<<< HEAD
  { path: '',component:HomeGuestComponent },
  { path: 'becomeacooker',component:BecomeAcookerComponent},
  { path: 'login',component:LoginComponent},
  { path: 'registration',component:RegistrationComponent},
   
=======
>>>>>>> 4a65d9d109698a283f82e77ede6bda010ecc6e50
  { path: '', component: HomeGuestComponent },
  { path: 'becomeacooker', component: BecomeAcookerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'singleItem/:name', component: SingleItemComponent }


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
    RegistrationComponent,
    MealCommentComponent,
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
