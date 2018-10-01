import { Component, OnInit } from '@angular/core';
import { Image } from '../../shared/models/image.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ImagesService } from '../images.service';
import { Observable} from 'rxjs';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  image: Observable<any>;
  imageId: string;
  likeState: Observable<boolean>;
  defAvatarPath: string; 
  editMode: boolean = false;
  imageEditForm: FormGroup;
  removable: boolean = true;
  addOnBlur: boolean = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private route: ActivatedRoute, 
            private router: Router,
            private imagesService: ImagesService,
            private fb: FormBuilder,
            private auth: AuthService,
            private userService: UserService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(
        (params: ParamMap) => {
          this.imageId = params.get('id');
          this.image = this.imagesService.getImage(this.imageId);          
        }
      )

    this.route.queryParamMap
      .subscribe(
        (params: ParamMap) => {
          if (params.get('mode') === 'edit') {
            this.editMode = true;
          }
        }
      )
    
    this.image
      .subscribe(
        (imageData:Image) => {          
          if (this.editMode && this.auth.isAuthenticated() && this.auth.getCurUser().uid === imageData.author.id) {
            this.createImageEditForm(imageData);
          } else {
            this.editMode = false;
          }
        }
      )
    
    this.likeState = this.imagesService.getImageLikeState(this.imageId);   
    
    this.defAvatarPath = this.userService.getDefAvatar();
  }

  updateLikes() {    
    this.imagesService.updateLikes(this.imageId);
  }

  onSave(form: FormGroup) {
    this.imagesService.updateImage(this.imageId, form.value);
  }

  onDelete() {
    this.imagesService.deleteImage(this.imageId);
    this.router.navigate(['/user']);
  }

  private createImageEditForm(imageData) {
    this.imageEditForm = this.fb.group({
      tags: this.fb.array(imageData.tags),
      descr: [imageData.descr]
    })
    
  }

  get tagsFormArray(): FormArray {
    return this.imageEditForm.get('tags') as FormArray;
  }

  remove(tag) {
    const idx = this.imageEditForm.get('tags').value.indexOf(tag);
    this.tagsFormArray.removeAt(idx);
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tagsFormArray.push(this.fb.control(value.trim().toLowerCase()));
    }

    if (input) {
      input.value = '';
    }
  }

}
