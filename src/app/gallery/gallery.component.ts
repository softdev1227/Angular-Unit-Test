import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, DoCheck } from '@angular/core';
import { Image } from '../shared/models/image.model';
import { ImagesService } from './images.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  images: Observable<any>;
  @Input() searchText: string;
  sortByValue: string = '';

  constructor(private imagesService: ImagesService, 
            private db: AngularFireDatabase,
            private route: ActivatedRoute) { }

  ngOnInit() {
    this.images = this.imagesService.getImages(this.sortByValue); 

    this.route.queryParamMap
      .subscribe(
        (params: ParamMap) => {                    
          if (params) {
            this.sortPhotos(params.get('order'))
          }
        }
      )
  }

  sortPhotos(val: string) {
    this.sortByValue = val;
    this.images = this.imagesService.getImages(this.sortByValue); 
  }


}
