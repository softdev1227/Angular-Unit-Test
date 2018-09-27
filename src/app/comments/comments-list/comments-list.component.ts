import { Component, OnInit } from '@angular/core';
import { Comment } from '../../shared/models/comment.model';
import { CommentService } from '../comment.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  comments: Observable<any>;
  photoId: string;

  constructor(private commentsService: CommentService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.photoId = this.route.snapshot.params.id;
    this.comments = this.commentsService.getComments(this.photoId);
  }

}
