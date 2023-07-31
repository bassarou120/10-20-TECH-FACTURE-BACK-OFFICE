// import { Job } from './job';
// import { Piece } from './Piece';


export class Actualite {

   id: number;
   type: string;
   titre: string;
   content: string;
   image: string;


    constructor(  type: string, titre: string, content: string, image: string) {

        this.type = type;
        this.titre = titre;
        this.content = content;
        this.image = image;
    }

//    files: Array<Piece>;
//    isDisplayed: boolean;
//    created_at: string;
//    updated_at: string;
//     job: string;


//     constructor(id: number, type: string, titre: string, content: string, image: string,files: Array<Piece>, isDisplayed: boolean, created_at: string, updated_at: string, job: string) {
//         this.id = id;
//         this.type = type;
//         this.titre = titre;
//         this.content = content;
//         this.image = image;
//         this.files = files;
//         this.isDisplayed = isDisplayed;
//         this.created_at = created_at;
//         this.updated_at = updated_at;
//         this.job = job;
//     }




}
