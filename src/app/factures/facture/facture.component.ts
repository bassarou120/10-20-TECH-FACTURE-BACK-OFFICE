/** @format */

import { Component, Renderer2, OnInit, Inject, ViewChild } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ClientService } from "../../services/client.service";
import { Regulation } from "app/models/regulation";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Actualite } from "../../models/Actualite";
import { environment } from "../../../environments/environment";
import { ThemePalette } from "@angular/material/core";
import { ProduitService } from "../../services/produit.service";
import { FactureService } from "../../services/facture.service";

// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-regulations",
  templateUrl: "./facture.component.html",
  styleUrls: ["./facture.component.styl"],
})
export class FactureComponent implements OnInit {
  constructor(
    private produitService: ProduitService,
    private factureService: FactureService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  color: ThemePalette = "accent";
  checked = false;
  disabled = false;

  listFacture: Array<any> = [];

  listlistFacturePoint: Array<Actualite> = [];
  url: string = environment.accet_url;

  typeNotificationForm: string;
  messageNotificationForm: string;
  isNotificationForm: boolean = false;
  spinner = true;
  displayedColumnsActivite = ["id", "type", "titre", "action"];
  dataSourceActivite: MatTableDataSource<Actualite>;
  dataSourceArticle: MatTableDataSource<Actualite>;
  dataSourceAgenda: MatTableDataSource<Actualite>;
  dataSourceJourne: MatTableDataSource<Actualite>;

  display = "none";
  displayShowModal = "none";

  titre_modal: string = "Ajouter un FAQ";
  action: string = "add";
  curentFacture;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.getlistFacture();
  }

  afficheFacture(action: string, id: number) {
    // alert(action);

    this.factureService.getFactureEtDetailById(id).subscribe(
      (data: any) => {
        this.curentFacture = data["data"];

        // alert(JSON.stringify(this.curentFacture["detailFacture"]));
        this.generatePDF(action);
        this.spinner = false;
      },
      (error: HttpErrorResponse) => {
        console.log("Error while retrieving data");
      }
    );
  }

  generatePDF(action = "open") {
    let docDefinition = {
      content: [
        {
          text: "10-20-TECH-FATURE",
          fontSize: 16,
          alignment: "center",
          color: "#047886",
        },
        {
          text: "FACTURE",
          fontSize: 20,
          bold: true,
          alignment: "center",
          decoration: "underline",
          color: "skyblue",
        },
        {
          text: "Client",
          style: "sectionHeader",
        },

        {
          columns: [
            [
              {
                text: `${this.curentFacture["facture"][0].nom} ${this.curentFacture["facture"][0].prenom}`,
                bold: true,
              },
              { text: `${this.curentFacture["facture"][0].adresse}` },
              { text: `${this.curentFacture["facture"][0].email}` },
              { text: `${this.curentFacture["facture"][0].telephone}` },
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: "right",
              },
              {
                text: `No facture :000 ${this.curentFacture["facture"][0].id} `,
                alignment: "right",
              },
            ],
          ],
        },

        {
          text: "Details",
          style: "sectionHeader",
        },

        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto", "auto"],
            body: [
              ["No", "Désignation", "P.U", "Qte", "Montant"],
              ...this.curentFacture["detailFacture"].map((p, index) => [
                index + 1,
                p.designation,
                p.prix,
                p.qte,
                (p.prix * p.qte).toFixed(2),
              ]),
            ],
          },
        },

        ,
        {
          text: "TOTAL",
          style: "sectionHeader",
        },
        {
          ul: [
            `TOTAL HT :  ${this.curentFacture["facture"][0].montant} FCFA `,
            `TVA (18%) :  ${this.curentFacture["facture"][0].montant * 0.18} `,
            `TTC :  ${
              this.curentFacture["facture"][0].montant +
              this.curentFacture["facture"][0].montant * 0.18
            } FCFA`,
          ],
        },

