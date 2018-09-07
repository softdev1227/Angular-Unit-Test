import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { MasonryModule } from 'angular2-masonry';
import { NgxMasonryModule } from 'ngx-masonry';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhotoDetailsComponent } from './gallery/photo-details/photo-details.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { MessagesService } from './shared/services/messages.service';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UploadComponent } from './user/upload/upload.component';
import { UserGalleryComponent } from './user/user-gallery/user-gallery.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { Provider } from '@angular/compiler/src/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    GalleryComponent,
    PageNotFoundComponent,
    PhotoDetailsComponent,
    NavbarComponent,
    UserComponent,
    UserDetailsComponent,
    UploadComponent,
    UserGalleryComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxMasonryModule
  ],
  providers: [MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
