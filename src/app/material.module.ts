import { NgModule } from '@angular/core';

import {MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatChipsModule,
        MatSnackBarModule
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatChipsModule,
        MatSnackBarModule
    ]
})
export class MaterialModule {}