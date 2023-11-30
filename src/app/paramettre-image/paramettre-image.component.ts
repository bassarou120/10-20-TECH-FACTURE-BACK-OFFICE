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
import {ParamettreImageService} from '../services/paramettre-image.service';


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
    selector: 'app-paramettre-image',
    templateUrl: './paramettre-image.component.html',
    styleUrls: ['./paramettre-image.component.styl']
})
export class ParamettreImageComponent implements OnInit {
    constructor(private reshaocService: ReshaocService, private router: Router,
                private activeRoute: ActivatedRoute,
                private paramettreImageService:ParamettreImageService) { }


    public editorSponsore;

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
    imgToUpload: File = null;
    url: string = environment.accet_url
    imgActivitePhare;
    imgArticle;
    imgAgenda;
     imgPresentation
     imgMissions
     imgObjectifs
    imgOrganisation
    imgDocuments
    imgPlan
    PARTENARIAT_SUD_SUD
    PARTENARIAT_INTER_HOSPITALIERE
    COOPERATION_INTERNATIONALE
    RELATION_APPUI_SPONSORING
    JOURNEE_HOSPITALIERE
    JOURNEE_COOPERATION
    JOURNEE_SCIENTIFIQUE
    AUTRE_EVERNEMENT

    ngOnInit() {
      this.getSponsore();

        this.getAllImage()

    }
    handleImgInput(event) {
        this.imgToUpload = event.target.files[0];
        console.log(this.imgToUpload.name);
    }


  getSponsore(){
      this.paramettreImageService.getSponsore("SPONSORE").subscribe(response => {

          this.editorSponsore.root.innerHTML=response['data'].value
          // alert(JSON.stringify(response['data'].value))

      },error => {

      })


  }

    uploadImageSponsore(){

         this.paramettreImageService.updateSponsore({
             "key":"SPONSORE",
             "value":this.editorSponsore.root.innerHTML
         }).subscribe(response => {


             alert("BIEN ENREGISTRE")
            // alert(JSON.stringify(response['data'].value))

         },error => {

         })

         // alert(JSON.stringify( this.editorSponsore.root.innerHTML))

        // data.append('content', this.editorSponsore.root.innerHTML);

    }

    uploadImage(type){

        if (this.imgToUpload!=null){
            const data = new FormData();
            // data.append('Content-Type', 'multipart/form-data');

            data.append('image', <File>this.imgToUpload);
            data.append('type', type);
            data.append('title', type);

            this.paramettreImageService.updateOrSaveImage(data)
                .subscribe(response => {

                    this.imgToUpload=null
                    alert("Enregistrement réussi !")

                    // alert(JSON.stringify(response['data']))

                    //
                    // this.notificationForm(
                    //     "success",
                    //     "Enregistrement réussi !"
                    // );
                    console.log(response);

                    $('#sbt_btn').removeClass('disabled');
                    $('#spinner').addClass('d-none')
                    // $('#spinner').removeClass('d-none');


                }, (error: HttpErrorResponse) => {
                    console.log("Error while saving data");
                    // this.notificationForm(
                    //     "danger",
                    //     "Erreur lors de l'enregistrement !"
                    // );
                })

        }else {
            alert("Veuillez selectinnez une image d'abord")
        }


    }


    getAllImage(){

        this.paramettreImageService.getAllImage()  .subscribe(response => {

            let list=response['data'].data;

            // alert(JSON.stringify(list))




            let a;
            for (const listKey in list) {

                // alert(JSON.stringify(list[listKey].type))
                list[listKey].type=="ACTIVITE-PHARE" ? this.imgActivitePhare=list[listKey].image: a=0;
                list[listKey].type=="ARTICLE" ? this.imgArticle=list[listKey].image:a=0;
                list[listKey].type=="AGENDA" ? this.imgAgenda=list[listKey].image:a=0;



                list[listKey].type=="PRESENTATION-RESHAOC" ? this.imgPresentation=list[listKey].image:a=0;
                list[listKey].type=="MISSIONS" ? this.imgMissions=list[listKey].image:a=0;
                list[listKey].type=="OBJECTIFS" ? this.imgObjectifs=list[listKey].image:a=0;
                list[listKey].type=="ORGANISATION" ? this.imgOrganisation=list[listKey].image:a=0;
                list[listKey].type=="DOCUMENTS" ? this.imgDocuments=list[listKey].image:a=0;
                list[listKey].type=="PLAN" ? this.imgPlan=list[listKey].image:a=0;

                list[listKey].type=="PARTENARIAT-SUD-SUD" ? this.PARTENARIAT_SUD_SUD=list[listKey].image:a=0;
                list[listKey].type=="PARTENARIAT-INTER-HOSPITALIERE" ? this.PARTENARIAT_INTER_HOSPITALIERE=list[listKey].image:a=0;
                list[listKey].type=="COOPERATION-INTERNATIONALE" ? this.COOPERATION_INTERNATIONALE=list[listKey].image:a=0;
                list[listKey].type=="RELATION-APPUI-SPONSORING" ? this.RELATION_APPUI_SPONSORING=list[listKey].image:a=0;

                list[listKey].type=="JOURNEE-HOSPITALIERE" ? this.JOURNEE_HOSPITALIERE=list[listKey].image:a=0;
                list[listKey].type=="JOURNEE-COOPERATION" ? this.JOURNEE_COOPERATION=list[listKey].image:a=0;
                list[listKey].type=="JOURNEE-SCIENTIFIQUE" ? this.JOURNEE_SCIENTIFIQUE=list[listKey].image:a=0;
                list[listKey].type=="AUTRE-EVERNEMENT" ? this.AUTRE_EVERNEMENT=list[listKey].image:a=0;

            }



        }, (error: HttpErrorResponse) => {
            console.log("Error while saving data");
            // this.notificationForm(
            //     "danger",
            //     "Erreur lors de l'enregistrement !"
            // );
        })

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


//    data = new FormData();
//     enregistrer(type){
//
//
//
// let content=""
//
//         switch (type) {
//             case "presentation":
//                 content= this.editorPresention.root.innerHTML
//                 break;
//             case "mission":
//                 content= this.editorMission.root.innerHTML
//                 break;
//             case "objectif":
//                 content= this.editorObjectif.root.innerHTML
//                 break;
//
//             case "organisation":
//                 content= this.editorOrganisation.root.innerHTML
//                 break;
//             case "plan":
//                 content= this.editorPlan.root.innerHTML
//                 break;
//
//         }
//
//
//
//         this.reshaocService.updateReshaoc({
//             "type":type,
//             "content":content
//
//         }, this.reshaoc.id).subscribe(
//             response=>{
//                 alert(JSON.stringify(response))
//             },
//             error => {}
//         )
//
//
//
//     }


    //editorSponsore
    onEditorBluredSponsore(quill) {
        this.editorSponsore = quill;
    }

    onEditorCreatedSponsore(quill) {
        this.editorSponsore = quill;
    }

    onEditorFocusedSponsore(quill) {
    }

    onContentChangedSponsore({ quill, html, text }) {
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

