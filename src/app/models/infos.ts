import { Job } from "./job"

export class Infos {
    id: number
    titre: string
    content: string
    img: string
    file: string
    isDisplayed: boolean
    created_at: string
    updated_at: string

    job: Job

    constructor(
        titre: string,
        content: string,
        isDisplayed : boolean
      
    ) {
        this.titre = titre
        this.content = content
        this.isDisplayed = isDisplayed
    }
}
