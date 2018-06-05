//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RatingModule } from "ngx-rating";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ImageUploadModule } from "angular2-image-upload";



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
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { CartComponent } from './cart/cart.component';
import { EditCookerComponent } from './edit-cooker/edit-cooker.component';
import { NgbdRatingBasic } from './rating';
import { AddNewMealComponent } from './add-new-meal/add-new-meal.component';
import { NotificationComponent } from './notification/notification.component';
import { CookerDataComponent } from './cooker-data/cooker-data.component';
import { ClientOrderComponent } from './client-order/client-order.component';


//services
import { QueryService } from './query.service';
import { TransferDataService} from './transfer-data.service';
// import { AddNewMealComponent } from './add-new-meal/add-new-meal.component';

const appRoutes: Routes = [
  { path: '', component: HomeGuestComponent },
  { path: 'becomeacooker', component: BecomeAcookerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'singleItem/:name', component: SingleItemComponent },
  { path: 'newMeal', component: AddNewMealComponent },
  { path: 'editCooker', component: EditCookerComponent },
  { path: 'clientOrder', component: ClientOrderComponent }   


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
    CartComponent,
    HomeMenuComponent,
    AddNewMealComponent,
    EditCookerComponent,
    NotificationComponent,
    CookerDataComponent,
    ClientOrderComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    StarRatingModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RatingModule,
    BrowserAnimationsModule,
    // ImageUploadModule.forRoot()
  ],
  providers: [QueryService, TransferDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
