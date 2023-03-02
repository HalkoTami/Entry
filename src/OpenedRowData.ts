import { convertStringToDate } from "./dateConverter"

export class EntryData{
    id:string
    start:Date
    comment:string
    tag:string
    constructor(id:string,
        start:string,
        comment:string,
        tag:string){
        this.id = id
        this.start = convertStringToDate(start) 
        this.comment = comment
        this.tag = tag
    }
}