
import { EntryValues } from "./EntryValues"
import { insertRow, updatePage,  } from "./sendDataToNotion"
import { EntryData } from "./EntryData"
import { showToast } from '@raycast/api'

export class EntryUiData{
    tagList:string[]
    openedRowData:EntryData|null
    newEntry:boolean
    submitTitle:string
    dateTitle:string 
    contentTitle:string

    constructor( tagList:string[],
      openedRowData:EntryData|null)
      { this.tagList = tagList
        this.openedRowData =openedRowData
        this.newEntry = openedRowData==null
        this.submitTitle = this.switchSubmitTitle()
        this.dateTitle = this.getDateTitle()
        this.contentTitle = this.getContentTitle()
      }
    
    private async submitWhileLoading(){
      await showToast({ title: "sending Data...", message: "can take a moment" });
    }
    public switchSubmitTitle() :string{
      switch (this.newEntry){
        case true: return "start activity" 
        case false:return "end activity"
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
        case true: {
          insertRow(entryValues)
          break
        }
        case false:{
          updatePage(this.openedRowData!.id,entryValues)
          break
        } 
        case null: this.submitWhileLoading()
      }
    }
  }
 