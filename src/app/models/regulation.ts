import { Job } from "./job"

export class Regulation {
    id: number
    type: string
    titre: string
    content: string
    file: string
    img: string
    isDisplayed: boolean
    created_at: string
    updated_at: string
    job: Job

    constructor(
        titre: string,
        type: string,
        content: string,
        // file: string,
        // img: string,
        isDisplayed: boolean
      
    ) {
        this.titre = titre
        this.type = type
        this.content = content
        this.isDisplayed = isDisplayed 
    }

}
