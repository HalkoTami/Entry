import { convertStringToDate } from "./dateConverter"

export class EntryData{
    id:string
    start:Date
    end:Date|undefined
    comment:string
    tag:string
    isOpened:boolean
    constructor(id:string,
        start:string,
        end:string|undefined,
        comment:string,
        tag:string){
        this.id = id
        this.start = convertStringToDate(start) 
        if(end==undefined) this.end =undefined 
        else this.end =convertStringToDate(end)
        this.isOpened = end==undefined
        this.comment = comment
        this.tag = tag
    }
}