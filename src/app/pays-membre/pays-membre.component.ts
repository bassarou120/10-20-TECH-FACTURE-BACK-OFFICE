import { Component, Renderer2, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Regulation } from 'app/models/regulation';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {PaysService} from '../services/pays.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdherantService} from '../services/adherant.service';


@Component({
    selector: 'app-pays-membre',
    templateUrl: './pays-membre.component.html',
    styleUrls: ['./pays-membre.component.styl']
})
export class PaysMembreComponent implements OnInit {


    constructor( private router: Router,
                private activeRoute: ActivatedRoute,
                 private paysService: PaysService,
                 private adherantService: AdherantService
    ) {

    }



    messageNotificationForm: string;
    isNotificationForm: boolean = false;
    spinner = false;

    listPays
    listAdherant
    listHopitauxPays
    listCotisation

    display1 = "none";
    display2 = "none";
    display3 = "none";
    displayShowModal = "none";

    titre_modal: string = "Ajouter un FAQ";
    action: string = "add";


    curent_pays_id
    hopitalForm = new FormGroup({
        libele: new FormControl('', Validators.required),
        contact: new FormControl('', Validators.required),
        adress: new FormControl(''),
        pays_id: new FormControl('' ),

    });


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;




    ngOnInit() {

        this.getPayslite();
        this.getAdherantlite();

    }


    getPayslite(){

        this.paysService.getPayslite().subscribe((response:any)=>
        {

            // alert(JSON.stringify(response['data']))

            this.listPays= response['data'];


        },(error)=>{

            alert("erreur serveur")

        })

    }

    getAdherantlite(){

        this.adherantService.getAdherantlite().subscribe((response:any)=>
        {

            // alert(JSON.stringify(response['data']))

            this.listAdherant= response['data'].data;


        },(error)=>{

            alert("erreur serveur")

        })

    }



    openModal(id_element?: number,myaction?:any) {

        // alert(myaction)
        this.curent_pays_id=id_element

        switch (myaction){
            case "add":
                this.hopitalForm.get('pays_id').setValue(id_element);
                // this.action = "edit";
                this.titre_modal = "Ajouter un hôpital";
                this.display1 = "block";
                break
            case "list":
                this.titre_modal = "Liste des  hôpitaux";
                this.display2 = "block";
                this.paysService.gethoptalByPays(id_element).subscribe((response)=>{

                    this.listHopitauxPays=response['data'];
                },(error => console.log("error")));
                break
            case "list-cotisation":
                this.titre_modal = "Liste des cotisations";
                this.display3 = "block";

                this.adherantService.getCotisationByAdherant(id_element).subscribe((response)=>{

                    this.listCotisation=response['data'];
                },(error => console.log("error")));

                break


        }




    }


    deleteElement(id: number) {
        // this.faqService.delete(id).subscribe(response => {
        //     this.notificationForm("success", "Supression réussi !");
        //     this.getList();
        // }, (error: HttpErrorResponse) => {
        //     console.log("Error while deleting data");
        // })
    }

    onClickSubmitHpoital(){

        $('#sbt_btn').removeClass('disabled');
        $('#spinner').addClass('d-none')

        if (this.hopitalForm.valid){
            const formData = this.hopitalForm.value;

            this.paysService.addHopital(formData).subscribe(
                (response:any)=>{


                    this.hopitalForm.reset() ;
                    this.hopitalForm.get('pays_id').setValue(this.curent_pays_id);
                    alert("Bien enregiter")
                },
                (error  )=>{

                }
            );


        }




    }



    checkCheckBoxvalue(event,id) {
        console.log(event.checked)
        // this.spinner = true;
        this.paysService.updateStatusPays({
            'id':id,
            'status':event.checked ? 'oui':'non'

        }).subscribe((data: any) => {
            // this.listActivite = data['data'];
            console.log(data);

            alert("Status bien modifier")


            // this.spinner = false;
        }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
        });
    }

    onCloseHandled() {
        this.display1 = "none";
        this.display2 = "none";
        this.display3 = "none";
    }

    openShowModal(id: number) {
        // this.selected_faq = this.faq.find(x => x.id == id);
        this.displayShowModal = "block";
    }

    onCloseHandledShowModal() {
        this.displayShowModal = "none";
    }



    setPaginationLabelToFrench() {
        this.paginator._intl.itemsPerPageLabel = 'Elements par page:';
        this.paginator._intl.nextPageLabel = 'Page suivante';
        this.paginator._intl.previousPageLabel = 'Page précédente';
        this.paginator._intl.getRangeLabel = this.frenchRangeLabel;
    }

    edit(id: number) {
        // this.router.navigate(['/regulation/add'], { queryParams: {
        //     id: id
        // }});
        this.router.navigate(['/regulation/add', { id: id }])
    }


    closeNotificationForm() {
        this.isNotificationForm = false;
    }



    frenchRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0 || pageSize === 0) {
            return `0 sur ${length}`;
        }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return `${startIndex + 1} - ${endIndex} sur ${length}`;
    }
}

