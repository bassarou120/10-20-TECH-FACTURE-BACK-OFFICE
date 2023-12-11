/** @format */

import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Job } from "app/models/job";
import { Regulation } from "app/models/regulation";

import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

import { FactureService } from "../../services/facture.service";
import { ProduitService } from "../../services/produit.service";
import { ClientService } from "../../services/client.service";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

declare const $: any;
declare interface Type {
  value: string;
  label: string;
}

@Component({
  selector: "add-regulation",
  templateUrl: "./add-facture.component.html",
  styleUrls: ["./add-facture.component.styl"],
})
export class AddFactureComponent implements OnInit {
  types: any[];

  action: string = "add";
  typeNotificationForm: string;
  messageNotificationForm: string;
  isNotificationForm: boolean = false;

  typeclient: any;

  client: any;
  imgToUpload: File = null;
  id: number;
  card_header_title: string = " ";
  fileToUpload: File = null;

  isAgenda = false;

  listEvent: any;

  curentFacture;
  curentFactureId;
  public editor;

  display1 = "none";
  display2 = "none";
  display3 = "none";
  displayShowModal = "none";

  titre_modal: string = "Ajouter un article";

  panier = [];

  constructor(
    private produitService: ProduitService,
    private factureService: FactureService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute
  ) {}
  reg: Regulation;

  produitForm = new FormGroup({
    designation: new FormControl("", Validators.required),
    prix: new FormControl("", Validators.required),
    observation: new FormControl(""),
  });

  articleForm = new FormGroup({
    produit: new FormControl("", Validators.required),
    qte: new FormControl("", Validators.required),
  });

  now = new Date();
  factureForm = new FormGroup({
    client_id: new FormControl("", Validators.required),
    montant: new FormControl(""),
    date: new FormControl(
      new Date().toISOString().substring(0, 10),
      Validators.required
    ),
  });

  listClient;
  listProduit;

