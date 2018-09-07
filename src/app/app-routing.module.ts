import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhotoDetailsComponent } from './gallery/photo-details/photo-details.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/gallery' },
    { path: 'gallery', component: GalleryComponent},
    { path: 'gallery/:id', component: PhotoDetailsComponent},
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', component: PageNotFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}