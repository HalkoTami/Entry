
export class Tag {
    title:string
    constructor(title:string){
      this.title = title
    }
  }
export async function getTagList():Promise<[Tag]>{
    return new Promise((resolve)=>resolve([new Tag("hello")]))
}