        {
          text: " ",
          style: "sectionHeader",
        },

        {
          text: "",
          margin: [0, 0, 0, 15],
        },

        {
          columns: [
            [
              {
                qr: `10-20-tech-facture ${new Date().toLocaleString()}`,
                fit: "50",
              },
            ],
            [{ text: "Signature", alignment: "right", italics: true }],
          ],
        },

        // {
        //   text: "Terms and Conditions",
        //   style: "sectionHeader",
        // },
        // {
        //   ul: [
        //     "Order can be return in max 10 days.",
        //     "Warrenty of the product will be subject to the manufacturer terms and conditions.",
        //     "This is system generated invoice.",
        //   ],
        // },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: "underline",
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
      },
    };

    if (action === "download") {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === "print") {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }

  getlistFacture(): void {
    this.factureService.list().subscribe(
      (data: any) => {
        this.listFacture = data["data"];

        //this.dataSource=data['data'];
        // this.dataSourceActivite = new MatTableDataSource(data['data']);

        // this.dataSourceActivite.paginator = this.paginator;
        // this.dataSourceActivite.sort = this.sort;
        // this.setPaginationLabelToFrench();
        this.spinner = false;
      },
      (error: HttpErrorResponse) => {
        console.log("Error while retrieving data");
      }
    );
  }

  openModal(id_element?: number) {
    if (id_element) {
      this.action = "edit";
      this.titre_modal = "Editer un FAQ";

      // var el = this.faq.find(x => x.id == id_element);
      // this.selected_faq = el;

      // this.question.reset({ value: el.question })
      // this.answer.reset({ value: el.content })

      // this.faqForm.patchValue({
      //     question: el.question,
      //     answer: el.content,
      //     job: el.job,
      // });
    } else {
      this.titre_modal = "Ajouter un FAQ";
      this.action = "add";
      // this.faqForm.patchValue({
      //     question: '',
      //     answer:'',
      //     job: '',
      // });
    }
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }

  openShowModal(id: number) {
    // this.selected_faq = this.faq.find(x => x.id == id);
    this.displayShowModal = "block";
  }

  onCloseHandledShowModal() {
    this.displayShowModal = "none";
  }

  setPaginationLabelToFrench() {
    this.paginator._intl.itemsPerPageLabel = "Elements par page:";
    this.paginator._intl.nextPageLabel = "Page suivante";
    this.paginator._intl.previousPageLabel = "Page précédente";
    this.paginator._intl.getRangeLabel = this.frenchRangeLabel;
  }

  edit(id: number) {
    // this.router.navigate(['/regulation/add'], { queryParams: {
    //     id: id
    // }});
    // this.router.navigate(['/regulation/add', { id: id }])
  }

  deleteElement(id: number) {
    let text;
    if (confirm("Voulez vous vraiment supprimer ? ") == true) {
      this.produitService.delete(id).subscribe(
        (response) => {
          this.notificationForm("success", "Supression réussi !");
          this.getlistFacture();
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          console.log("Error while deleting data");
        }
      );
    } else {
    }

    // this.actualiteService.delete(id).subscribe(response => {
    //     this.notificationForm("success", "Supression réussi !");
    //     // this.getList();
    //     this.ngOnInit()
    // }, (error: HttpErrorResponse) => {
    //     console.log("Error while deleting data");
    // })
  }

  hideElement(id: number) {
    // this.actualiteService.hide(id).subscribe(response => {
    //     this.notificationForm("success", "Statut modifier avec succes !");
    //     // this.getList();
    // }, (error: HttpErrorResponse) => {
    //     console.log("Error while hidden data");
    //     this.notificationForm("danger", "Error de modification du statut !");
    // })
  }

  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }

  ngAfterViewInit() {
    //  this.dataSourceActivite.paginator = this.paginator;
    // this.dataSourceActivite.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceActivite.filter = filterValue;
  }

  frenchRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 sur ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} sur ${length}`;
  }
}
