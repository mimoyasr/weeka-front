//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//App component
import { AppComponent } from './app.component';
import { HomeGuestComponent } from './home-guest/home-guest.component';
import { FooterComponent } from './footer/footer.component';
import { MealCardComponent } from './meal-card/meal-card.component';
import { StarRatingModule } from 'angular-star-rating';

//services
import { QueryService } from './query.service';

const appRoutes: Routes = [
  { path: '',component:HomeGuestComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    HomeGuestComponent,
    FooterComponent,
    MealCardComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    StarRatingModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [QueryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
