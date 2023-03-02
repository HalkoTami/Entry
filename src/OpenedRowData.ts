import { convertStringToDate } from "./dateConverter"

export class OpenedRowData{
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