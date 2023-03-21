export class OperateurTouristique {
    id: number
    rccm:string
    raison_sociale:string
    ifu:string
    email:string
    site_web:string
    telephone:string
    departement:string
    commune:string
    adresse:string
    nom_promoteur:string
    prenom_promoteur:string
    sexe_promoteur:string
    nationalite_promoteur:string
    npi_promoteur:string
    nom_directeur:string
    prenom_directeur:string
    sexe_directeur:string
    nationalite_directeur:string
    date_de_naissance:string
    lieu_de_naissance:string
    statut:string
    type_etablissement:string
    nombre_etoile:string
    capacite_hebergement:string
    type_guide:string
    categorie_guide:string
    association_groupement:string
    created_at: string
    updated_at: string

    constructor(
        rccm:string,
        raison_sociale:string,
        ifu:string,
        email:string,
        site_web:string,
        telephone:string,
        departement:string,
        commune:string,
        adresse:string,
        nom_promoteur:string,
        prenom_promoteur:string,
        sexe_promoteur:string,
        nationalite_promoteur:string,
        npi_promoteur:string,
        nom_directeur:string,
        prenom_directeur:string,
        sexe_directeur:string,
        nationalite_directeur:string,
        date_de_naissance:string,
        lieu_de_naissance:string,
        statut:string,
        type_etablissement:string,
        nombre_etoile:string,
        capacite_hebergement:string,
        type_guide:string,
        categorie_guide:string,
        association_groupement:string
       // job: Job
      
    ) {

        this.rccm=rccm
        this.raison_sociale=raison_sociale
        this.ifu=ifu
        this.email=email
        this.site_web=site_web
        this.telephone=telephone
        this.departement=departement
        this.commune=commune
        this.adresse=adresse
        this.nom_promoteur=nom_promoteur
        this.prenom_promoteur=prenom_promoteur
        this.sexe_promoteur=sexe_promoteur
        this.nationalite_promoteur=nationalite_promoteur
        this.npi_promoteur=npi_promoteur
        this.nom_directeur=nom_directeur
        this.prenom_directeur=prenom_directeur
        this.sexe_directeur=sexe_directeur
        this.nationalite_directeur=nationalite_directeur
        this.date_de_naissance=date_de_naissance
        this.lieu_de_naissance=lieu_de_naissance
        this.statut = statut
        this.type_etablissement = type_etablissement
        this.nombre_etoile = nombre_etoile
        this.capacite_hebergement = capacite_hebergement,
        this.type_guide = type_guide
        this.categorie_guide = categorie_guide
        this.association_groupement = association_groupement
    }
}
