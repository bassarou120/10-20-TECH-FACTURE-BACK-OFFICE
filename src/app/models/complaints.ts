import { Job } from "./job"

export class Complaints {
    id: number
    type: string
    firstname: string
    lastname: string
    email: string
    phonenumber: string
    relative_contact: string
    objet: string
    complaint: string
    actor: string
    statut: string
    action: string
    created_at: string
    updated_at: string

    job: Job

    constructor(
        type: string,
        firstname: string,
        lastname: string,
        email: string,
        phonenumber: string,
        relative_contact: string,
        objet: string,
        complaint: string,
        actor: string,
        statut: string,
        action: string
      
    ) {
        this.type = type
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.phonenumber = phonenumber
        this.relative_contact = relative_contact
        this.objet = objet
        this.complaint = complaint
        this.actor = actor
        this.statut = statut
        this.action = action
    }
}
