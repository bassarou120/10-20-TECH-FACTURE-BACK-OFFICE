import {Component,Input,OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Quill from 'quill';
import { QuillConfiguration } from './quill-configuration';

/*
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
*/

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.styl']
})

export class EditorComponent  implements OnInit {

  quillConfiguration = QuillConfiguration;
  @Input() control: FormControl;



  ngOnInit(): void {
    this.control = this.control ?? new FormControl();
   }

      /*
   // private  fullEditor :any ;
    
    // public get editor(): any{
    //    return this.fullEditor;
    // }
    
    // public set editor(val:any){
    //   this.fullEditor = val ;
    // }
    
 

    constructor() { }
    ngOnInit() {
      const fullEditor = new Quill('#full-editor', {
        bounds: '#full-editor',
        placeholder: 'Type Something...',
        modules: {
          formula: true,
          toolbar: fullToolbar
        },
        theme: 'snow'
      });

          // this.editor(new Quill('#full-editor', {
          //   bounds: '#full-editor',
          //   placeholder: 'Type Something...',
          //   modules: {
          //     formula: true,
          //     toolbar: fullToolbar
          //   },
          //   theme: 'snow'
          // }))
      
    }

    */
}
