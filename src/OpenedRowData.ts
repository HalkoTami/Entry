export class OpenedRowData{
    id:string
    start:Date
    end:Date|null
    comment:string
    tag:string
    constructor(id:string,
        start:Date,
        end:Date|null,
        comment:string,
        tag:string){
        this.id = id
        this.start = start
        this.end= end
        this.comment = comment
        this.tag = tag
    }
}