  ngOnInit() {
    // this.types = TYPES.filter(type => type);
    this.getListClient();
    this.getListProduit();
    this.activatedRoute.params.subscribe((params) => {
      const type = params["type"];
      const idclient = params["id"];

      if (type) {
        this.typeclient = type;
        this.card_header_title = type;
        this.action = "add";
      } else {
        this.card_header_title = "MODIFIER LE CLIENT";
      }

      if (type) {
        this.typeclient = type;
        this.card_header_title = type;
        this.action = "add";
      } else {
        this.card_header_title = "MODIFIER UN CLIENT";
      }

      if (idclient) {
        this.action = "edit";
        this.id = idclient;
        this.getClient(idclient);
      }
    });
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

  montantHt = 0;
  montantTTC = 0;

  ajouteArticle() {
    if (this.articleForm.valid) {
      var prod = this.articleForm.get("produit").value;
      var qte = this.articleForm.get("qte").value;

      if (this.verifierSiArticeleExite(prod.designation) == false) {
        this.panier.push({ produit: prod, qte: qte, montant: prod.prix * qte });
      } else {
        alert("Attention l'articel exite déja !");
      }

      console.log(this.panier);
      this.calculeMontant();
    } else {
      alert("Desolé tous champs sont obligatoire");
    }
  }

  calculeMontant() {
    this.montantHt = 0;
    for (var p of this.panier) {
      this.montantHt = this.montantHt + p.montant;
    }

    this.montantTTC = this.montantHt + this.montantHt * 0.18;

    this.factureForm.get("montant").setValue(this.montantHt);
  }

  verifierSiArticeleExite(article) {
    // alert(article)

    var resultat = false;

    for (var p of this.panier) {
      if (p.produit.designation == article) {
        resultat = true;
        break;
      }
      // alert(JSON.stringify(p.produit.desigantion));
    }

    return resultat;
  }
  deleteArticle(id) {
    this.panier.splice(id);
    this.calculeMontant();
  }

  getListProduit() {
    this.produitService.list().subscribe(
      (response) => {
        this.listProduit = response["data"].data;
        console.log(this.listClient);
      },
      (error) => {}
    );
  }

  getListClient() {
    this.clientService.listclient().subscribe(
      (response) => {
        this.listClient = response["data"].data;
        console.log(this.listClient);
      },
      (error) => {}
    );
  }

  getClient(id) {
    this.factureService.getById(id).subscribe(
      (response) => {
        this.client = response["data"];

        console.log(this.client);
        this.produitForm
          .get("designation")
          .setValue(response["data"].designation);
        this.produitForm.get("prix").setValue(response["data"].prix);
        this.produitForm
          .get("observation")
          .setValue(response["data"].observation);
      },
      (error) => {}
    );
  }

  openModal(id_element?: number, myaction?: any) {
    // this.curent_pays_id=id_element

    switch (myaction) {
      case "ajoute-article":
        this.titre_modal = "Ajouter les articles de la facture";
        this.display3 = "block";

        // this.adherantService.getCotisationByAdherant(id_element).subscribe((response)=>{
        //
        //     this.listCotisation=response['data'];
        // },(error => console.log("error")));

        break;
    }
  }

  onCloseHandled() {
    this.display1 = "none";
    this.display2 = "none";
    this.display3 = "none";
  }

  get designation(): any {
    return this.produitForm.get("designation");
  }
  get prix(): any {
    return this.produitForm.get("prix");
  }

  get observation(): any {
    return this.produitForm.get("observation");
  }

  get telephone(): any {
    return this.produitForm.get("telephone");
  }
  get adresse(): any {
    return this.produitForm.get("adresse");
  }

  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload.name);
  }

  handleImgInput(event) {
    this.imgToUpload = event.target.files[0];
    console.log(this.imgToUpload.name);
  }

  onClickSubmit(): void {
    if (this.factureForm.valid) {
      if (this.montantHt == 0) {
        alert("Votre facture est vide Veuilez ajouter des articles SVP !");
      } else {
        this.factureService.save(this.factureForm.value).subscribe(
          (response) => {
            console.log(response);
            // alert(JSON.stringify(response['data'].id))
            this.curentFactureId = response["data"].id;
            this.factureService
              .addAllDetailFacture(this.panier, response["data"].id)
              .subscribe(
                (response) => {
                  console.log(response);
                  // alert(JSON.stringify(response));

                  this.notificationForm(
                    "success",
                    "Votre Facture a été bien enregistrer "
                  );
                },
                (error: HttpErrorResponse) => {
                  console.log("Error while saving data");
                  this.notificationForm(
                    "danger",
                    "Erreur lors de l'enregistrement !"
                  );
                }
              );
          },
          (error: HttpErrorResponse) => {
            console.log("Error while saving data");
            this.notificationForm(
              "danger",
              "Erreur lors de l'enregistrement !"
            );
          }
        );

        // alert(JSON.stringify(this.factureForm.value))
      }
    } else {
      alert("Veuillez selectionner un client SPV!");
    }

    // this.factureService.addAllDetailFacture(this.panier,2)
    //     .subscribe(response => {
    //
    //         console.log(response)
    //         alert(JSON.stringify(response))
    //
    //     }, (error: HttpErrorResponse) => {
    //         console.log("Error while saving data");
    //         this.notificationForm(
    //             "danger",
    //             "Erreur lors de l'enregistrement !"
    //         );
    //     })

    /*
    if (!this.produitForm.invalid) {
      $('#sbt_btn').addClass('disabled');

      $('#spinner').removeClass('d-none')

      const formData = this.produitForm.value;
      // console.log(formData);

      if (this.action == 'add') {

        this.factureService.save(formData)
          .subscribe(response => {

            this.notificationForm(
              "success",
              "Enregistrement réussi !"
            );
            console.log(response);

            $('#sbt_btn').removeClass('disabled');
            $('#spinner').addClass('d-none')
            // $('#spinner').removeClass('d-none');

            this.produitForm.reset();
          }, (error: HttpErrorResponse) => {
            console.log("Error while saving data");
            this.notificationForm(
              "danger",
              "Erreur lors de l'enregistrement !"
            );
          })

      }
      else {


        this.factureService.edit(formData, this.id)
          .subscribe(response => {
            console.log(response);
            this.notificationForm(
              "success",
              "Modification réussi !"
            );

            $('#sbt_btn').removeClass('disabled');
            $('#spinner').addClass('d-none');

          }, (error: HttpErrorResponse) => {
            this.notificationForm(
                "danger",
                "Erreur lors de l'enregistrement !"
            );

            console.log("Error while retrieving data");
          })
      }




      $('#spinner').removeClass('d-none');
    
   
      $('html,body').animate({
        scrollTop: $("#top").offset().top
      }, 'slow');
    }


     */
  }

  onEditorBlured(quill) {
    this.editor = quill;
  }

  onEditorFocused(quill) {}

  onEditorCreated(quill) {
    this.editor = quill;
  }

  onContentChanged({ quill, html, text }) {}
}
