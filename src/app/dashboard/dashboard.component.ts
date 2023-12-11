/** @format */

import { Component, OnInit } from "@angular/core";

import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Complaints } from "app/models/complaints";
import { FactureService } from "app/services/facture.service";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(private factureService: FactureService) {}

  spinner1 = true;
  spinner2 = true;
  spinner3 = true;
  spinner4 = true;
  spinner5 = true;
  spinner6 = true;
  spinner7 = true;
  loading = true;
  total_complaint_spinner = true;
  total_reclamation_spinner = true;
  stat_data;
  complaints: Array<Complaints> = [];

  curentFacture;
  top10;

  listCotisation;
  listAdherant;
  ngOnInit() {
    this.stat();

    setTimeout(() => {
      if (!this.spinner4 && !this.total_complaint_spinner)
        this.spinner1 = false;
    }, 10000);
  }

  stat() {
    this.factureService.getStat().subscribe(
      (data: any) => {
        this.stat_data = data["data"];
        // alert(JSON.stringify(this.stat_data["top10_fature"]));
        this.top10 = this.stat_data["top10_facture"].data;
        this.loading = false;

        // this.spinner = false;
      },
      (error: HttpErrorResponse) => {
        console.log("Error while retrieving data");
      }
    );
  }

  afficheFacture(action: string, id: number) {
    // alert(action);

    this.factureService.getFactureEtDetailById(id).subscribe(
      (data: any) => {
        this.curentFacture = data["data"];

        // alert(JSON.stringify(this.curentFacture["detailFacture"]));
        this.generatePDF(action);
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

  formatDate(date: string) {
    const d = date.split("T");
    return d[0] + " " + d[1].substr(0, 8);
  }
}
