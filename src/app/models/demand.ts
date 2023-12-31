export class Demand {
    id: number
    ifu: string
    demande: string
    omtId: string
    status: string
    demandeDate: string
    numDemande: string
    email: string
    metier: string
    telephone: string
    nom_du_service: string
    rccm: string
    numero_agrement: string
    raison_sociale: string
    type_etablissement: string
    departement: string
    commune: string
    nombre_etoiles: string
    date_agrement: string
    date_classement: string
    date_expiration: string
    derniere_mise_a_jour: string
    derniere_notification: string
    data: string
    alldata: string
    pieces: string
    capacite_hebergement :string;
    type_guide:string;
    categorie_guide:string;
    association_groupement:string;

    constructor(
        id: number,
        ifu: string,
        demande: string,
        omtId: string,
        status: string,
        demandeDate: string,
        numDemande: string,
        email: string,
        metier: string,
        telephone: string,
        nom_du_service: string,
        rccm: string,
        numero_agrement: string,
        raison_sociale: string,
        type_etablissement: string,
        departement: string,
        commune: string,
        nombre_etoiles: string,
        date_agrement: string,
        date_classement: string,
        date_expiration: string,
        derniere_mise_a_jour: string,
        derniere_notification: string,
        data: string,
        alldata: string,
        pieces: string,
        capacite_hebergement :string,
        type_guide:string,
        categorie_guide:string,
        association_groupement:string
    ) {
        this.id= id,
        this.ifu= ifu,
        this.demande= demande,
        this.omtId= omtId,
        this.status= status,
        this.demandeDate= demandeDate,
        this.numDemande= numDemande,
        this.email= email,
        this.metier= metier,
        this.telephone= telephone,
        this.nom_du_service= nom_du_service,
        this.rccm= rccm,
        this.numero_agrement= numero_agrement,
        this.raison_sociale= raison_sociale,
        this.type_etablissement= type_etablissement,
        this.departement= departement,
        this.commune= commune,
        this.nombre_etoiles= nombre_etoiles,
        this.date_agrement= date_agrement,
        this.date_classement= date_classement,
        this.date_expiration= date_expiration,
        this.derniere_mise_a_jour= derniere_mise_a_jour,
        this.derniere_notification= derniere_notification
        this.data= data
        this.alldata= alldata
        this.pieces= pieces
        this.capacite_hebergement =capacite_hebergement ,
        this.type_guide= type_guide,
        this.categorie_guide= categorie_guide
        this.association_groupement= association_groupement
    }
}
