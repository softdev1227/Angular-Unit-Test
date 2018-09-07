import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatChip} from '@angular/material';

import { Image } from '../../shared/models/image.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UploadService } from './upload.service';
import { QueryList } from '@angular/core/src/render3';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  image: Image;
  imageToUpload: File;
  imageUploadForm: FormGroup;
  removable: boolean = true;
  addOnBlur: boolean = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder, 
            private uploadService: UploadService) { }

  ngOnInit() {
    this.createUploadForm();
  }

  get tagsFormArray(): FormArray {
    return this.imageUploadForm.get('tags') as FormArray;
  }

  remove(tag) {
    const idx = this.imageUploadForm.get('tags').value.indexOf(tag);
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

  handleFileInput(files: FileList) {
    this.imageToUpload = files.item(0);
  }

  createUploadForm() {
    this.imageUploadForm = this.fb.group({
      imgFile: ['', Validators.required],
      tags: this.fb.array([]),
      descr: ''
    })
  }

  resetForm() {
    this.imageUploadForm.reset();
    for(let i = this.tagsFormArray.length-1; i >= 0; i-- ) {
      this.tagsFormArray.removeAt(i);      
    }  
  }

  onSubmit() {
    this.uploadService.uploadImage(this.imageUploadForm.value, this.imageToUpload);
    this.resetForm();
    this.imageToUpload = null;
  }

}
