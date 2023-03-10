import { convertStringToDate, stringToDate } from "./dateConverter"

export class EntryData{
    id:string
    start:Date
    end:Date|null
    comment:string
    tag:string
    isOpened:boolean

    constructor(id:string,
        start:string,
        end:string|null,
        comment:string,
        tag:string){
        this.id = id
        this.start = stringToDate(start) 
        if(end==undefined) this.end =null 
        else this.end =stringToDate(end)
        this.isOpened = end==undefined
        this.comment = comment
        this.tag = tag
    

    }
}