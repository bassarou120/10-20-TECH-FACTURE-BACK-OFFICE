import { Component, Renderer2, OnInit, Inject, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import {ReshaocService} from '../services/reshaoc.service';
import {ParamettreImageService} from '../services/paramettre-image.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


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



@Component({
    selector: 'app-paramettre-generale',
    templateUrl: './paramettre-general.component.html',
    styleUrls: ['./paramettre-general.component.styl']
})
export class ParamettreGeneralComponent implements OnInit {
    constructor(private reshaocService: ReshaocService, private router: Router,
                private activeRoute: ActivatedRoute,
                private paramettreImageService:ParamettreImageService) { }




    public editorPresention;
    public editorMission;
    public editorObjectif;
    public editorOrganisation;
    public editorPlan;
    spinner = false;

    fileToUpload: File = null;

    public editorContent = `<h3>I am Example content</h3>`;

    public editorOptions = {
        placeholder: "insert content... ",
        modules: {
            formula: true,
            toolbar: fullToolbar
        },
    }

    actualiteForm = new FormGroup({
        titre: new FormControl('', Validators.required),
        lieu: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        date_fin: new FormControl('', Validators.required),
        description: new FormControl(''),
    });


    paramettreForm = new FormGroup({
        frais_adhesion_physique: new FormControl('', Validators.required),
        frais_adhesion_morale: new FormControl('', Validators.required),
        adress: new FormControl('', Validators.required),
        telephone: new FormControl('' , Validators.required),
        email: new FormControl('', Validators.required ),

    });





    ngOnInit() {


    }

    onClickSubmit(): void {

        if (!this.paramettreForm.invalid) {
            $('#sbt_btn').addClass('disabled');

            $('#spinner').removeClass('d-none')

            const formData = this.paramettreForm.value;

            // const data = new FormData();
            // // data.append('Content-Type', 'multipart/form-data');
            // data.append('lettre', <File>this.fileToUpload);
            //
            // data.append('frais_adhesion', formData.frais_adhesion);
            // data.append('adress', formData.adress);
            // data.append('telephone', formData.telephone);
            // data.append('email', formData.email);


            alert(JSON.stringify(formData))
        }

    }


    get frais_adhesion_physique(): any {
        return this.paramettreForm.get('frais_adhesion_physique');
    }

    get frais_adhesion_morale(): any {
        return this.paramettreForm.get('frais_adhesion_morale');
    }
    get adress(): any {
        return this.paramettreForm.get('adress');
    }
   get telephone(): any {
        return this.paramettreForm.get('telephone');
    }

    get email(): any {
        return this.paramettreForm.get('email');
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


    handleFileInput(event) {
        this.fileToUpload = event.target.files[0];
        console.log(this.fileToUpload.name);
    }



}

