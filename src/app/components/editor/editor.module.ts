import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponent} from './editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from "ngx-quill";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule, 
        QuillModule,
        FormsModule

    ],
    declarations: [
        // EditorComponent
    ],
    exports: [
        // EditorComponent
    ]
})
export class EditorModule {}
