import { Component, Renderer2, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActualiteService } from '../services/actualite.service';
import { Regulation } from 'app/models/regulation';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Actualite} from '../models/Actualite';
import {environment} from '../../environments/environment';
import {ReshaocService} from '../services/reshaoc.service';

import * as QuillNamespace from 'quill';

var Size = QuillNamespace.import("attributors/style/size");

Size.whitelist = ['8px','9px','10px','12px','14px','16px','20px','24px','32px','42px','54px','68px','84px','98px','100px',
];
QuillNamespace.register(Size, true);

const fontFamilyArr = ['Arial','Arial Black','Arial Rounded MT Bold','Apple Chancery','Times New Roman','Comic Sans MS','Impact', 'Georgia','Roman',"Roboto Condensed",'Courier', 'Garamond', 'Tahoma',  , 'Verdana', "Times New Roman", "Calibri", "Calibri Light", "Sans-Serif"];
let fonts = QuillNamespace.import("attributors/style/font");
fonts.whitelist = fontFamilyArr;
QuillNamespace.register(fonts, true);


const fullToolbar = [
    [
        {
            font: fonts.whitelist
        },
        {
            size: Size.whitelist
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

@Component({
    selector: 'app-reshaoc',
    templateUrl: './reshaoc.component.html',
    styleUrls: ['./reshaoc.component.styl']
})
export class ReshaocComponent implements OnInit {
    constructor(private reshaocService: ReshaocService, private router: Router,
                private activeRoute: ActivatedRoute) { }




    public editorPresention;
    public editorMission;
    public editorObjectif;
    public editorOrganisation;
    public editorPlan;
    spinner = false;

    public editorContent = `<h3>I am Example content</h3>`;

    public editorOptions = {
        placeholder: "insert content... ",
        modules: {
            formula: true,
            toolbar: fullToolbar
        },
    };

    reshaoc:any

    ngOnInit() {
        this.getLastReshaoc();

    }


    getLastReshaoc() {

        this.reshaocService.getReshaoc().subscribe((data: any) => {

            console.log(data['data'])

            this.reshaoc=data['data']

            this.editorPresention.root.innerHTML=data['data'].presentation
            this.editorMission.root.innerHTML=data['data'].mission
            this.editorObjectif.root.innerHTML=data['data'].objectif
            this.editorOrganisation.root.innerHTML=data['data'].organisation
            this.editorPlan.root.innerHTML=data['data'].plan

        }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
        });
    }


   data = new FormData();
    enregistrer(type){



let content=""

        switch (type) {
            case "presentation":
                content= this.editorPresention.root.innerHTML
                break;
            case "mission":
                content= this.editorMission.root.innerHTML
                break;
            case "objectif":
                content= this.editorObjectif.root.innerHTML
                break;

            case "organisation":
                content= this.editorOrganisation.root.innerHTML
                break;
            case "plan":
                content= this.editorPlan.root.innerHTML
                break;

        }



        this.reshaocService.updateReshaoc({
            "type":type,
            "content":content

        }, this.reshaoc.id).subscribe(
            response=>{
                alert("Enregistrer avec success")
            },
            error => {}
        )



    }


    //presentation
    onEditorBluredPresention(quill) {
        this.editorPresention = quill;
    }

    onEditorCreatedPresention(quill) {
        this.editorPresention = quill;
    }

    onEditorFocusedPresention(quill) {
    }

    onContentChangedPresention({ quill, html, text }) {
    }


    //Mission
    onEditorBluredMission(quill) {
        this.editorMission = quill;
    }

    onEditorCreatedMission(quill) {
        this.editorMission = quill;
    }

    onEditorFocusedMission(quill) {
    }

    onContentChangedMission({ quill, html, text }) {
    }


    //Objectif
    onEditorBluredObjectif(quill) {
        this.editorObjectif = quill;
    }

    onEditorCreatedObjectif(quill) {
        this.editorObjectif = quill;
    }

    onEditorFocusedObjectif(quill) {
    }

    onContentChangedObjectif({ quill, html, text }) {
    }

    //Organisation
    onEditorBluredOrganisation(quill) {
        this.editorOrganisation = quill;
    }

    onEditorCreatedOrganisation(quill) {
        this.editorOrganisation = quill;
    }

    onEditorFocusedOrganisation(quill) {
    }

    onContentChangedOrganisation({ quill, html, text }) {
    }


    //Plan
    onEditorBluredPlan(quill) {
        this.editorPlan = quill;
    }

    onEditorCreatedPlan(quill) {
        this.editorPlan = quill;
    }

    onEditorFocusedPlan(quill) {
    }

    onContentChangedPlan({ quill, html, text }) {
    }




}

