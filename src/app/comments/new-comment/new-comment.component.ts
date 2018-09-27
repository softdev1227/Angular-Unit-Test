import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  newCommentForm: FormGroup;
  photoId: string;
  isAuthinticated: boolean = false;

  constructor(private fb: FormBuilder, 
            private commentService: CommentService,
            private route: ActivatedRoute,
            private auth: AuthService) { }

  ngOnInit() {
    this.newCommentForm = this.fb.group({
      message: [null, Validators.required]
    })
    this.isAuthinticated = this.auth.isAuthenticated();
    this.photoId = this.route.snapshot.params.id;    
  }

  onSubmit(form: FormGroup) {    
    this.commentService.save(this.photoId, form.value.message);
    this.newCommentForm.reset();
  }

}
