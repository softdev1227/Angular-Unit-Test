import { Component, OnInit } from '@angular/core';
import { Image } from '../../shared/models/image.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ImagesService } from '../images.service';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  image: Observable<any>;
  imageId: string;
  likeState: Observable<boolean>;

  constructor(private route: ActivatedRoute, 
            private imagesService: ImagesService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(
        (params: ParamMap) => {
          this.imageId = params.get('id');
          this.image = this.imagesService.getImage(this.imageId);          
        }
      )
    
    this.likeState = this.imagesService.getImageLikeState(this.imageId);       
  }

  updateLikes() {    
    this.imagesService.updateLikes(this.imageId);
  }

}
