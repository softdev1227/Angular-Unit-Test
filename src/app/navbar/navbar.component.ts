import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userAvatarImgPath: string;
  subsStatus: Subscription;
  subsAva: Subscription;

  constructor(private authService: AuthService, 
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.subsStatus = this.authService.userSignedInStatus
      .subscribe(
        (flag: boolean) => {
          flag ? this.getUserAvatar() : ''
        }
      )

    this.subsAva = this.userService.userAvatarChanged
      .subscribe(
        (newImgPath: string) => {
          this.userAvatarImgPath = newImgPath;
        }
      )
  }

  ngOnDestroy() {
    this.subsStatus.unsubscribe();
    this.subsAva.unsubscribe();
  }

  checkAuthState() {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logout()
      .then(res => {
        this.router.navigate(['/gallery'])
      })
  }

  getUserAvatar() {
    this.userAvatarImgPath = this.userService.getUser().photoURL || this.userService.getDefAvatar();
  }
}
