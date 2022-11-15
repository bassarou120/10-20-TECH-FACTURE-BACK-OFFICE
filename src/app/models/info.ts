import {Job} from './job';


export class Info {
    id: number;
    titre: string;
    content: string;
    image: string;
    isDisplayed: string;
    job: Job;
    created_at : string;
    updated_at : string;


    constructor(
        id: number,
        titre: string,
        content: string,
        image: string,
        isDisplayed: string,
        job: Job,
        created_at : string, 
        updated_at: string
    ) {
        this.id = id
        this.titre = titre
        this.content = content
        this.image = image
        this.isDisplayed = isDisplayed
        this.job = job
        this.created_at= created_at
        this.updated_at= updated_at
    }
}
