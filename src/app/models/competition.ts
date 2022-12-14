export class Competition {
    id: number
    titre: string
    content: string
    startDate: string
    endDate : string
    img: string
    file: string
    isDisplayed: boolean
    created_at: string
    updated_at: string

    constructor(
        titre: string,
        content: string,
        isDisplayed : boolean,
        startDate : string,
        endDate : string

    ) {
        this.titre = titre
        this.content = content
        this.isDisplayed = isDisplayed
        this.startDate = startDate
        this.endDate = endDate
    }



}
