import { Job } from "./job"

export class Faq {
    id: number
    question: string
    content: string
    isDisplayed: boolean
    created_at: string
    updated_at: string

    job: Job

    constructor(
        question: string,
        content: string,
        isDisplayed : boolean,
        job : Job
      
    ) {
        this.question = question
        this.content = content
        this.isDisplayed = isDisplayed
        this.job = job
    }

}
