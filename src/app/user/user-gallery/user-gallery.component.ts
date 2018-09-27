import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../../shared/models/image.model';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.css']
})
export class UserGalleryComponent implements OnInit {

  images: Observable<any>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.images = this.userService.getUserImages();    
  }

}
