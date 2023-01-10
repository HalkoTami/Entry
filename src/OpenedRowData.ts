export class OpenedRowData{
    id:string
    start:string
    comment:string
    tag:string
    constructor(id:string,
        start:string,
        comment:string,
        tag:string){
        this.id = id
        this.start = start
        this.comment = comment
        this.tag = tag
    }
}