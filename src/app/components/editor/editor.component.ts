import {Component,OnInit} from '@angular/core';
import * as Quill from 'quill';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.styl']
})
export class EditorComponent  implements OnInit {
    constructor() { }
    ngOnInit() {
        const fullToolbar = [
            [
              {
                font: []
              },
              {
                size: []
              }
            ],
            ['bold', 'italic', 'underline', 'strike'],
            [
              {
                color: []
              },
              {
                background: []
              }
            ],
            [
              {
                script: 'super'
              },
              {
                script: 'sub'
              }
            ],
            [
              {
                header: '1'
              },
              {
                header: '2'
              },
              'blockquote',
              'code-block'
            ],
            [
              {
                list: 'ordered'
              },
              {
                list: 'bullet'
              },
              {
                indent: '-1'
              },
              {
                indent: '+1'
              }
            ],
            [
              'direction',
              {
                align: []
              }
            ],
            ['link', 'image', 'video', 'formula'],
            ['clean']
          ];
        
          const fullEditor = new Quill('#full-editor', {
            bounds: '#full-editor',
            placeholder: 'Type Something...',
            modules: {
              formula: true,
              toolbar: fullToolbar
            },
            theme: 'snow'
          });
    }
}
