
import { EntryValues } from "./EntryValues"
import { insertRow, updatePage, UpDatingData } from "./getNotionClient"
import { OpenedRowData } from "./OpenedRowData"
import { showToast } from '@raycast/api'

export class UiData{
    tagList:string[]
    openedRowData:OpenedRowData|null
    newEntry:boolean
    submitTitle:string
    dateTitle:string 
    contentTitle:string

    constructor( tagList:string[],
      openedRowData:OpenedRowData|null)
      { this.tagList = tagList
        this.openedRowData =openedRowData
        this.newEntry = openedRowData==null
        this.submitTitle = this.switchSubmitTitle()
        this.dateTitle = this.getDateTitle()
        this.contentTitle = this.getContentTitle()
      }
    
    private async submitWhileLoading(){
      await showToast({ title: "Failed, isLoading", message: "Try Again" });
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
        case false: updatePage(new UpDatingData(this.openedRowData!,entryValues))
        case null: this.submitWhileLoading()
      }
    }
  }
 