
import { Tag } from "./getTagList"
import { LastRowResponse } from "./LastRowResponse"
import { OpenedRowData } from "./OpenedRowData"
import { start } from "./start"
import { update } from "./update"

export class UiData{
    tagList:[Tag]
    openedRowData:OpenedRowData|null
    newEntry:boolean 
    constructor( tagList:[Tag],
      lastRowResponce:LastRowResponse)
      { this.tagList = tagList
        this.openedRowData =lastRowResponce.openedRowData
        this.newEntry =!lastRowResponce.isOpened}
    
    
    public switchSubmitTitle() :string{
      switch (this.newEntry){
        case true: return "start activity" 
        case false:return "end activity"
        case undefined: return ""
      }
    }  
    public getDateTitle ():string {
      switch (this.newEntry){
        case true: return "start"
        case false:return  "end"
      }
    }; 
    public getContentTitle ():string {
      switch (this.newEntry){
        case true: return "doing"
        case false:return  "done"
      }
    }; 
    public doOnSubmit(entryValues:EntryValues){
      switch (this.newEntry){
        case true: return start(entryValues)
        case false:return  update(entryValues)
        case null: return
      }
    }
  }
  export interface EntryValues {
    dateTime: Date ;
    contentField: string;
    tag: string;
  }